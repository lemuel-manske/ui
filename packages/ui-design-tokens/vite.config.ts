import { createLibraryConfig } from '@lemuel-manske/config-vite';

import { mergeConfig, type Plugin } from 'vite';

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

const themeCssPlugin = {
  name: 'theme-css',

  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'tokens.css',
      source: themeCss,
    });
  },
} satisfies Plugin;

const config = mergeConfig(createLibraryConfig({ fileName: 'tokens' }), {
  plugins: [themeCssPlugin],
});

export default config;
