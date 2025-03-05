# ts-matrices

Advanced type-level utilities for arrays, matrices, and numeric operations (filtering, intersection, transposition, and min/max).

## Installation

**Using npm:**
```bash
npm i -D ts-matrices
```

**Using pnpm:**
```bash
pnpm i -D ts-matrices
```

> Requires TypeScript `v5.0`+

## Documentation


#### ArrayFilter

Filters elements from an array based on a given predicate type.


**Example:**
```typescript
ArrayFilter<[0, 1, 2], Falsy>; // Results in [0]
ArrayFilter<[0, 1, 2, 3, 4], 0 | 2 | 4>; // Results in [0, 2, 4]
```

#### ArrayMax

Extracts the maximum numeric value in a given array.


**Example:**
```typescript
ArrayMax<[-54, 2, 0, 999, 69, 2]>; // Result: 999
ArrayMax<[-54, -2, -90, -72, -69, -202]>; // Result: -2
```

#### ArrayMin

Extracts the minimum numeric value in a given array.


**Example:**
```typescript
ArrayMin<[-54, 2, 0, 999, 69, 2]>; // Result: -54
ArrayMin<[-54, -2, -90, -72, -69, -202]>; // Result: -202
```

#### ArrayTranspose

Transposes a matrix (2D array) by converting rows into columns and columns into rows.

**Example:**
```typescript
type Matrix = [
  [1, 2, 3],
  [4, 5, 6]
];
ArrayTranspose<Matrix>; // Result: [[1, 4], [2, 5], [3, 6]]
```

#### ArrayUnique

Constructs a new array containing only unique elements from a given array type.

**Example:**
```typescript
ArrayUnique<[1, 1, 2, 2, 3, 3]>; // Result: [1, 2, 3]
ArrayUnique<[1, 'a', 2, 'b', 2, 'a']>; // Result: [1, 'a', 2, 'b']
```

#### ArrayIncludes

Checks if a given type is in an array type.


**Example:**
```typescript
ArrayIncludes<[bigint, true, 2, 3, 5, 6, 'seven'], true>; // Result: true
ArrayIncludes<[0, 1, 2], 0>; // Result: true
```

#### ArrayIntersection

Calculates the intersection of the types within an array of tuple types.



**Example:**
```typescript
ArrayIntersection<[[1, 0, 1], [0, 1, -1], [0, 0, 1]]>; // Result: 0 | 1
ArrayIntersection<[[1, 0], [0, 1], [0, 0]]>; // Result: 0
```

#### MinInTwoPositiveNumbers

Gets the minimum of two positive numbers.


**Example:**
```typescript
MinInTwoPositiveNumbers<21, 0>; // Result: 0
MinInTwoPositiveNumbers<54, 10000000>; // Result: 54
```

#### MaxInTwoPositiveNumbers

Gets the maximum of two positive numbers.


**Example:**
```typescript
MaxInTwoPositiveNumbers<21, 0>; // Result: 21
MaxInTwoPositiveNumbers<54, 10000000>; // Result: 10000000
```

#### MinInTwoNumbers

Gets the minimum value from two numeric values, regardless of the sign.

**Example:**
```typescript
MinInTwoNumbers<54, -78>; // Result: -78
MinInTwoNumbers<-87, 777>; // Result: -87
```

#### MaxInTwoNumbers

Gets the maximum value from two numeric values, regardless of the sign.
**Example:**

```typescript
MaxInTwoNumbers<54, -78>; // Result: 54
MaxInTwoNumbers<-87, 777>; // Result: 777
```

## Changelog

See [releases](https://github.com/ashgw/ts-matrices/releases).

## License

[MIT](LICENSE)
```