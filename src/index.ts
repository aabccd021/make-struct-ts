import { pipe } from 'fp-ts/lib/function';
import * as Record from 'fp-ts/Record';
import * as t from 'io-ts';

export const make: <P extends t.Props, T extends t.TypeC<P>, R = t.TypeOf<T>>(
  t: T
) => {
  readonly [K in keyof R]: (varargs: Omit<R, K>) => (arg: R[K]) => R;
} = (def) =>
  pipe(
    def.props,
    Record.mapWithIndex((key) => (a) => (b) => ({ ...a, [key]: b }))
  ) as any;
