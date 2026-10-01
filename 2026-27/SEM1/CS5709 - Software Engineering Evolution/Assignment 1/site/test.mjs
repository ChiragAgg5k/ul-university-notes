import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { matchesSkill, projects, skills } from './projects.mjs';
import { internalPageURLs } from './navigation.mjs';

const dist = fileURLToPath(new URL('./dist/', import.meta.url));
const files = (await readdir(dist)).filter(file => file.endsWith('.html'));
test('all required page documents exist', () => {
  for (const file of [
    'index.html',
    'about.html',
    'education.html',
    'knowledge.html',
    'pictures.html',
    'blog.html',
    'contact.html',
    'blog-mcp.html',
    'blog-logging.html',
    '404.html',
  ])
    assert.ok(files.includes(file), file);
});
for (const file of files) {
  test(`${file}: structure and local links`, async () => {
    const html = await readFile(resolve(dist, file), 'utf8');
    assert.equal((html.match(/<h1>/g) || []).length, 1);
    assert.ok(html.includes('lang="en"'));
    assert.ok(!html.includes('\u2014'), 'No em dashes in generated pages');
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
test('404 links resolve from the site root at any missing path', async () => {
  const html = await readFile(resolve(dist, '404.html'), 'utf8');
  assert.match(html, /<base href="\/">/);
  for (const file of files.filter(file => file !== '404.html')) {
    assert.ok(!(await readFile(resolve(dist, file), 'utf8')).includes('<base'), file);
  }
});
function luminance(hex) {
  const channels = hex.match(/[0-9a-f]{2}/gi).map(channel => parseInt(channel, 16) / 255);
  const [red, green, blue] = channels.map(value =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}
function contrast(foreground, background) {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}
test('text colour pairs meet WCAG AA contrast for normal text', async () => {
  const css = await readFile(new URL('./style.css', import.meta.url), 'utf8');
  const tokens = Object.fromEntries(
    [...css.matchAll(/--(\w+): (#[0-9a-f]{6}|#fff)\b/gi)].map(([, name, value]) => [
      name,
      value === '#fff' ? '#ffffff' : value,
    ]),
  );
  const pairs = [
    ['ink', 'paper'],
    ['ink', 'background'],
    ['muted', 'paper'],
    ['muted', 'background'],
    ['blue', 'paper'],
    ['blue', 'background'],
    ['paper', 'blue'],
  ];
  for (const [foreground, background] of pairs) {
    const ratio = contrast(tokens[foreground], tokens[background]);
    assert.ok(ratio >= 4.5, `${foreground} on ${background}: ${ratio.toFixed(2)}`);
  }
});
test('filter matches exact skills and All restores every project', () => {
  for (const project of projects) {
    assert.ok(matchesSkill(project.skills, 'All'));
    for (const skill of project.skills) assert.ok(matchesSkill(project.skills, skill));
    assert.equal(matchesSkill(project.skills, 'not-a-skill'), false);
  }
  assert.equal(matchesSkill(['JavaScript'], 'Java'), false);
  for (const skill of skills)
    assert.ok(projects.some(project => matchesSkill(project.skills, skill)));
});
test('project evidence is server-rendered and controls are progressively enhanced', async () => {
  const html = await readFile(resolve(dist, 'knowledge.html'), 'utf8');
  for (const project of projects) assert.ok(html.includes(project.title));
  assert.match(html, /data-project-filter hidden/);
  assert.match(html, /role="status"/);
  assert.equal((html.match(/class="case-study"/g) || []).length, 3);
});
test('navigation preparation is limited to distinct same-origin HTML pages', () => {
  assert.deepEqual(
    internalPageURLs(
      [
        'about.html',
        'about.html',
        'index.html',
        '#main',
        'assets/me.webp',
        'https://external.example/about.html',
        'mailto:hello@example.com',
        'contact.html?message=private',
        'about.html#experience',
        'blog.html',
      ],
      'https://portfolio.example/index.html',
    ),
    ['https://portfolio.example/about.html', 'https://portfolio.example/blog.html'],
  );
});
test('chat is loaded on request and discloses its provider', async () => {
  const contact = await readFile(resolve(dist, 'contact.html'), 'utf8');
  assert.match(contact, /data-open-chat/);
  assert.match(contact, /Tawk.to privacy policy/);
  assert.match(contact, /when available/);
  assert.ok(!contact.includes('src="https://embed.tawk.to'), 'Provider is not eagerly embedded');
});
