/**
 * @file Decides whether an item passes a filter. Pure, so it can be reasoned about without React.
 */
import { everyTag } from './PortfolioContext.ts';
import type { Filter } from './PortfolioContext.ts';

/**
 * @param text Everything about the item that the search box should look through.
 * @param tags The item's tags; one must equal the selected tag unless "All" is selected.
 */
export function matches(text: string[], tags: string[], { query, tag }: Filter): boolean {
  const hasTag = tag === everyTag || tags.includes(tag);
  const haystack = [...text, ...tags].join(' ').toLowerCase();
  return hasTag && haystack.includes(query.trim().toLowerCase());
}

/**
 * Lists each tag once, in the order the data first mentions it.
 */
export function distinctTags(items: { tags: string[] }[]): string[] {
  return [...new Set(items.flatMap(item => item.tags))];
}
