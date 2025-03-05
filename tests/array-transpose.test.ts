import type { ArrayTranspose } from 'src';
import type { Optional, Nullable, Numeric, TestType } from 'ts-roids';
import { test, expect } from 'vitest';

test('transposes array with complex types and handles uneven rows', () => {
  const result: TestType<
    ArrayTranspose<[[1, Optional<Numeric>, Nullable, 3], [4, 5, 6]]>,
    [[1, 4], [Optional<Numeric>, 5], [Nullable, 6], [3, never]],
    true
  > = true;
  expect(result).toBe(true);
});

test('handles single element array', () => {
  const result: TestType<ArrayTranspose<[[1]]>, [[1]], true> = true;
  expect(result).toBe(true);
});

test('transposes array with mixed number and boolean types', () => {
  const result: TestType<
    ArrayTranspose<[[1, true, 3], [4, 5, 6]]>,
    [[1, 4], [true, 5], [3, 6]],
    true
  > = true;
  expect(result).toBe(true);
});

test('transposes array with mixed number and string types', () => {
  const result: TestType<
    ArrayTranspose<[[1, 'i'], [3, 4]]>,
    [[1, 3], ['i', 4]],
    true
  > = true;
  expect(result).toBe(true);
});

test('handles empty array', () => {
  const result: TestType<ArrayTranspose<[]>, [], true> = true;
  expect(result).toBe(true);
});

test('transposes array with single row', () => {
  const result: TestType<
    ArrayTranspose<[[1, 2, 3]]>,
    [[1], [2], [3]],
    true
  > = true;
  expect(result).toBe(true);
});

test('transposes array with single column', () => {
  const result: TestType<
    ArrayTranspose<[[1], [2], [3]]>,
    [[1, 2, 3]],
    true
  > = true;
  expect(result).toBe(true);
});
