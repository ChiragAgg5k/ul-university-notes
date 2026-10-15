import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));

const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const html = new URL('dist/report.html', import.meta.url).href;
const pdf = 'dist/ID26253925_CS5709_Assessment2_Peer_Review.pdf';

// Each heading is matched in the PDF text to number the contents page.
const headings = {
  summary: 'Summary',
  reverse: '1. Reverse engineering',
  inspection: '2. Architecture recovery and code inspection',
  feedback: '3. Feedback',
  reflection: '4. Reflection on review',
  references: 'References',
};

async function build(pages) {
  const source = await readFile('source.html', 'utf8');
  const output = source
    .replace(
      /<span data-page-of="([a-z]+)"><\/span>/g,
      (span, id) => `<span>${pages[id] ?? ''}</span>`,
    )
    .replaceAll('href="report.css"', 'href="../report.css"')
    .replaceAll('src="figures/', 'src="../figures/');
  await writeFile('dist/report.html', output);
  return (output.match(/class="todo(-inline)?"/g) || []).length;
}

function render() {
  execFileSync(chrome, ['--headless', '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, html], {
    stdio: 'ignore',
  });
  return execFileSync('pdftotext', ['-layout', pdf, '-'], { encoding: 'utf8' })
    .split('\f')
    .slice(0, -1);
}

function sectionPages(pages) {
  // Skip the cover and contents so their own entries are not matched.
  return Object.fromEntries(
    Object.entries(headings).map(([id, heading]) => {
      const index = pages.findIndex((page, number) => number > 1 && page.includes(heading));
      if (index === -1) throw new Error(`Heading not found in PDF: ${heading}`);
      return [id, index + 1];
    }),
  );
}

function words(pages, from, to) {
  // Skip the cover and contents, which also contain the headings.
  const text = pages.slice(2).join('\n');
  const start = text.indexOf(headings[from]);
  const end = text.indexOf(headings[to], start);
  return text
    .slice(start + headings[from].length, end)
    .split(/\s+/)
    .filter(Boolean).length;
}

// Numbering the contents cannot move a section: the contents page has room
// for every number, so a second pass is enough.
await mkdir('dist', { recursive: true });
await build({});
const numbers = sectionPages(render());
const todos = await build(numbers);
const pages = render();
if (JSON.stringify(sectionPages(pages)) !== JSON.stringify(numbers))
  throw new Error('Contents numbering moved a section; run again.');

const lengths = {
  reverse: numbers.inspection - numbers.reverse,
  inspection: numbers.feedback - numbers.inspection,
  feedback: numbers.reflection - numbers.feedback,
  reflection: numbers.references - numbers.reflection,
};
console.log(`Wrote ${pdf}: ${pages.length} pages.`, numbers);
console.log(`Summary words: ${words(pages, 'summary', 'reverse')} (target 250).`);
console.log('Section pages (limits 2, 2, 2, 1):', lengths);
console.log(`Unresolved to-do markers: ${todos}.`);
