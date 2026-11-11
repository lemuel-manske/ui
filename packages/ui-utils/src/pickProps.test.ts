import { expect, test } from '@lemuel-manske/config-jest/globals';

import { pickProps } from './pickProps';

test('selects only requested own properties', () => {
  expect(pickProps({ name: 'Archive', count: 3, enabled: true }, ['name', 'enabled'])).toEqual({
    name: 'Archive',
    enabled: true,
  });
});

test('preserves the source and readonly key list', () => {
  const source = Object.freeze({ name: 'Archive', count: 3 });
  const keys = Object.freeze(['name'] as const);
  const result = pickProps(source, keys);

  expect({ source, keys, result }).toEqual({
    source: { name: 'Archive', count: 3 },
    keys: ['name'],
    result: { name: 'Archive' },
  });
});

test('omits missing optional properties', () => {
  const source: { name: string; count?: number } = { name: 'Archive' };

  expect(pickProps(source, ['name', 'count'])).toEqual({ name: 'Archive' });
});

test('does not copy inherited properties', () => {
  const source = Object.create({ inherited: true }) as { name: string; inherited: boolean };
  source.name = 'Archive';

  expect(pickProps(source, ['name', 'inherited'])).toEqual({ name: 'Archive' });
});

test('selects symbol properties', () => {
  const key = Symbol('key');

  expect(pickProps({ [key]: 'Archive', count: 3 }, [key])).toEqual({ [key]: 'Archive' });
});

test('treats prototype-like names as ordinary own properties', () => {
  const source = JSON.parse('{"__proto__":{"name":"Archive"}}') as { __proto__: { name: string } };
  const result = pickProps(source, ['__proto__']);

  expect(Object.getOwnPropertyDescriptor(result, '__proto__')?.value).toEqual({ name: 'Archive' });
});
