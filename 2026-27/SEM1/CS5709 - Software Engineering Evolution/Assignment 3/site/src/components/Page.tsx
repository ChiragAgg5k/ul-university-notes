/**
 * @file Heading block shared by every page: sets the browser tab title and renders the `h1`.
 */
import type { ReactNode } from 'react';
import profile from '../data/profile.json';

export function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <title>{`${title} | ${profile.name}`}</title>
      <p className="eyebrow">Software / systems / learning</p>
      <h1>{title}</h1>
      {children}
    </>
  );
}
