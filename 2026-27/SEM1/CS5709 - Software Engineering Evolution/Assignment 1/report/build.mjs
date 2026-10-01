import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { escape } from '../site/html.mjs';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));

// Authored source in build order. Generated output and images are excluded.
const files = [
  'site/package.json',
  '.prettierrc.json',
  'site/build.mjs',
  'site/layout.mjs',
  'site/profile.mjs',
  'site/html.mjs',
  'site/projects.mjs',
  'site/pages/home.mjs',
  'site/pages/about.mjs',
  'site/pages/education.mjs',
  'site/pages/knowledge.mjs',
  'site/pages/pictures.mjs',
  'site/pages/videos.mjs',
  'site/pages/blog.mjs',
  'site/pages/blog-logging.mjs',
  'site/pages/blog-mcp.mjs',
  'site/pages/contact.mjs',
  'site/pages/missing.mjs',
  'site/filter.mjs',
  'site/navigation.mjs',
  'site/chat.mjs',
  'site/style.css',
  'site/test.mjs',
  'site/chat.test.mjs',
  'site/browser-check.mjs',
  'site/check-links.mjs',
  'video/mcp-explainer.html',
  'appwrite.config.json',
];

async function listing(file) {
  const source = (await readFile(`../${file}`, 'utf8')).replace(/\n$/, '');
  const lines = source.split('\n').map(line => `<span>${escape(line) || ' '}</span>`);
  return `<div class="listing-file">
  <h3>${file}</h3>
  <pre class="listing">${lines.join('')}</pre>
</div>`;
}

// Contents page numbers come from the previous render by pdf.mjs.
let pages = {};
try {
  pages = JSON.parse(await readFile('dist/pages.json', 'utf8'));
} catch {
  // First render: page numbers are filled in on the second pass.
}

const listings = await Promise.all(files.map(listing));
const html = (await readFile('source.html', 'utf8'))
  .replace('<!-- listing -->', () => listings.join('\n'))
  .replace(
    /<span data-page-of="([a-z]+)"><\/span>/g,
    (span, id) => `<span>${pages[id] ?? ''}</span>`,
  )
  .replaceAll('href="report.css"', 'href="../report.css"')
  .replaceAll('src="diagrams/', 'src="../diagrams/')
  .replaceAll('src="../evidence/', 'src="../../evidence/');
await writeFile('dist/report.html', html);

const todos = (html.match(/class="todo(-inline)?"/g) || []).length;
console.log(
  `Built dist/report.html with ${files.length} source files. Unresolved to-do markers: ${todos}.`,
);
