/**
 * @file Turns a path from the JSON data into an address that works under the site's base path.
 *
 * Files in `public/` are served from the root locally and from `/ul-university-notes/` on GitHub
 * Pages, so data files store paths without a leading slash and pages resolve them here.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}
