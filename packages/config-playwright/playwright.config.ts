import { defineConfig } from '@playwright/test';

import { config } from './src/config';

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.test.ts',
  fullyParallel: true,
  workers: 2,
  use: config.use,
});
