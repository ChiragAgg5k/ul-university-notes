/**
 * @file Stores and reads article reactions in an Appwrite database, and listens for new ones.
 *
 * The site has no server of its own, so the browser talks to the database directly. The table
 * lets anyone add and read rows and lets nobody change or delete them, which is all a visitor
 * needs. No account or session is created: the caller passes a random visitor identifier, and
 * the row identifier is built from visitor, article and kind, so the database itself refuses a
 * second identical reaction.
 *
 * This module pulls in the Appwrite SDK, so it is only ever imported dynamically (see
 * `useReactions`) and stays out of the first download.
 */
import { AppwriteException, Channel, Client, ID, Query, Realtime, TablesDB } from 'appwrite';
import { identify } from './reactionIdentity.ts';
import type { Counts, Kind } from './reactionIdentity.ts';
import { kinds } from './reactionIdentity.ts';

const endpoint = 'https://sgp.cloud.appwrite.io/v1';
const project = 'chirag-project-prod';
const database = 'cs5709-portfolio';
const table = 'reactions';
const duplicate = 409;

const client = new Client().setEndpoint(endpoint).setProject(project);
const tables = new TablesDB(client);
const realtime = new Realtime(client);

interface Reaction {
  $id: string;
  article: string;
  kind: Kind;
}

export function newVisitor(): string {
  return ID.unique();
}

/**
 * Counts the reactions of each kind for one article. Asks for one row per kind and reads the
 * total, so the cost does not grow with the number of reactions.
 */
export async function countReactions(article: string): Promise<Counts> {
  const totals = await Promise.all(
    kinds.map(kind =>
      tables.listRows({
        databaseId: database,
        tableId: table,
        queries: [Query.equal('article', article), Query.equal('kind', kind), Query.limit(1)],
      }),
    ),
  );
  return Object.fromEntries(kinds.map((kind, index) => [kind, totals[index].total])) as Counts;
}

/**
 * Adds a reaction. Resolves to `false` when this visitor had already left the same one.
 */
export async function addReaction(article: string, kind: Kind, visitor: string): Promise<boolean> {
  try {
    await tables.createRow({
      databaseId: database,
      tableId: table,
      rowId: identify(visitor, article, kind),
      data: { article, kind },
    });
    return true;
  } catch (error) {
    if (error instanceof AppwriteException && error.code === duplicate) {
      return false;
    }
    throw error;
  }
}

/**
 * Calls `added` whenever any visitor reacts to the article, with the kind and the row identifier
 * so the caller can recognise its own reaction. Resolves once the subscription is in place, to a
 * function that stops listening.
 */
export async function watchReactions(
  article: string,
  added: (kind: Kind, row: string) => void,
): Promise<() => void> {
  const subscription = await realtime.subscribe(
    Channel.tablesdb(database).table(table).row().create(),
    event => {
      const reaction = event.payload as Reaction;
      if (reaction.article === article) {
        added(reaction.kind, reaction.$id);
      }
    },
  );
  return () => {
    subscription.close().catch(() => {});
  };
}
