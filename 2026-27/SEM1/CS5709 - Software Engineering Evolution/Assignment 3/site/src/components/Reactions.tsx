/**
 * @file Reaction buttons under an article, with live counts from the database.
 */
import { kinds } from '../api/reactionIdentity.ts';
import type { Kind } from '../api/reactionIdentity.ts';
import { useReactions } from '../hooks/useReactions.ts';
import type { ReactionStatus } from '../hooks/useReactions.ts';

const labels: Record<Kind, string> = {
  useful: 'Useful',
  clear: 'Clearly explained',
  more: 'Write more on this',
};

const messages: Record<ReactionStatus, string> = {
  loading: 'Loading reactions…',
  ready: 'Counts update live as other readers react.',
  failed: 'Reactions are unavailable right now. The article is unaffected.',
};

export function Reactions({ article }: { article: string }) {
  const { status, counts, mine, react } = useReactions(article);
  return (
    <section className="reactions" aria-label="Reactions">
      <h2>Was this worth your time?</h2>
      <div>
        {kinds.map(kind => (
          <button
            key={kind}
            type="button"
            aria-pressed={mine.includes(kind)}
            disabled={status !== 'ready' || mine.includes(kind)}
            onClick={() => react(kind)}
          >
            {labels[kind]}
            {status === 'ready' && <span className="count">{counts[kind]}</span>}
          </button>
        ))}
      </div>
      <p role="status">{messages[status]}</p>
      <p className="note">
        A reaction stores the article, the kind and a random identifier in an Appwrite database. No
        name, account or message is collected, and a reaction can’t be withdrawn.
      </p>
    </section>
  );
}
