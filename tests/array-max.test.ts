import type { ArrayMax } from 'src';
import type { TestType } from 'ts-roids';
import { test, expect } from 'vitest';

test('returns single number in array', () => {
  const result: TestType<ArrayMax<[2]>, 2, true> = true;
  expect(result).toBe(true);
});

test('finds maximum in array with mixed positive and negative numbers', () => {
  const result: TestType<ArrayMax<[-54, 2, 0, 999, 69, 2]>, 999, true> = true;
  expect(result).toBe(true);
});

test('finds maximum in array with all negative numbers', () => {
  const result: TestType<
    ArrayMax<[-54, -2, -90, -72, -69, -202]>,
    -2,
    true
  > = true;
  expect(result).toBe(true);
});

test('handles empty array', () => {
  const result: TestType<ArrayMax<[]>, never, true> = true;
  expect(result).toBe(true);
});

test('handles array with zeros', () => {
  const result: TestType<ArrayMax<[-0, 0, 0, -0]>, 0, true> = true;
  expect(result).toBe(true);
});

test('handles array with decimal numbers', () => {
  const result: TestType<ArrayMax<[-1.5, 2.7, 0.1, -3.9]>, 2.7, true> = true;
  expect(result).toBe(true);
});
