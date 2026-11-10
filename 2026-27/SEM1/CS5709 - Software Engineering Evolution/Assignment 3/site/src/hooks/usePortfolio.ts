/**
 * @file Reads the shared filter state; fails loudly outside the provider.
 */
import { use } from 'react';
import { PortfolioContext } from '../state/PortfolioContext.ts';
import type { PortfolioStore } from '../state/PortfolioContext.ts';

export function usePortfolio(): PortfolioStore {
  const store = use(PortfolioContext);
  if (!store) {
    throw new Error('usePortfolio needs a PortfolioProvider above it');
  }
  return store;
}
