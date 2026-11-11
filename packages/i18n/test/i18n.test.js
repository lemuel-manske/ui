import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import tseslint from 'typescript-eslint';

import { createTranslator } from '@lemuel-manske/i18n';
import i18nPlugin from '@lemuel-manske/i18n/eslint';
import { I18nProvider, useTranslation } from '@lemuel-manske/i18n/react';

const workspace = fileURLToPath(new URL('../', import.meta.url));
const fixture = (name) => join(workspace, 'test/fixtures', name);
const cli = (...args) =>
  spawnSync(process.execPath, [join(workspace, 'dist/cli.js'), ...args], { encoding: 'utf8' });

test('translates through exact, parent, and default catalogs with the source plural rules', () => {
  const { t } = createTranslator({
    locale: 'pt-br',
    defaultLocale: 'en',
    defaultMessages: {
      title: 'Archive',
      loading: 'Loading',
      count: '{n, plural, one {one} other {other}}',
    },
    catalogs: { 'pt-BR': { title: '' }, pt: { loading: 'Carregando' } },
  });

  assert.equal(t('title'), '');
  assert.equal(t('loading'), 'Carregando');
  assert.equal(t('count', { n: 0 }), 'other');
  assert.equal(t('count', { n: 1 }), 'one');
  assert.throws(() => t('toString'), /Unknown message ID/);
});

test('the React hook receives the translator from its nearest provider', () => {
  const translator = createTranslator({
    locale: 'pt-BR',
    defaultLocale: 'en',
    defaultMessages: { 'my-app.loading': 'Loading' },
    catalogs: { 'pt-BR': { 'my-app.loading': 'Carregando' } },
  });

  function SpinnerLabel() {
    const { t } = useTranslation();

    return createElement('span', null, t('my-app.loading'));
  }

  assert.equal(
    renderToStaticMarkup(createElement(I18nProvider, { translator }, createElement(SpinnerLabel))),
    '<span>Carregando</span>',
  );
});

test('the CLI validates catalogs and detects stale or colliding constants', async (context) => {
  const directory = await mkdtemp(join(tmpdir(), 'i18n-test-'));

  context.after(() => rm(directory, { recursive: true, force: true }));

  const generated = join(directory, 'message-ids.ts');
  const source = fixture('en.json');
  const translation = fixture('pt-BR.json');

  const result = cli(source, generated, translation);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    await readFile(generated, 'utf8'),
    await readFile(fixture('message-ids.ts'), 'utf8'),
  );
  assert.equal(cli('--check', source, generated, translation).status, 0);

  await writeFile(generated, '');
  assert.match(cli('--check', source, generated).stderr, /out of date/);

  const invalid = join(directory, 'invalid.json');

  await writeFile(invalid, JSON.stringify({ 'my-app.capture.count': '{total}' }));
  assert.match(cli(source, generated, invalid).stderr, /placeholders/);

  await writeFile(invalid, JSON.stringify({ 'my-app.capture.count': '{count' }));
  assert.match(cli(source, generated, invalid).stderr, /invalid ICU message/);

  await writeFile(invalid, JSON.stringify({ 'my-app.title': 'A', 'my_app.title': 'B' }));
  assert.match(cli(invalid, generated).stderr, /both generate MY_APP_TITLE/);
});

test('ESLint enforces named imports from the generated file for typed translation calls', async () => {
  const eslint = new ESLint({
    cwd: workspace,
    overrideConfigFile: true,
    overrideConfig: {
      files: ['**/*.ts'],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: { project: './tsconfig.tests.json', tsconfigRootDir: workspace },
      },
      plugins: { i18n: i18nPlugin },
      rules: {
        'i18n/generated-message-id': ['error', { messageIdsFile: 'test/fixtures/message-ids.ts' }],
      },
    },
  });

  const [result] = await eslint.lintFiles([fixture('app.ts')]);

  assert.deepEqual(
    result.messages.map(({ line, ruleId }) => [line, ruleId]),
    [13, 15, 19, 27].map((line) => [line, 'i18n/generated-message-id']),
  );
});
