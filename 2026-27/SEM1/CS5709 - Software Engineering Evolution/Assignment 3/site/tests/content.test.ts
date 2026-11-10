/**
 * @file Checks that the content files agree with each other, the routes and the assets on disk.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

function read<Shape>(name: string): Shape {
  return JSON.parse(readFileSync(new URL(`../src/data/${name}.json`, import.meta.url), 'utf8'));
}

function exists(path: string): boolean {
  return existsSync(new URL(path, import.meta.url));
}

const routes = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');

test('every navigation link has a route', () => {
  for (const link of read<{ to: string }[]>('navigation')) {
    const found =
      link.to === '/'
        ? routes.includes('index: true')
        : routes.includes(`path: '${link.to.slice(1)}'`);
    assert.ok(found, link.to);
  }
});

test('every post has an article file and a unique slug', () => {
  const slugs = read<{ slug: string }[]>('posts').map(post => post.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) {
    assert.ok(exists(`../src/data/articles/${slug}.html`), slug);
  }
});

test('every photo file exists and has a description', () => {
  for (const photo of read<{ image: string; description: string }[]>('photos')) {
    assert.ok(exists(`../public/${photo.image}`), photo.image);
    assert.ok(photo.description.trim().length > 0, photo.image);
  }
});

test('every project has tags and a link', () => {
  for (const project of read<{ title: string; tags: string[]; url: string }[]>('projects')) {
    assert.ok(project.tags.length > 0, project.title);
    assert.match(project.url, /^https:\/\//);
  }
});
