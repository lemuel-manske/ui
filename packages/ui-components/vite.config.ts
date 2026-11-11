import { createLibraryConfig, reactConfig } from '@lemuel-manske/config-vite';

import { mergeConfig } from 'vite';

const config = mergeConfig(
  reactConfig,

  createLibraryConfig({
    fileName: 'components',
    external: [
      'react',
      'react/jsx-runtime',
      '@lemuel-manske/design-tokens',
      '@lemuel-manske/utils',
    ],
  }),
);

export default config;
