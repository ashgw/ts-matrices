import type { ArrayUnique } from 'src';
import type { TestType } from 'ts-roids';
import { test, expect } from 'vitest';

test('removes duplicates from array of numbers', () => {
  const result: TestType<
    ArrayUnique<[1, 1, 2, 2, 3, 3]>,
    [1, 2, 3],
    true
  > = true;
  expect(result).toBe(true);
});

test('preserves order while removing duplicates', () => {
  const result: TestType<
    ArrayUnique<[1, 2, 3, 4, 4, 5, 6, 7]>,
    [1, 2, 3, 4, 5, 6, 7],
    true
  > = true;
  expect(result).toBe(true);
});

test('handles mixed number and string types', () => {
  const result: TestType<
    ArrayUnique<[1, 'a', 2, 'b', 2, 'a']>,
    [1, 'a', 2, 'b'],
    true
  > = true;
  expect(result).toBe(true);
});

test('deduplicates type literals and primitive types', () => {
  const result: TestType<
    ArrayUnique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>,
    [string, number, 1, 'a', 2, 'b'],
    true
  > = true;
  expect(result).toBe(true);
});

test('handles special types and coercion edge cases', () => {
  const result: TestType<
    ArrayUnique<[unknown, unknown, 'foo', any, never, never, '33', 33, '33']>,
    [unknown, 'foo', any, never, '33', 33],
    true
  > = true;
  expect(result).toBe(true);
});
