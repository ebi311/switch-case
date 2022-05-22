/** @format */

import { Switch } from '~/switch';

test('key match', () => {
  const sw = new Switch<string, string>() //
    .case('A', (value) => value + ':あ')
    .case('I', (value) => value + ':い')
    .case(['U', 'u'], (value) => value + ':う');
  expect(sw.reduce('A')).toBe('A:あ');
  expect(sw.reduce('U')).toBe('U:う');
  expect(sw.reduce('u')).toBe('u:う');
});

test('function conditions', () => {
  const sw = new Switch<string, string>() //
    .case(
      (value) => 'A' === value,
      (value) => value + ':あ',
    )
    .case(
      (value) => 'B' === value,
      (value) => value + ':い',
    )
    .case(
      [(value) => 'U' === value, (value) => 'u' === value, 'Y'],
      (value) => value + ':う',
    );
  expect(sw.reduce('A')).toBe('A:あ');
  expect(sw.reduce('u')).toBe('u:う');
  expect(sw.reduce('Y')).toBe('Y:う');
});

test('static value results', () => {
  const sw = new Switch<string, string>() //
    .case('A', 'あ')
    .case('I', 'い')
    .case('U', 'う');
  expect(sw.reduce('A')).toBe('あ');
  expect(sw.reduce('B')).toBe(undefined);
  expect(sw.reduce('I')).toBe('い');
});

test('default - value', () => {
  const sw = new Switch<string, string | null | undefined>() //
    .case('A', null)
    .case('I', undefined)
    .case('U', 'う')
    .default('ん');
  expect(sw.reduce('B')).toBe('ん');
  expect(sw.reduce('I')).toBeUndefined();
});

test('default - function', () => {
  const sw = new Switch<string, string | null | undefined>() //
    .case('A', null)
    .case('I', undefined)
    .case('U', 'う')
    .default((value) => `${value}:ん`);
  expect(sw.reduce('B')).toBe('B:ん');
});
