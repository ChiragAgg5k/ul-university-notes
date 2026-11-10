/**
 * @file Shared filter state for the project list: the search text and the selected skill.
 */
import { createContext } from 'react';
import type { Dispatch } from 'react';

export const everySkill = 'All';

export interface PortfolioState {
  query: string;
  skill: string;
}

export type PortfolioAction =
  { type: 'search'; query: string } | { type: 'select'; skill: string } | { type: 'reset' };

export const initialState: PortfolioState = { query: '', skill: everySkill };

/**
 * Returns the next filter state for an action.
 */
export function reduce(state: PortfolioState, action: PortfolioAction): PortfolioState {
  switch (action.type) {
    case 'search':
      return { ...state, query: action.query };
    case 'select':
      return { ...state, skill: action.skill };
    case 'reset':
      return initialState;
  }
}

export interface PortfolioStore {
  state: PortfolioState;
  dispatch: Dispatch<PortfolioAction>;
}

export const PortfolioContext = createContext<PortfolioStore | null>(null);
