import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';

import globals from 'globals';
import tseslint from 'typescript-eslint';

import declarationNearUse from './rules/declaration-near-use.js';
import interfaceMemberSpacing from './rules/interface-member-spacing.js';
import namedBooleanExpression from './rules/named-boolean-expression.js';

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
          'declaration-near-use': declarationNearUse,
          'interface-member-spacing': interfaceMemberSpacing,
          'named-boolean-expression': namedBooleanExpression,
        },
      },
    },

    rules: {
      'local/declaration-near-use': ['error', { maxLines: 8 }],
      'local/interface-member-spacing': 'error',
      'local/named-boolean-expression': ['error', { maxLength: 100, maxTerms: 3 }],
    },
  },

  {
    languageOptions: {
      globals: globals.node,
    },
  },
);

export default config;
