import { fileURLToPath } from 'node:url';

import { reactConfig } from '@lemuel-manske/config-vite';
import { defineConfig, mergeConfig } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));

const config = defineConfig({
  root,
  server: {
    port: 4173,
  },
});

export default mergeConfig(reactConfig, config);
