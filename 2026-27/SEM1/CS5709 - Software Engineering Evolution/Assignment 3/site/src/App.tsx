/**
 * @file Routes. Each page is a separate chunk, downloaded when first visited.
 */
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Layout } from './components/Layout.tsx';
import { PortfolioProvider } from './state/PortfolioProvider.tsx';

const Home = lazy(() => import('./pages/Home.tsx'));
const Knowledge = lazy(() => import('./pages/Knowledge.tsx'));
const Repositories = lazy(() => import('./pages/Repositories.tsx'));
const Missing = lazy(() => import('./pages/Missing.tsx'));

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'knowledge', Component: Knowledge },
      { path: 'repositories', Component: Repositories },
      { path: '*', Component: Missing },
    ],
  },
]);

export default function App() {
  return (
    <PortfolioProvider>
      <RouterProvider router={router} />
    </PortfolioProvider>
  );
}
