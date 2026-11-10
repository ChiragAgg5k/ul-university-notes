/**
 * @file The kinds of reaction and the rule that names a reaction's row. No SDK is imported here,
 * so the page can show the buttons before the database code has downloaded.
 */
export const kinds = ['useful', 'clear', 'more'] as const;

export type Kind = (typeof kinds)[number];

export type Counts = Record<Kind, number>;

export const noCounts: Counts = { useful: 0, clear: 0, more: 0 };

const hexadecimal = 16;
const digestLength = 8;

/**
 * Shortens an article slug to eight hexadecimal characters (FNV-1a), because a row identifier
 * may be at most 36 characters long and a slug alone can be longer.
 */
export function digest(text: string): string {
  let hash = 0x811c9dc5;
  for (const character of text) {
    hash ^= character.codePointAt(0)!;
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(hexadecimal).padStart(digestLength, '0');
}

/**
 * Builds the row identifier of one reaction. The same visitor, article and kind always give the
 * same identifier, which is how the database rejects a repeat.
 */
export function identify(visitor: string, article: string, kind: Kind): string {
  return `${visitor}-${digest(article)}-${kind}`;
}
