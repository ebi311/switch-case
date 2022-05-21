import { Switch } from '~/switch';

test('key match', () => {
  const sw = new Switch<string, string>() //
    .case(['A', (value) => value + ':あ'])
    .case(['I', (value) => value + ':い'])
    .case(['U', (value) => value + ':う']);
  expect(sw.exec('A')).toBe('A:あ');
});

test('function conditions', () => {
  const sw = new Switch<string, string>() //
    .case([(value) => 'A' === value, (value) => value + ':あ'])
    .case([(value) => 'B' === value, (value) => value + ':い'])
    .case([(value) => 'A' === value, (value) => value + ':う']);
  expect(sw.exec('A')).toBe('A:あ');
});

test('static value results', () => {
  const sw = new Switch<string, string>() //
    .case(['A', 'あ'])
    .case(['I', 'い'])
    .case(['U', 'う']);
  expect(sw.exec('A')).toBe('あ');
  expect(sw.exec('B')).toBe(undefined);
  expect(sw.exec('I')).toBe('い');
});

test('default', () => {
  const sw = new Switch<string, string | null | undefined>() //
    .case(['A', null])
    .case(['I', undefined])
    .case(['U', 'う'])
    .default('ん');
  expect(sw.exec('B')).toBe('ん');
  expect(sw.exec('I')).toBeUndefined();
});
