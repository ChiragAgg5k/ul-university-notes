/**
 * @file Frame shared by every route: skip link, navigation rail, page content and footer.
 *
 * Pages are separate chunks, so the content area sits inside `Suspense` and shows a status line
 * while a page downloads. After each navigation the keyboard focus moves to the content, which
 * is what a full page load would have done.
 */
import { Suspense, useEffect, useRef } from 'react';
import { NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router';
import links from '../data/navigation.json';
import profile from '../data/profile.json';
import { Chat } from './Chat.tsx';

export function Layout() {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <NavLink className="identity" to="/">
          {profile.name}
          <span>{profile.tagline}</span>
        </NavLink>
        <nav aria-label="Main navigation">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <p className="module">
          CS5709
          <br />
          Software Engineering Evolution
        </p>
      </header>
      <div className="page">
        <main id="main" tabIndex={-1} ref={main}>
          <Suspense fallback={<p role="status">Loading…</p>}>
            <Outlet />
          </Suspense>
        </main>
        <footer>
          <Chat />
          <p>{profile.name} · CS5709 digital portfolio, phase 2</p>
          <p>
            Content adapted from <a href={profile.original}>my original portfolio</a>.
          </p>
        </footer>
      </div>
      <ScrollRestoration />
    </>
  );
}
