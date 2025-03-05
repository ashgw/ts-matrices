import type {
  Abs,
  Equals,
  EqualStrlen,
  IsNegative,
  IsPositive,
  Keys,
  Numeric,
  Primitive,
  StringifyPrimitive,
  Strlen,
} from 'ts-roids';

/**
 * @returns `true` if `T` is exactly of type `number`, otherwise `false`.
 * @example
 * ````ts
  IsExactlyNumber<any | number>; // false
  IsExactlyNumber<unknown | number> // false
  IsExactlyNumber<number> // true
  IsExactlyNumber<87> // false
 * ````
 */

/**
 * @example
 * ```ts
 * MinInTwoPositiveNums<21,0>; // Result: 0
 * ```
 * @hidden
 * only exported for tests
 */
export type MinInTwoPositiveNumbers<
  N1 extends Numeric,
  N2 extends Numeric,
  L extends any[] = [],
> = L['length'] extends N1 | N2
  ? L['length'] extends N1
    ? N1
    : N2
  : MinInTwoPositiveNumbers<N1, N2, [-1, ...L]>;

/**
 * @example
 * ```ts
 * MaxInTwoPositiveNums<21,0>; // Result: 21
 * ```
 * @hidden
 * only exported for testing
 */
export type MaxInTwoPositiveNumbers<
  A extends Numeric,
  B extends Numeric,
  A1 extends Numeric = A,
  B1 extends Numeric = B,
  areAllNegative extends boolean = false,
> = A extends MinInTwoPositiveNumbers<A, B>
  ? areAllNegative extends true
    ? A1
    : B1
  : areAllNegative extends true
    ? B1
    : A1;

type CheckNumericString<
  A extends Numeric,
  B extends Numeric,
  AreNegative extends boolean = false,
  A1 extends Numeric = A,
  B1 extends Numeric = B,
  AS extends string = StringifyPrimitive<A>,
  BS extends string = StringifyPrimitive<B>,
> = EqualStrlen<AS, BS> extends true
  ? AS extends `${infer L1 extends Numeric}${infer R1}`
    ? BS extends `${infer L2 extends Numeric}${infer R2}`
      ? Equals<L1, L2> extends true
        ? CheckNumericString<A, B, AreNegative, A1, B1, R1, R2>
        : MaxInTwoPositiveNumbers<L1, L2, A1, B1, AreNegative>
      : A1
    : A1
  : Strlen<AS> extends MinInTwoPositiveNumbers<Strlen<AS>, Strlen<BS>>
    ? AreNegative extends false
      ? B1
      : A1
    : AreNegative extends false
      ? A1
      : B1;
/**
 * Gets the max from two numeric values, regardless of the sign
 * @example
 * ```ts
 * _MaxInTwoNums<54,-78>; // Result: 54
 * _MaxInTwoNums<-999,-78>; // Result: -78
 * ```
 * @hidden
 * exported for tests, use `Max<Arr>` instead
 */
export type MaxInTwoNumbers<
  A extends Numeric,
  B extends Numeric,
> = IsNegative<A> extends true
  ? IsNegative<B> extends true
    ? CheckNumericString<Abs<A>, Abs<B>, true, A, B>
    : B
  : IsNegative<B> extends true
    ? A
    : CheckNumericString<A, B>;

/**
 * Gets the min value from two numeric values, regardless of the sign
 * @example
 * ```ts
 * _MinInTwoNums<54,-78>; // Result: -78
 * _MinInTwoNums<-999,-78>; // Result: -999
 * ```
 * @hidden
 * exported for tests, use `Min<Arr>` instead
 */
export type MinInTwoNumbers<
  A extends Numeric,
  B extends Numeric,
> = IsPositive<A> extends true
  ? IsPositive<B> extends true
    ? CheckNumericString<Abs<A>, Abs<B>, true, A, B>
    : B
  : IsPositive<B> extends true
    ? A
    : CheckNumericString<A, B>;

/**
 * Transposes a matrix (2D array) by converting rows into columns and columns into rows
 * @typeParam M The input matrix type (2D array of primitives)
 * @typeParam N Helper type representing the first row of the matrix (default: M[0])
 * @example
 * ```ts
 * type Matrix = [
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ];
 * ArrayTranspose<Matrix>; // Result: [[1, 4], [2, 5], [3, 6]]
 * ```
 */
export type ArrayTranspose<
  M extends Primitive[][],
  N extends Primitive[] = M[0],
> = M extends []
  ? []
  : {
      [KN in Keys<N>]: {
        [KM in Keys<M>]: KN extends Keys<M[KM]> ? M[KM][KN] : never;
      };
    };

/**
 * Represents a  type that filters elements from an array based on a given predicate  type.
 * @typeParam T The array to filter.
 * @typeParam P The predicate used for filtering elements from `T`.
 * @returns A new array type containing only the elements of `T` that match `P`.
 * @example
 * ```typescript
 *  ArrayFilter<[0, 1, 2, 3], 0 | 1>; // Results in [0, 1]
 *  ArrayFilter<[0, 1, 2], Falsy>; // Results in [0]
 *  ArrayFilter<['7', 1, 2], Falsy>; // Results in []
 *  ArrayFilter<['7', 1, 2, 7, 7, 7, 7], 7>; // Results in [7, 7, 7, 7]
 * ```
 */
export type ArrayFilter<T extends unknown[], P> = T extends [
  infer S,
  ...infer E,
]
  ? S extends P
    ? [S, ...ArrayFilter<E, P>]
    : ArrayFilter<E, P>
  : [];
/**
 * A  type that constructs a new array containing only unique elements from a given array type.
 * @typeParam T The input array  type from which unique elements are extracted.
 * @example
 * ```typescript
 *  type UArr = UniqueArray<
  [unknown, unknown, 'foo', any, never, never, '33', 33, '33']
>; // =>  [unknown, 'foo', any, never, '33', 33]
 * ```
 */
export type ArrayUnique<T, R extends unknown[] = []> = T extends [
  infer S,
  ...infer E,
]
  ? ArrayIncludes<R, S> extends true
    ? ArrayUnique<E, R>
    : ArrayUnique<E, [...R, S]>
  : R;

/**
 * Extracts the maximum numeric value in a given Array
 * @example
 * ```ts
 * Max<[-54,2,0,999,69,2]>; // Result: 999
 * Max<[-54,-2,-90,-72,-69,-202]>; // Result: -2
 * ```
 */
export type ArrayMax<
  Arr extends Numeric[],
  M extends Numeric = Arr[0],
  Initial extends boolean = true,
> = Arr['length'] extends 0
  ? Initial extends true
    ? never
    : M
  : Arr extends [infer A extends Numeric, ...infer B extends Numeric[]]
    ? ArrayMax<B, MaxInTwoNumbers<A, M>, false>
    : M;

/**
 * Extracts the minimum numeric value in a given Array
 * @example
 * ```ts
 * Max<[-54,2,0,999,69,2]>; // Result: -54
 * Max<[-54,-2,-90,-72,-69,-202]>; // Result: -202
 * ```
 */
export type ArrayMin<
  Arr extends Numeric[],
  M extends Numeric = Arr[0],
  Initial extends boolean = true,
> = Arr['length'] extends 0
  ? Initial extends true
    ? never
    : M
  : Arr extends [infer A extends Numeric, ...infer B extends Numeric[]]
    ? ArrayMin<B, MinInTwoNumbers<A, M>, false>
    : M;

/**
 * Checks if a given type is in an array type
 * @example
 * ```ts
 * ArrayIncludes<[bigint, true, 2, 3, 5, 6, 'seven'], true> // Result: true
 *
 * type T = NewType<'T',string >;
 * ArrayIncludes<[T, 2, 3, 5, 6, 7], string>; // Result: false
 * ArrayIncludes<[string, 2, 3, 5, 6, 7], string>; // Result: true
 * ```
 * @returns
 * `true` if found, else `false`
 */
export type ArrayIncludes<Arr, P> = Arr extends [infer S, ...infer E]
  ? Equals<S, P> extends true
    ? true
    : ArrayIncludes<E, P>
  : false;
/**
 * Calculates the intersection of the types within an array `Arr` of tuple types.
 * @returns
 * The types that repeat, if exists
 * @example
 * ````ts
 ArrayIntersection<[[1, 0, 1], [0, 1, -1], [0, 0, 1]]>; // 0 | 1
 ArrayIntersection<[[1, 0], [0, 1], [0, 0]]>; // 0
 ArrayIntersection<[[1, 0], [-1, -1], [-8, -9]]> // never
 * ````
 */
export type ArrayIntersection<Arr extends unknown[]> = Arr extends [
  infer S,
  ...infer E,
]
  ? (S extends unknown[] ? S[number] : S) & ArrayIntersection<E>
  : unknown;
