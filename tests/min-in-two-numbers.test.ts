import type { MinInTwoNumbers } from 'src';
import type { TestType } from 'ts-roids';
import { test, expect } from 'vitest';

test('returns smaller of two positive numbers', () => {
  const result: TestType<MinInTwoNumbers<2, 1>, 1, true> = true;
  expect(result).toBe(true);
});

test('returns negative number when comparing positive and negative', () => {
  const result: TestType<MinInTwoNumbers<-87, 777>, -87, true> = true;
  expect(result).toBe(true);
});

test('handles mixed positive and negative numbers', () => {
  const result: TestType<MinInTwoNumbers<-54, 21>, -54, true> = true;
  expect(result).toBe(true);
});

test('handles zero and negative zero as equal', () => {
  const result: TestType<MinInTwoNumbers<-0, 0>, 0, true> = true;
  expect(result).toBe(true);
});

test('handles large number differences', () => {
  const result: TestType<
    MinInTwoNumbers<999999, -999999>,
    -999999,
    true
  > = true;
  expect(result).toBe(true);
});

test('handles decimal numbers', () => {
  const result: TestType<MinInTwoNumbers<0.1, -0.2>, -0.2, true> = true;
  expect(result).toBe(true);
});
