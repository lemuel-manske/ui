import { existsSync, readdirSync } from 'node:fs';

const packagesDirectory = new URL('./packages/', import.meta.url);

const scopes = readdirSync(packagesDirectory, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() && existsSync(new URL(`${entry.name}/package.json`, packagesDirectory)),
  )
  .map((entry) => entry.name);

export default {
  extends: ['@commitlint/config-conventional'],

  defaultIgnores: false,

  plugins: [
    {
      rules: {
        'body-content': ({ body }) => [
          !body || body.trim().length > 0,
          'body must contain non-whitespace text',
        ],
        'scope-package': ({ scope }) => [
          !scope || scopes.includes(scope),
          `scope must be a single package directory (${scopes.join(', ')}) or omitted for root changes`,
        ],
      },
    },
  ],

  rules: {
    'body-empty': [2, 'never'],
    'body-content': [2, 'always'],
    'body-leading-blank': [2, 'always'],
    'scope-package': [2, 'always'],
  },
};
