/**
 * @file Reads and changes the filter of one collection in the shared state.
 */
import { use } from 'react';
import { PortfolioContext } from '../state/PortfolioContext.ts';
import type { Collection, Filter } from '../state/PortfolioContext.ts';

export interface FilterControls {
  filter: Filter;
  search: (query: string) => void;
  select: (tag: string) => void;
  reset: () => void;
}

export function useFilter(collection: Collection): FilterControls {
  const store = use(PortfolioContext);
  if (!store) {
    throw new Error('useFilter needs a PortfolioProvider above it');
  }
  const { state, dispatch } = store;
  return {
    filter: state[collection],
    search: query => dispatch({ type: 'search', collection, query }),
    select: tag => dispatch({ type: 'select', collection, tag }),
    reset: () => dispatch({ type: 'reset', collection }),
  };
}
