import { defineConfig } from '@playwright/experimental-ct-react';

const config = defineConfig({
  testDir: './src',
  testMatch: '**/*.test.tsx',
  fullyParallel: true,
  workers: 2,

  use: {
    browserName: 'chromium',
    trace: 'retain-on-failure',

    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
  },
});

export { config };
