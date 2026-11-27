import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';

import globals from 'globals';
import tseslint from 'typescript-eslint';

import interfaceMemberSpacing from './rules/interface-member-spacing.js';

const config = defineConfig(
  globalIgnores([
    'dist',
    'storybook-static',
    'node_modules',
    '**/.cache/**',
    '**/test-results/**',
    '**/playwright-report/**',
  ]),

  js.configs.recommended,
  tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],

    plugins: {
      local: {
        rules: {
          'interface-member-spacing': interfaceMemberSpacing,
        },
      },
    },

    rules: {
      'local/interface-member-spacing': 'error',
    },
  },

  {
    languageOptions: {
      globals: globals.node,
    },
  },
);

export default config;
