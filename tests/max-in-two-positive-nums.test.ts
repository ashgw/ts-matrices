import type { MaxInTwoPositiveNumbers } from 'src';
import type { TestType } from 'ts-roids';
import { test, expect } from 'vitest';

test('returns the larger of two positive numbers', () => {
  const result: TestType<MaxInTwoPositiveNumbers<2, 3>, 3, true> = true;
  expect(result).toBe(true);
});

test('returns the larger number when one is very small', () => {
  const result: TestType<
    MaxInTwoPositiveNumbers<0, 0.00004>,
    0.00004,
    true
  > = true;
  expect(result).toBe(true);
});

test('handles large number differences correctly', () => {
  const result: TestType<
    MaxInTwoPositiveNumbers<54, 10000000>,
    10000000,
    true
  > = true;
  expect(result).toBe(true);
});

test('returns the larger number when one is zero', () => {
  const result: TestType<MaxInTwoPositiveNumbers<0, 1>, 1, true> = true;
  expect(result).toBe(true);
});

test('returns zero when both numbers are zero', () => {
  const result: TestType<MaxInTwoPositiveNumbers<0, 0>, 0, true> = true;
  expect(result).toBe(true);
});
