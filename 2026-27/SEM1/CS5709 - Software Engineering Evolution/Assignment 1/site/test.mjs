import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { matchesSkill, projects, skills } from './projects.mjs';

const dist = fileURLToPath(new URL('./dist/', import.meta.url));
const files = (await readdir(dist)).filter(file => file.endsWith('.html'));
test('all required page documents exist', () => {
  for (const file of ['index.html', 'about.html', 'education.html', 'knowledge.html', 'pictures.html', 'videos.html', 'blog.html', 'contact.html', 'blog-mcp.html', 'blog-static.html', '404.html']) assert.ok(files.includes(file), file);
});
for (const file of files) {
  test(`${file}: structure and local links`, async () => {
    const html = await readFile(resolve(dist, file), 'utf8');
    assert.equal((html.match(/<h1>/g) || []).length, 1);
    assert.ok(html.includes('lang="en"'));
    assert.ok(html.includes('href="#main"'));
    assert.ok(html.includes('id="main"'));
    assert.ok(html.includes('aria-label="Main navigation"'));
    if (file !== '404.html') assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
    for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|#)/.test(url)) continue;
      await access(resolve(dirname(resolve(dist, file)), url));
    }
    for (const [image] of html.matchAll(/<img\b[^>]*>/g)) assert.match(image, /alt="[^"]+"/);
  });
}
test('filter matches exact skills and All restores every project', () => {
  for (const project of projects) {
    assert.ok(matchesSkill(project.skills, 'All'));
    for (const skill of project.skills) assert.ok(matchesSkill(project.skills, skill));
    assert.equal(matchesSkill(project.skills, 'not-a-skill'), false);
  }
  assert.equal(matchesSkill(['JavaScript'], 'Java'), false);
  for (const skill of skills) assert.ok(projects.some(project => matchesSkill(project.skills, skill)));
});
test('project evidence is server-rendered and controls are progressively enhanced', async () => {
  const html = await readFile(resolve(dist, 'knowledge.html'), 'utf8');
  for (const project of projects) assert.ok(html.includes(project.title));
  assert.match(html, /data-project-filter hidden/);
  assert.match(html, /role="status"/);
  assert.equal((html.match(/class="case-study"/g) || []).length, 3);
});
test('unfinished requirements are disclosed rather than simulated', async () => {
  assert.match(await readFile(resolve(dist, 'contact.html'), 'utf8'), /not connected yet/);
  assert.match(await readFile(resolve(dist, 'videos.html'), 'utf8'), /not finished/);
});
