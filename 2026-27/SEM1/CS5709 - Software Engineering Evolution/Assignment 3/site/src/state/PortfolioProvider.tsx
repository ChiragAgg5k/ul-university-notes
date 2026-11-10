/**
 * @file Provides the filter state to every page, so it survives navigation.
 */
import { useReducer } from 'react';
import type { ReactNode } from 'react';
import { initialState, PortfolioContext, reduce } from './PortfolioContext.ts';

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reduce, initialState);
  return <PortfolioContext value={{ state, dispatch }}>{children}</PortfolioContext>;
}
