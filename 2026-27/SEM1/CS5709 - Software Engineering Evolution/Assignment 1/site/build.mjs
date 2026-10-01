import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { layout } from './layout.mjs';
import about from './pages/about.mjs';
import blogMcp from './pages/blog-mcp.mjs';
import blogLogging from './pages/blog-logging.mjs';
import blog from './pages/blog.mjs';
import contact from './pages/contact.mjs';
import education from './pages/education.mjs';
import home from './pages/home.mjs';
import knowledge from './pages/knowledge.mjs';
import missing from './pages/missing.mjs';
import pictures from './pages/pictures.mjs';
import videos, { captions, videos as recordings } from './pages/videos.mjs';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));

// Array order is navigation order; pages without a label are not in the menu.
const pages = [
  home,
  about,
  education,
  knowledge,
  pictures,
  videos,
  blog,
  contact,
  blogLogging,
  blogMcp,
  missing,
];
const links = pages.filter(page => page.label);
const scripts = ['chat.mjs', 'filter.mjs', 'navigation.mjs', 'projects.mjs'];

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const page of pages) await writeFile(`dist/${page.file}`, layout(page, links));
for (const file of ['style.css', ...scripts]) await cp(file, `dist/${file}`);
await cp('assets', 'dist/assets', { recursive: true });
for (const video of recordings) {
  await writeFile(`dist/assets/videos/${video.name}.vtt`, captions(video));
}
console.log(`Built ${pages.length} pages.`);
