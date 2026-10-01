import { execFileSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));

const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const html = new URL('dist/report.html', import.meta.url).href;
const pdf = 'dist/report.pdf';

// Each heading is matched in the PDF text to number the contents page.
const headings = {
  declaration: '1. Declaration and transparency',
  abstract: '2. Abstract',
  discovery: '3. Discovery, feature narrative',
  design: '4. Design',
  listing: '5. Code listing',
  evaluation: '6. Evaluation, innovation',
  references: '7. References',
};

function render() {
  execFileSync('node', ['build.mjs'], { stdio: 'inherit' });
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

// Numbering the contents cannot move a section: the contents page has room
// for every number, so a second pass is enough.
await writeFile('dist/pages.json', '{}');
const numbers = sectionPages(render());
await writeFile('dist/pages.json', JSON.stringify(numbers));
const pages = render();
if (JSON.stringify(sectionPages(pages)) !== JSON.stringify(numbers))
  throw new Error('Contents numbering moved a section; run again.');
console.log(`Wrote ${pdf}: ${pages.length} pages.`, numbers);
