import { pipe } from 'fp-ts/lib/function';
import * as Record from 'fp-ts/Record';
import * as t from 'io-ts';

type ValueOf<T> = T[keyof T];

export const make: <
  P extends string,
  T extends { readonly props: Record<P, t.Mixed> },
  R = { readonly [K in keyof T['props']]: t.TypeOf<T['props'][K]> }
>(
  t: T
) => {
  readonly [K in keyof R]: (varargs: Omit<R, K>) => (arg: R[K]) => R;
} = (def) =>
  pipe(
    def.props,
    Record.mapWithIndex(
      (key) => (a: t.TypeOf<t.TypeC<t.Props>>) => (b: ValueOf<t.TypeOf<t.TypeC<t.Props>>>) => ({
        ...a,
        [key]: b,
      })
    )
  ) as any;

const BlobFromUnknown = new t.Type<Date, unknown, unknown>(
  'BlobFromUnknown',
  (u): u is Date => u instanceof Date,
  (u, c) => (u instanceof Date ? t.success(u) : t.failure(u, c)),
  (a) => a
);

export const FileSnapshot: t.TypeC<{
  readonly id: t.StringC;
  readonly blob: t.Type<Date, unknown, unknown>;
}> = t.type({
  id: t.string,
  blob: BlobFromUnknown,
});
