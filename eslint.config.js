import { defineConfig, globalIgnores } from 'eslint/config';

import nodeConfig from '@lemuel-manske/config-eslint/node';

const config = defineConfig(
  globalIgnores([
    'packages/**',
    'website/.docusaurus/**',
    'website/.generated/**',
    'website/dist/**',
  ]),
  nodeConfig,
);

export default config;
