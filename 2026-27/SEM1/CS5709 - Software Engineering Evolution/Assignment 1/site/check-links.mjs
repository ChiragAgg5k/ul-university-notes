import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Requests every external link in the built pages. Kept out of `npm test`
// because it depends on the network and on other sites being up.
const dist = fileURLToPath(new URL('./dist/', import.meta.url));
// These sites reject automated requests even when the page exists.
const blocked = { 'www.linkedin.com': [999] };

const links = new Map();
for (const file of (await readdir(dist)).filter(name => name.endsWith('.html'))) {
  const html = await readFile(`${dist}${file}`, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/g)) {
    links.set(url, [...(links.get(url) ?? []), file]);
  }
}

const failures = [];
await Promise.all(
  [...links].map(async ([url, files]) => {
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        headers: { 'user-agent': 'Mozilla/5.0 portfolio link check' },
      });
      if (!response.ok && !blocked[new URL(url).host]?.includes(response.status)) {
        failures.push(`${response.status} ${url} (${files.join(', ')})`);
      }
    } catch (error) {
      failures.push(`${error.message} ${url} (${files.join(', ')})`);
    }
  }),
);

console.log(`Checked ${links.size} external links.`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
