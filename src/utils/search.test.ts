import test from 'node:test';
import assert from 'node:assert/strict';
import { APP_CATALOG, filterCatalog } from './search';

test('returns all items when query is empty and category is All', () => {
  const results = filterCatalog(APP_CATALOG, '', 'All');
  assert.equal(results.length, APP_CATALOG.length);
});

test('filters items by keyword matching kitchen', () => {
  const results = filterCatalog(APP_CATALOG, 'kitchen', 'All');
  assert.ok(results.length > 0);
  assert.ok(results.some(r => r.id === 'modular-kitchen-german'));
});

test('filters items by category pill', () => {
  const results = filterCatalog(APP_CATALOG, '', 'Modular Kitchens');
  assert.equal(results.length, 1);
  assert.equal(results[0].category, 'Modular Kitchens');
});

test('matches search query in keywords or description', () => {
  const results = filterCatalog(APP_CATALOG, 'kamla nagar', 'All');
  assert.ok(results.length > 0);
  assert.equal(results[0].id, 'google-client-reviews');
});

test('returns empty array when query does not match anything', () => {
  const results = filterCatalog(APP_CATALOG, 'nonexistenttermxyz999', 'All');
  assert.equal(results.length, 0);
});
