import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],

  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-mcp'],

  features: {
    componentsManifest: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  framework: {
    name: '@storybook/react-vite',

    options: {
      builder: {
        viteConfigPath: fileURLToPath(new URL('./vite.config.ts', import.meta.url)),
      },
    },
  },

  core: {
    disableTelemetry: true,
  },
};

export default config;
