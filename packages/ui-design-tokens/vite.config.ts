import { fileURLToPath } from 'node:url';

import { createLibraryConfig } from '@lemuel-manske/config-vite';

import { mergeConfig } from 'vite';

import { archiveTheme, libraryTheme } from './src/tokens';

const themes = { archive: archiveTheme, library: libraryTheme };

const themeCss = [
  '/* Generated from tokens.ts. Do not edit. */',
  ...Object.entries(themes).flatMap(([name, theme]) => [
    `:where([data-ui-theme="${name}"]) {`,
    ...Object.entries(theme).flatMap(([group, tokens]) =>
      Object.entries(tokens).map(([token, value]) => `  --ui-${group}-${token}: ${value};`),
    ),
    '}',
  ]),
  '',
].join('\n');

const config = mergeConfig(
  createLibraryConfig({
    entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
    fileName: 'tokens',
  }),
  {
    plugins: [
      {
        name: 'theme-css',

        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'tokens.css',
            source: themeCss,
          });
        },
      },
    ],
  },
);

export default config;
