/**
 * @file Page frame shared by every route: skip link, navigation rail, content and footer.
 */
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router';

const links = [
  { to: '/', label: 'Home' },
  { to: '/knowledge', label: 'Professional knowledge' },
  { to: '/repositories', label: 'Repositories' },
];

export function Layout() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <NavLink className="identity" to="/">
          Chirag Aggarwal<span>Engineering portfolio</span>
        </NavLink>
        <nav aria-label="Main navigation">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} end>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <p className="module">CS5709 · Software Engineering Evolution</p>
      </header>
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<p role="status">Loading…</p>}>
          <Outlet />
        </Suspense>
      </main>
      <footer>
        <p>Chirag Aggarwal · CS5709 digital portfolio, phase 2</p>
      </footer>
    </>
  );
}
