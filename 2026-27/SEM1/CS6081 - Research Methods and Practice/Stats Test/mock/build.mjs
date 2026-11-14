/**
 * @file Builds the mock test document and the practice page from one content file, so the
 * questions and marking schemes cannot differ between them. The page also carries the prep plan,
 * the by-hand exercises, the lecturer's sample test and the recall sheet from prep.json.
 *
 * Usage: node build.mjs <folder for the practice page>
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));

const content = JSON.parse(await readFile('content.json', 'utf8'));
const prep = JSON.parse(await readFile('prep.json', 'utf8'));
const template = await readFile('template.html', 'utf8');
const output = process.argv[2];

function table(rows) {
  const [head, ...body] = rows;
  const line = cells => `| ${cells.join(' | ')} |`;
  return [line(head), line(head.map(() => '---')), ...body.map(line)].join('\n');
}

const papers = content.papers.map(paper => {
  const questions = paper.questions.map((question, index) =>
    [`**Q${index + 1}.** ${question.prompt}`, question.table ? table(question.table) : null]
      .filter(Boolean)
      .join('\n\n'),
  );
  const schemes = paper.questions.map(
    (question, index) =>
      `**Q${index + 1}**\n\n${question.scheme.map(point => `- ${point}`).join('\n')}`,
  );
  return `## ${paper.title}\n\n${paper.focus}. Five questions, 4 marks each, 35 minutes, closed book.\n\n${questions.join('\n\n')}\n\n### Marking scheme for paper ${paper.id}\n\nOne mark per point.\n\n${schemes.join('\n\n')}`;
});

const drill = table([
  ['Study', 'Test', 'Why'],
  ...content.drill.map(study => [study.scenario, study.answer, study.why]),
]);

await writeFile(
  '../Mock Tests.md',
  `# Statistics test: mock papers

Three practice papers in the shape of the lecturer's sample test: five questions, 4 marks each, 35 minutes. They were written from the Week 9 lecture and its worked examples; they are not the lecturer's questions, and the marking schemes are my reading of what earns the marks.

Sit each one on paper, closed book, with a timer. Mark it only after the 35 minutes are up.

${papers.join('\n\n')}

## Drill: name the test

Cover the last two columns.

${drill}
`,
);
if (output) {
  await writeFile(`${output}/stats-drill.html`, template.replace('/*CONTENT*/', () => JSON.stringify({ ...content, ...prep })));
}
console.log(`Wrote Mock Tests.md${output ? ' and the practice page' : ''}.`);
