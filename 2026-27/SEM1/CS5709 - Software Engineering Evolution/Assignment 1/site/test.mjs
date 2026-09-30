import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('./dist/', import.meta.url));
const files = (await readdir(dist)).filter(file => file.endsWith('.html'));
test('all required page documents exist', () => {
  for (const file of ['index.html', 'about.html', 'education.html', 'knowledge.html', 'pictures.html', 'videos.html', 'blog.html', 'contact.html', 'blog-mcp.html', '404.html']) assert.ok(files.includes(file), file);
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
test('unfinished requirements are disclosed rather than simulated', async () => {
  assert.match(await readFile(resolve(dist, 'contact.html'), 'utf8'), /not connected yet/);
  assert.match(await readFile(resolve(dist, 'videos.html'), 'utf8'), /not finished/);
});
