/**
 * @file Builds the Assessment 5 report: renders the PlantUML diagrams, converts Markdown to HTML,
 * adds a contents page with real page numbers, then prints a PDF with headless Chrome.
 *
 * Names that must stay out of the public repository are read from `private.json`
 * (`{ "reviewer": "Name (ID)", "reviewerReference": "Surname, I." }`), which is not committed.
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { marked } from '../../Assignment 3/site/node_modules/marked/lib/marked.esm.js';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));

const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const pdf = 'dist/ID26253925_CS5709_Assessment5_Technical_Report.pdf';
const title = 'From static pages to a cloud-backed application: documenting the evolution of a developer portfolio';
const abstractTarget = 250;

async function diagrams() {
  if (!existsSync('diagrams')) return;
  const sources = (await readdir('diagrams')).filter(name => name.endsWith('.puml'));
  if (sources.length === 0) return;
  execFileSync('plantuml', ['-tsvg', '-o', '../dist/diagrams', ...sources.map(name => `diagrams/${name}`)], {
    stdio: 'inherit',
  });
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

async function build(pages) {
  const { html, names } = await body();
  const headings = [...html.matchAll(/<h2>(.+?)<\/h2>/g)].map(match => match[1]);
  const contents = headings
    .map(heading => `<li><span>${heading}</span><span>${pages[heading] ?? ''}</span></li>`)
    .join('\n');
  const sections = html.replace(/<h2>(?!Abstract|1\. )/g, '<h2 class="new-page">');
  const output = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title} | Chirag Aggarwal</title>
<link rel="stylesheet" href="../report.css">
</head>
<body>
<section class="cover">
  <h1>${title}</h1>
  <dl class="cover-details">
    <dt>Module code</dt><dd>CS5709 Software Engineering Evolution, 2026/27 Semester 1</dd>
    <dt>Assessment</dt><dd>Assessment 5: Technical report</dd>
    <dt>Student name</dt><dd>Chirag Aggarwal</dd>
    <dt>Student ID</dt><dd>26253925</dd>
    <dt>Module instructor</dt><dd>Dr Salim Saay</dd>
    <dt>Author name</dt><dd>Chirag Aggarwal</dd>
    <dt>Reviewer name</dt><dd>${names.reviewer} (peer review of Phase 1)</dd>
    <dt>Date</dt><dd>${process.env.REPORT_DATE ?? '4 December 2026'}</dd>
    <dt>Live site</dt><dd>https://chiragagg5k.github.io/ul-university-notes/</dd>
    <dt>Repository</dt><dd>https://github.com/ChiragAgg5k/ul-university-notes (folder 2026-27/SEM1/CS5709 - Software Engineering Evolution)</dd>
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
</body>
</html>`;
  await writeFile(
    'dist/report.html',
    output
      .replaceAll('src="../../Assignment 3/evidence/', 'src="../../../Assignment 3/evidence/')
      .replaceAll('src="../evidence/', 'src="../../evidence/'),
  );
  return { headings, todos: (output.match(/class="todo"/g) ?? []).length };
}

function render() {
  execFileSync(
    chrome,
    ['--headless', '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, new URL('dist/report.html', import.meta.url).href],
    { stdio: 'ignore' },
  );
  return execFileSync('pdftotext', ['-layout', pdf, '-'], { encoding: 'utf8' }).split('\f').slice(0, -1);
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
await diagrams();
const first = await build({});
const numbers = locate(first.headings, render());
const { todos } = await build(numbers);
const pages = render();
if (JSON.stringify(locate(first.headings, pages)) !== JSON.stringify(numbers)) {
  throw new Error('Contents numbering moved a section; run again.');
}

// Count authored abstract text only. Drafting prompts can span several lines.
const source = await readFile('report.md', 'utf8');
const abstractText = source.split(/^## Abstract\s*$/m)[1].split(/^## /m)[0]
  .replace(/<div class="todo">[\s\S]*?<\/div>/g, '');
const abstract = abstractText.trim().split(/\s+/).filter(Boolean).length;
console.log(`Wrote ${pdf}: ${pages.length} pages.`);
console.log(`Abstract words: ${abstract} (target ${abstractTarget}).`);
console.log(`Sections still to write: ${todos}.`);
