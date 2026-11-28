import config from '@lemuel-manske/config-eslint/react';

const designSystemBoundary = [
  {
    group: [
      '@lemuel-manske/components',
      '@lemuel-manske/components/*',
      '@lemuel-manske/design-tokens',
      '@lemuel-manske/design-tokens/*',
    ],
    message: 'Import design-system primitives only through src/view/primitives.ts.',
  },
];

function restrictImports(patterns) {
  return {
    'no-restricted-imports': ['error', { patterns: [...designSystemBoundary, ...patterns] }],
  };
}

const layerConfig = [
  {
    files: ['src/domain/**/*.{ts,tsx}'],

    rules: restrictImports([
      {
        group: ['react', 'react/*'],
        message: 'The domain layer must remain React-free.',
      },
      {
        group: ['**/ports/**', '**/services/**', '**/controller/**', '**/view/**'],
        message: 'The domain layer cannot import higher layers.',
      },
    ]),
  },
  {
    files: ['src/ports/**/*.{ts,tsx}'],

    rules: restrictImports([
      {
        group: ['react', 'react/*'],
        message: 'Ports are contracts, not React code.',
      },
      {
        group: ['**/domain/*', '**/services/**', '**/controller/**', '**/view/**'],
        message: 'Ports may import only the domain barrel and no higher layers.',
      },
    ]),
  },
  {
    files: ['src/services/**/*.{ts,tsx}'],

    rules: restrictImports([
      {
        group: ['react', 'react/*'],
        message: 'Services must remain framework-agnostic.',
      },
      {
        group: ['**/domain/*', '**/ports/*', '**/controller/**', '**/view/**'],
        message: 'Services may import only domain and ports barrels and no higher layers.',
      },
    ]),
  },
  {
    files: ['src/controller/**/*.{ts,tsx}'],

    rules: restrictImports([
      {
        group: ['**/domain/*', '**/ports/*', '**/services/*', '**/view/**'],
        message: 'The controller may import only lower-layer barrels.',
      },
    ]),
  },
  {
    files: ['src/view/**/*.{ts,tsx}'],
    ignores: ['src/view/primitives.ts'],

    rules: restrictImports([
      {
        group: ['**/domain/*', '**/ports/*', '**/services/*', '**/controller/*'],
        message: 'The view layer may import only lower-layer barrels.',
      },
    ]),
  },
  {
    files: ['src/index.ts'],

    rules: restrictImports([
      {
        group: ['**/domain/*', '**/ports/*', '**/services/*', '**/controller/*', '**/view/*'],
        message: 'The package facade may re-export only from layer barrels.',
      },
    ]),
  },
  {
    files: ['preview/**/*.{ts,tsx}'],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '**/domain/**',
                '**/ports/**',
                '**/services/**',
                '**/controller/**',
                '**/view/**',
              ],
              message: 'The preview may import only the package facade.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.test-fixture.tsx'],

    rules: restrictImports([
      {
        group: [
          '**/domain/**',
          '**/ports/**',
          '**/services/**',
          '**/controller/**',
          '**/invariants',
          '**/reducer',
          '**/selectors',
          '**/radialLayout',
          '**/cameraController',
          '**/requestCoordinator',
        ],
        message: 'Tests must exercise behavior through the public API, not internal layers.',
      },
    ]),
  },
];

export default [...config, ...layerConfig];
