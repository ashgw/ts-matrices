import type { TestType } from 'ts-roids';
import type { MaxInTwoNumbers } from 'src';
import { test, expect } from 'vitest';

test('returns larger of two positive numbers', () => {
  const result: TestType<MaxInTwoNumbers<2, 1>, 2, true> = true;
  expect(result).toBe(true);
});

test('handles large number differences', () => {
  const result: TestType<MaxInTwoNumbers<-87, 777>, 777, true> = true;
  expect(result).toBe(true);
});

test('compares positive and negative numbers', () => {
  const result: TestType<MaxInTwoNumbers<-54, 21>, 21, true> = true;
  expect(result).toBe(true);
});

test('compares two negative numbers', () => {
  const result: TestType<MaxInTwoNumbers<-877, -999>, -877, true> = true;
  expect(result).toBe(true);
});

test('handles positive and negative zero', () => {
  const result: TestType<MaxInTwoNumbers<-0, 0>, 0, true> = true;
  expect(result).toBe(true);
});
