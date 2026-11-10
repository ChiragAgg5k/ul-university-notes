/**
 * @file Route table. Each page is a separate chunk, downloaded when it is first visited.
 */
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Layout } from './components/Layout.tsx';
import { PortfolioProvider } from './state/PortfolioProvider.tsx';

const basename = import.meta.env.BASE_URL;

const router = createBrowserRouter(
  [
    {
      Component: Layout,
      children: [
        { index: true, Component: lazy(() => import('./pages/Home.tsx')) },
        { path: 'about', Component: lazy(() => import('./pages/About.tsx')) },
        { path: 'education', Component: lazy(() => import('./pages/Education.tsx')) },
        { path: 'knowledge', Component: lazy(() => import('./pages/Knowledge.tsx')) },
        { path: 'pictures', Component: lazy(() => import('./pages/Pictures.tsx')) },
        { path: 'videos', Component: lazy(() => import('./pages/Videos.tsx')) },
        { path: 'blog', Component: lazy(() => import('./pages/Blog.tsx')) },
        { path: 'blog/:slug', Component: lazy(() => import('./pages/Article.tsx')) },
        { path: 'repositories', Component: lazy(() => import('./pages/Repositories.tsx')) },
        { path: 'contact', Component: lazy(() => import('./pages/Contact.tsx')) },
        { path: '*', Component: lazy(() => import('./pages/Missing.tsx')) },
      ],
    },
  ],
  { basename },
);

export default function App() {
  return (
    <PortfolioProvider>
      <RouterProvider router={router} />
    </PortfolioProvider>
  );
}
