/**
 * @file Reaction counts for one article, kept current while the page is open.
 *
 * The database module is imported on demand. Counts are loaded once, then raised by realtime
 * events from other readers. The visitor's own reaction is counted when the database accepts it
 * and its realtime echo is ignored, so it is counted exactly once even if the live connection is
 * not up yet. Which reactions this visitor has left is remembered in the browser, only to disable
 * the buttons they have used.
 */
import { useEffect, useState } from 'react';
import { noCounts } from '../api/reactionIdentity.ts';
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

function recallMine(article: string): Kind[] {
  const stored: Record<string, Kind[]> = JSON.parse(recall(mineKey) ?? '{}');
  return stored[article] ?? [];
}

function rememberMine(article: string, mine: Kind[]): void {
  const stored: Record<string, Kind[]> = JSON.parse(recall(mineKey) ?? '{}');
  remember(mineKey, JSON.stringify({ ...stored, [article]: mine }));
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

  useEffect(() => {
    let active = true;
    let stop = () => {};
    import('../api/reactions.ts')
      .then(async reactions => {
        const counts = await reactions.countReactions(article);
        if (!active) {
          return;
        }
        setLoaded({ article, counts });
        stop = reactions.watchReactions(article, (kind, row) => {
          const visitor = recall(visitorKey);
          if (!visitor || !row.startsWith(visitor)) {
            setLoaded(previous => raised(previous, article, kind));
          }
        });
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
    const kinds = [...current, kind];
    setMine({ article, kinds });
    rememberMine(article, kinds);
    import('../api/reactions.ts')
      .then(reactions => {
        let visitor = recall(visitorKey);
        if (!visitor) {
          visitor = reactions.newVisitor();
          remember(visitorKey, visitor);
        }
        return reactions.addReaction(article, kind, visitor);
      })
      .then(added => added && setLoaded(previous => raised(previous, article, kind)))
      .catch(() => {
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
