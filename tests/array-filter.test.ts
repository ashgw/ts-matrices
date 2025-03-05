import type { ArrayFilter } from 'src';
import type { Falsy, Nullable, TestType } from 'ts-roids';
import { test, expect } from 'vitest';

test('filters falsy values from array', () => {
  const result: TestType<ArrayFilter<[0, 1, 2], Falsy>, [0], true> = true;
  expect(result).toBe(true);
});

test('filters array by union type of numbers', () => {
  const result: TestType<
    ArrayFilter<[0, 1, 2, 3, 4], 0 | 2 | 4>,
    [0, 2, 4],
    true
  > = true;
  expect(result).toBe(true);
});

test('filters array by single literal type', () => {
  const result: TestType<
    ArrayFilter<[1, 'hello', true, 'world'], 'hello'>,
    ['hello'],
    true
  > = true;
  expect(result).toBe(true);
});

test('filters array with mixed types', () => {
  const result: TestType<
    ArrayFilter<[0, 'test', false, 42, null], number>,
    [0, 42],
    true
  > = true;
  expect(result).toBe(true);
});

test('filters nullable values from array', () => {
  const result: TestType<
    ArrayFilter<[1, null, 'test', undefined, 2], Nullable>,
    [null, undefined],
    true
  > = true;
  expect(result).toBe(true);
});

test('filters array by union of different types', () => {
  const result: TestType<
    ArrayFilter<[0, 'hello', true, null, 42], 0 | true | null>,
    [0, true, null],
    true
  > = true;
  expect(result).toBe(true);
});

test('handles empty array', () => {
  const result: TestType<ArrayFilter<[], number>, [], true> = true;
  expect(result).toBe(true);
});

test('filters array with all matching elements', () => {
  const result: TestType<ArrayFilter<[1, 1, 1], 1>, [1, 1, 1], true> = true;
  expect(result).toBe(true);
});
