// Prepare real HTML documents rather than replacing native navigation with a router.
// Unsupported browsers, data-saving connections and no-JS visits keep ordinary links.
export function internalPageURLs(links, currentURL) {
  const current = new URL(currentURL);
  return [
    ...new Set(
      links
        .map(href => new URL(href, current))
        .filter(
          url =>
            url.origin === current.origin &&
            url.pathname.endsWith('.html') &&
            !url.search &&
            !url.hash &&
            url.href !== current.href,
        )
        .map(url => url.href),
    ),
  ];
}

if (
  typeof document !== 'undefined' &&
  HTMLScriptElement.supports?.('speculationrules') &&
  !navigator.connection?.saveData &&
  !['slow-2g', '2g'].includes(navigator.connection?.effectiveType)
) {
  const urls = internalPageURLs(
    [...document.querySelectorAll('a[href]')].map(link => link.href),
    location.href,
  );
  const rules = document.createElement('script');
  rules.type = 'speculationrules';
  rules.textContent = JSON.stringify({
    // Fetch only document HTML ahead of time, not every page's images.
    prefetch: [{ source: 'list', urls, eagerness: 'immediate' }],
    // Render a destination when the browser sees intent (hover/focus/pointer down).
    prerender: [
      {
        source: 'document',
        where: {
          and: [
            { or: urls.map(url => ({ href_matches: url })) },
            { selector_matches: 'nav a, main a, a.identity' },
          ],
        },
        eagerness: 'moderate',
      },
    ],
  });
  document.head.append(rules);
}
