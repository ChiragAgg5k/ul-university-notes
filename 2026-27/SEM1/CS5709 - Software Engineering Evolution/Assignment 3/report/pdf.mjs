/**
 * @file Builds the Assessment 3 report: Markdown to HTML, a contents page with real page numbers,
 * a code listing appendix read from the source tree, then a PDF printed by headless Chrome.
 *
 * Names that must stay out of the public repository are read from `private.json`
 * (`{ "reviewer": "Name (ID)", "reviewerReference": "Surname, I." }`), which is not committed.
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { marked } from '../site/node_modules/marked/lib/marked.esm.js';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));

const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const pdf = 'dist/ID26253925_CS5709_Assessment3_Digital_Portfolio_Phase2.pdf';
const summaryTarget = 250;
const listingTitle = 'Appendix A. Code listing';
const listed = [
  [
    '../../../../../.github/workflows/cs5709-portfolio.yml',
    '.github/workflows/cs5709-portfolio.yml',
  ],
  ...(await sources('../site/src')),
  ...(await sources('../site/tests')),
];

/** Lists code files under a folder, as pairs of path on disk and name to print. */
async function sources(folder) {
  const entries = await readdir(folder, { recursive: true });
  return entries
    .filter(entry => /\.(ts|tsx|mjs)$/.test(entry))
    .sort()
    .map(entry => [`${folder}/${entry}`, `${folder.replace('../', '')}/${entry}`]);
}

function escape(text) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

async function body() {
  const names = existsSync('private.json')
    ? JSON.parse(await readFile('private.json', 'utf8'))
    : { reviewer: 'a classmate', reviewerReference: 'Peer reviewer.' };
  let text = await readFile('report.md', 'utf8');
  for (const [, path] of text.matchAll(/<!-- include (.+?) -->/g)) {
    const included = (await readFile(path, 'utf8')).split('\n').slice(2).join('\n');
    text = text.replace(`<!-- include ${path} -->`, included);
  }
  text = text
    .replaceAll('{{reviewerReference}}', names.reviewerReference)
    .replaceAll('{{reviewer}}', names.reviewer);
  return { html: marked.parse(text, { async: false }), names };
}

async function listing() {
  const parts = [];
  for (const [path, name] of listed) {
    const source = (await readFile(path, 'utf8')).replace(/\n$/, '');
    parts.push(`<h4>${name}</h4><pre>${escape(source)}</pre>`);
  }
  return parts.join('\n');
}

async function build(pages) {
  const { html, names } = await body();
  const headings = [...html.matchAll(/<h2>(.+?)<\/h2>/g)].map(match => match[1]);
  headings.push(listingTitle);
  const contents = headings
    .map(heading => `<li><span>${heading}</span><span>${pages[heading] ?? ''}</span></li>`)
    .join('\n');
  const sections = html.replace(/<h2>(?!Summary|1\. )/g, '<h2 class="new-page">');
  const output = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>CS5709 Assessment 3: Digital portfolio, Phase 2 | Chirag Aggarwal</title>
<link rel="stylesheet" href="../report.css">
</head>
<body>
<section class="cover">
  <h1>Assessment 3: Digital portfolio, Phase 2</h1>
  <dl class="cover-details">
    <dt>Module code</dt><dd>CS5709 Software Engineering Evolution, 2026/27 Semester 1</dd>
    <dt>Title</dt><dd>Digital portfolio, Phase 2: technical report</dd>
    <dt>Student name</dt><dd>Chirag Aggarwal</dd>
    <dt>Student ID</dt><dd>26253925</dd>
    <dt>Module instructor</dt><dd>Dr Salim Saay</dd>
    <dt>Author name</dt><dd>Chirag Aggarwal</dd>
    <dt>Reviewer name</dt><dd>${names.reviewer}</dd>
    <dt>Date</dt><dd>${process.env.REPORT_DATE ?? '17 November 2026'}</dd>
    <dt>Live site</dt><dd>https://chiragagg5k.github.io/ul-university-notes/</dd>
    <dt>Repository</dt><dd>https://github.com/ChiragAgg5k/ul-university-notes (folder 2026-27/SEM1/CS5709 - Software Engineering Evolution/Assignment 3)</dd>
  </dl>
</section>
<section class="new-page">
  <h2>Table of contents</h2>
  <ol class="toc">
${contents}
  </ol>
</section>
<section class="new-page">
${sections}
</section>
<section class="listing">
<h2 class="new-page">${listingTitle}</h2>
<p>All application code, the tests and the pipeline, as deployed. The stylesheet, the JSON content and the article HTML are in the repository.</p>
${await listing()}
</section>
</body>
</html>`;
  await writeFile(
    'dist/report.html',
    output.replaceAll('src="../evidence/', 'src="../../evidence/'),
  );
  return { headings, todos: (output.match(/class="todo"/g) ?? []).length };
}

function render() {
  execFileSync(
    chrome,
    [
      '--headless',
      '--no-pdf-header-footer',
      `--print-to-pdf=${pdf}`,
      new URL('dist/report.html', import.meta.url).href,
    ],
    { stdio: 'ignore' },
  );
  return execFileSync('pdftotext', ['-layout', pdf, '-'], { encoding: 'utf8' })
    .split('\f')
    .slice(0, -1);
}

/** Finds the page each heading starts on, skipping the cover and the contents page. */
function locate(headings, pages) {
  return Object.fromEntries(
    headings.map(heading => {
      const plain = heading.replaceAll('&amp;', '&');
      const index = pages.findIndex(
        (page, number) => number > 1 && page.split('\n').some(line => line.trim() === plain),
      );
      if (index === -1) throw new Error(`Heading not found in PDF: ${heading}`);
      return [heading, index + 1];
    }),
  );
}

await mkdir('dist', { recursive: true });
const first = await build({});
const numbers = locate(first.headings, render());
const { todos } = await build(numbers);
const pages = render();
if (JSON.stringify(locate(first.headings, pages)) !== JSON.stringify(numbers)) {
  throw new Error('Contents numbering moved a section; run again.');
}

const text = pages.slice(2).join('\n');
const summary = text
  .slice(
    text.indexOf('Summary') + 'Summary'.length,
    text.indexOf('1. Declaration and transparency'),
  )
  .split(/\s+/)
  .filter(Boolean).length;
console.log(
  `Wrote ${pdf}: ${pages.length} pages, of which ${pages.length - numbers[listingTitle] + 1} are the code listing.`,
);
console.log(`Summary words: ${summary} (target ${summaryTarget}).`);
console.log(`Sections still to write: ${todos}.`);
