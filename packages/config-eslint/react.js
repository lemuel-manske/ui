import { defineConfig } from 'eslint/config';

import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import interfaceMemberSpacing from './interface-member-spacing.js';
import nodeConfig from './node.js';

const config = defineConfig(
  nodeConfig,

  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      globals: globals.browser,
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      local: {
        rules: {
          'interface-member-spacing': interfaceMemberSpacing,
        },
      },
    },

    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'local/interface-member-spacing': 'error',
    },
  },

  {
    files: ['**/*.stories.tsx'],

    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
);

export default config;
