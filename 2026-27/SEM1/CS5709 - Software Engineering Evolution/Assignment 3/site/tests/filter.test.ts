/**
 * @file Unit tests for the filtering rules and the filter reducer.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { distinctTags, matches } from '../src/state/matches.ts';
import { everyTag, initialState, reduce } from '../src/state/PortfolioContext.ts';

const everything = { query: '', tag: everyTag };

test('an empty filter matches every item', () => {
  assert.equal(matches(['Appwrite CLI'], ['Go'], everything), true);
});

test('a selected tag must be one of the item tags', () => {
  assert.equal(matches(['Appwrite CLI'], ['Go', 'APIs'], { query: '', tag: 'APIs' }), true);
  assert.equal(matches(['Appwrite CLI'], ['Go', 'APIs'], { query: '', tag: 'CSS' }), false);
});

test('a tag is matched exactly, not as part of a longer tag', () => {
  assert.equal(matches(['Portfolio'], ['JavaScript'], { query: '', tag: 'Java' }), false);
});

test('search ignores case and surrounding spaces', () => {
  assert.equal(
    matches(['Hosted Appwrite MCP server'], [], { query: '  mcp ', tag: everyTag }),
    true,
  );
});

test('search also looks through the tags', () => {
  assert.equal(matches(['Appwrite CLI'], ['Go'], { query: 'go', tag: everyTag }), true);
});

test('search and tag must both match', () => {
  assert.equal(matches(['Appwrite CLI'], ['Go'], { query: 'server', tag: 'Go' }), false);
});

test('distinct tags keep the order of first mention', () => {
  assert.deepEqual(distinctTags([{ tags: ['Go', 'APIs'] }, { tags: ['APIs', 'CSS'] }]), [
    'Go',
    'APIs',
    'CSS',
  ]);
});

test('searching one collection leaves the others untouched', () => {
  const next = reduce(initialState, { type: 'search', collection: 'posts', query: 'logging' });
  assert.equal(next.posts.query, 'logging');
  assert.equal(next.projects, initialState.projects);
  assert.equal(next.photos, initialState.photos);
});

test('selecting a tag keeps the search text', () => {
  const searched = reduce(initialState, { type: 'search', collection: 'projects', query: 'cli' });
  const next = reduce(searched, { type: 'select', collection: 'projects', tag: 'Go' });
  assert.deepEqual(next.projects, { query: 'cli', tag: 'Go' });
});

test('reset returns a collection to the empty filter', () => {
  const selected = reduce(initialState, { type: 'select', collection: 'photos', tag: 'Hackathon' });
  const next = reduce(selected, { type: 'reset', collection: 'photos' });
  assert.deepEqual(next.photos, everything);
});

test('the reducer never changes the state it was given', () => {
  const before = structuredClone(initialState);
  reduce(initialState, { type: 'search', collection: 'projects', query: 'x' });
  assert.deepEqual(initialState, before);
});
