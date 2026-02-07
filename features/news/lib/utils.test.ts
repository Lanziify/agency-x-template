import { describe, expect, it } from 'vitest';
import { buildPaginationUrl } from './utils';

describe('buildPaginationUrl', () => {
  it('return base path when no params', () => {
    expect(buildPaginationUrl({})).toBe('/news');
  });

  it('adds page param', () => {
    expect(buildPaginationUrl({ page: 2 })).toBe('/news?page=2');
  });

  it('adds category param', () => {
    expect(buildPaginationUrl({ category: 'foo' })).toBe('/news?category=foo');
  });

  it('adds category and page', () => {
    expect(buildPaginationUrl({ page: 3, category: 'foo' })).toBe('/news?category=foo&page=3');
  });

  it('excludes category when includeCategory is false', () => {
    expect(
      buildPaginationUrl({
        page: 1,
        category: 'foo',
        includeCategory: false,
      })
    ).toBe('/news?page=1');
  });
});
