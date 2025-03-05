import type { TestType } from 'ts-roids';
import type { MinInTwoPositiveNumbers } from 'src';
import { test, expect } from 'vitest';

test('returns the minimum of two positive numbers', () => {
  const result: TestType<MinInTwoPositiveNumbers<2, 3>, 2, true> = true;
  expect(result).toBe(true);
});

test('returns zero when both numbers are zero', () => {
  const result: TestType<MinInTwoPositiveNumbers<0, 0.00004>, 0, true> = true;
  expect(result).toBe(true);
});

test('returns the minimum of a large and a small positive number', () => {
  const result: TestType<
    MinInTwoPositiveNumbers<54, 10000000>,
    54,
    true
  > = true;
  expect(result).toBe(true);
});

test('returns zero when one number is zero and the other is positive', () => {
  const result: TestType<MinInTwoPositiveNumbers<0, 1>, 0, true> = true;
  expect(result).toBe(true);
});

test('returns zero when both numbers are zero', () => {
  const result: TestType<MinInTwoPositiveNumbers<0, 0>, 0, true> = true;
  expect(result).toBe(true);
});
