/**
 * @file Reaction counts for one article, kept current while the page is open.
 *
 * The database module is imported on demand. The hook subscribes to realtime events first and
 * counts second, so a reaction made while the counts are loading is not lost; if one arrives in
 * that window the counts are simply read again.
 *
 * A reaction made through this hook is counted when the database accepts it, and the realtime
 * echo of that one row is ignored, so it is counted exactly once. Only rows written by this hook
 * instance are ignored: the same visitor reacting in another tab still raises the count here and
 * marks the button as used. Which reactions this visitor has left is remembered in the browser,
 * only to disable the buttons they have used.
 */
import { useEffect, useRef, useState } from 'react';
import { identify, kinds, noCounts } from '../api/reactionIdentity.ts';
import type { Counts, Kind } from '../api/reactionIdentity.ts';

export type ReactionStatus = 'loading' | 'ready' | 'failed';

export interface Reactions {
  status: ReactionStatus;
  counts: Counts;
  mine: Kind[];
  react: (kind: Kind) => void;
}

const visitorKey = 'portfolio.visitor';
const mineKey = 'portfolio.reactions';

function recall(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function remember(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private windows may refuse storage; reactions still work for this visit.
  }
}

/**
 * Reads the visitor's own reactions, keyed by article. Browser storage can hold anything, so the
 * value is checked piece by piece: whatever is not a list of known kinds counts as none, and a
 * damaged entry cannot stop an article from rendering.
 */
function recallAll(): Record<string, Kind[]> {
  let stored: unknown;
  try {
    stored = JSON.parse(recall(mineKey) ?? '{}');
  } catch {
    return {};
  }
  if (typeof stored !== 'object' || stored === null || Array.isArray(stored)) {
    return {};
  }
  const known: readonly unknown[] = kinds;
  return Object.fromEntries(
    Object.entries(stored)
      .filter(([, value]) => Array.isArray(value))
      .map(([article, value]) => [
        article,
        (value as unknown[]).filter((kind): kind is Kind => known.includes(kind)),
      ]),
  );
}

function recallMine(article: string): Kind[] {
  return recallAll()[article] ?? [];
}

function rememberMine(article: string, mine: Kind[]): void {
  remember(mineKey, JSON.stringify({ ...recallAll(), [article]: mine }));
}

interface Loaded {
  article: string;
  counts: Counts;
}

/**
 * Returns the loaded counts with one more reaction of a kind, unless they belong to another
 * article or have not arrived yet.
 */
function raised(loaded: Loaded | undefined, article: string, kind: Kind): Loaded | undefined {
  return loaded && loaded.article === article
    ? { article, counts: { ...loaded.counts, [kind]: loaded.counts[kind] + 1 } }
    : loaded;
}

export function useReactions(article: string): Reactions {
  const [loaded, setLoaded] = useState<Loaded>();
  const [failed, setFailed] = useState<string>();
  const [mine, setMine] = useState(() => ({ article, kinds: recallMine(article) }));
  const current = mine.article === article ? mine.kinds : recallMine(article);
  const written = useRef(new Set<string>());

  useEffect(() => {
    let active = true;
    let counted = false;
    let missed = false;
    let stop = () => {};

    function added(kind: Kind, row: string): void {
      if (written.current.has(row)) {
        return;
      }
      if (!counted) {
        missed = true;
        return;
      }
      setLoaded(previous => raised(previous, article, kind));
      const visitor = recall(visitorKey);
      if (visitor && row.startsWith(visitor)) {
        setMine({ article, kinds: recallMine(article) });
      }
    }

    import('../api/reactions.ts')
      .then(async reactions => {
        stop = await reactions.watchReactions(article, added);
        if (!active) {
          stop();
          return;
        }
        let counts = await reactions.countReactions(article);
        if (missed) {
          counts = await reactions.countReactions(article);
        }
        counted = true;
        if (active) {
          setLoaded({ article, counts });
        }
      })
      .catch(() => {
        if (active) {
          setFailed(article);
        }
      });
    return () => {
      active = false;
      stop();
    };
  }, [article]);

  function react(kind: Kind): void {
    if (current.includes(kind)) {
      return;
    }
    const chosen = [...current, kind];
    setMine({ article, kinds: chosen });
    rememberMine(article, chosen);
    let row = '';
    import('../api/reactions.ts')
      .then(reactions => {
        let visitor = recall(visitorKey);
        if (!visitor) {
          visitor = reactions.newVisitor();
          remember(visitorKey, visitor);
        }
        row = identify(visitor, article, kind);
        written.current.add(row);
        return reactions.addReaction(article, kind, visitor);
      })
      .then(accepted => {
        if (accepted) {
          setLoaded(previous => raised(previous, article, kind));
        } else {
          written.current.delete(row);
        }
      })
      .catch(() => {
        written.current.delete(row);
        setMine({ article, kinds: current });
        rememberMine(article, current);
        setFailed(article);
      });
  }

  const ready = loaded && loaded.article === article;
  return {
    status: failed === article ? 'failed' : ready ? 'ready' : 'loading',
    counts: ready ? loaded.counts : noCounts,
    mine: current,
    react,
  };
}
