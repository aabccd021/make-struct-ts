import * as t from 'io-ts';
import { expect, it } from 'vitest';

import { make } from '../src';

it('can make stuct from one of its attribute curried', () => {
  const Lorem = t.type({
    foo: t.string,
    bar: t.number,
    baz: t.boolean,
  });

  type Lorem = t.TypeOf<typeof Lorem>;

  const expectedLorem: Lorem = { foo: 'foo', bar: 42, baz: true };
  expect(make(Lorem).foo({ bar: 42, baz: true })('foo')).toStrictEqual(expectedLorem);
  expect(make(Lorem).bar({ foo: 'foo', baz: true })(42)).toStrictEqual(expectedLorem);
  expect(make(Lorem).baz({ foo: 'foo', bar: 42 })(true)).toStrictEqual(expectedLorem);
});
