/**
 * @file Search box, tag buttons and result count for one filterable collection.
 */
import { useFilter } from '../hooks/useFilter.ts';
import { everyTag } from '../state/PortfolioContext.ts';
import type { Collection } from '../state/PortfolioContext.ts';

interface Properties {
  collection: Collection;
  legend: string;
  tags: string[];
  shown: number;
  total: number;
}

export function CollectionFilter({ collection, legend, tags, shown, total }: Properties) {
  const { filter, search, select, reset } = useFilter(collection);
  const filtered = filter.query !== '' || filter.tag !== everyTag;
  return (
    <>
      <fieldset className="filters">
        <legend>{legend}</legend>
        <label>
          Search
          <input
            type="search"
            value={filter.query}
            onChange={event => search(event.target.value)}
          />
        </label>
        <div>
          {[everyTag, ...tags].map(tag => (
            <button
              key={tag}
              type="button"
              aria-pressed={filter.tag === tag}
              onClick={() => select(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </fieldset>
      <p className="filter-status" role="status">
        {shown} of {total} shown.{' '}
        {filtered && (
          <button className="link" type="button" onClick={reset}>
            Clear filter
          </button>
        )}
      </p>
    </>
  );
}
