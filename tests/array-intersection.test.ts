import type { ArrayIntersection } from 'src';
import type { TestType } from 'ts-roids';
import { test, expect } from 'vitest';

test('finds intersection of array and union types', () => {
  const result: TestType<
    ArrayIntersection<[[1, 0, 1], 0 | 1 | -1, 0 | 1]>,
    0 | 1,
    true
  > = true;
  expect(result).toBe(true);
});

test('finds single number intersection across array and literal', () => {
  const result: TestType<
    ArrayIntersection<[[1, 0, 1], [0, 1, -1], 1]>,
    1,
    true
  > = true;
  expect(result).toBe(true);
});

test('finds common element across multiple arrays', () => {
  const result: TestType<
    ArrayIntersection<[[1, 0], [0, 1], [0, 0]]>,
    0,
    true
  > = true;
  expect(result).toBe(true);
});

test('finds multiple common elements across arrays', () => {
  const result: TestType<
    ArrayIntersection<[[1, 0, 1], [0, 1, -1], [0, 0, 1]]>,
    0 | 1,
    true
  > = true;
  expect(result).toBe(true);
});

test('returns never when no common elements exist', () => {
  const result: TestType<
    ArrayIntersection<[[1, 0], [-1, -1], [5, 6]]>,
    never,
    true
  > = true;
  expect(result).toBe(true);
});

test('handles arrays with duplicate elements', () => {
  const result: TestType<
    ArrayIntersection<[[0, 0, 0], [0, 1, 0], [0, 2, 0]]>,
    0,
    true
  > = true;
  expect(result).toBe(true);
});

test('works with string literals', () => {
  const result: TestType<
    ArrayIntersection<[['a', 'b'], ['b', 'c'], ['b', 'd']]>,
    'b',
    true
  > = true;
  expect(result).toBe(true);
});

test('handles mixed number and string types', () => {
  const result: TestType<
    ArrayIntersection<[[1, 'a'], ['a', 2], ['a', 3]]>,
    'a',
    true
  > = true;
  expect(result).toBe(true);
});
