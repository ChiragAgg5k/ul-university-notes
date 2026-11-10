/**
 * @file Shared filter state: one search text and one selected tag for each filterable collection.
 *
 * The state lives above the router, so a visitor who filters the projects, opens an article and
 * comes back finds the filter as they left it.
 */
import { createContext } from 'react';
import type { Dispatch } from 'react';

export const everyTag = 'All';

export type Collection = 'projects' | 'posts' | 'photos';

export interface Filter {
  query: string;
  tag: string;
}

export type PortfolioState = Record<Collection, Filter>;

export type PortfolioAction =
  | { type: 'search'; collection: Collection; query: string }
  | { type: 'select'; collection: Collection; tag: string }
  | { type: 'reset'; collection: Collection };

const emptyFilter: Filter = { query: '', tag: everyTag };

export const initialState: PortfolioState = {
  projects: emptyFilter,
  posts: emptyFilter,
  photos: emptyFilter,
};

/**
 * Returns the next state for an action. Only the named collection's filter changes.
 */
export function reduce(state: PortfolioState, action: PortfolioAction): PortfolioState {
  const current = state[action.collection];
  switch (action.type) {
    case 'search':
      return { ...state, [action.collection]: { ...current, query: action.query } };
    case 'select':
      return { ...state, [action.collection]: { ...current, tag: action.tag } };
    case 'reset':
      return { ...state, [action.collection]: emptyFilter };
  }
}

export interface PortfolioStore {
  state: PortfolioState;
  dispatch: Dispatch<PortfolioAction>;
}

export const PortfolioContext = createContext<PortfolioStore | null>(null);
