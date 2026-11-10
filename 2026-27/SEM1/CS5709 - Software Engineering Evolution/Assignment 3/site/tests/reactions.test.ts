/**
 * @file Unit tests for the rule that names a reaction's database row.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { digest, identify, kinds } from '../src/api/reactionIdentity.ts';

const visitor = '6731a0f2001c9b7d4e5f';
const rowIdentifierLimit = 36;
const allowed = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;

test('the same visitor, article and kind give the same identifier', () => {
  assert.equal(
    identify(visitor, 'an-article', 'useful'),
    identify(visitor, 'an-article', 'useful'),
  );
});

test('a different article, kind or visitor gives a different identifier', () => {
  const base = identify(visitor, 'an-article', 'useful');
  assert.notEqual(identify(visitor, 'another-article', 'useful'), base);
  assert.notEqual(identify(visitor, 'an-article', 'clear'), base);
  assert.notEqual(identify('6731a0f2001c9b7d4e60', 'an-article', 'useful'), base);
});

test('identifiers fit the database limit for every kind, however long the slug', () => {
  const slug = 'how-i-built-the-appwrite-mcp-server-and-decided-to-hide-most-of-it';
  for (const kind of kinds) {
    const identifier = identify(visitor, slug, kind);
    assert.ok(identifier.length <= rowIdentifierLimit, identifier);
    assert.match(identifier, allowed);
  }
});

test('the digest is always eight hexadecimal characters', () => {
  for (const text of ['', 'a', 'how-we-solved-logging-at-appwrite', 'ünïcödé']) {
    assert.match(digest(text), /^[0-9a-f]{8}$/);
  }
});
