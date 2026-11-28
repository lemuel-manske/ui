import { defineConfig } from '@playwright/experimental-ct-react';

import type { PlaywrightTestConfig } from '@playwright/experimental-ct-react';

import { config } from './config.js';

type VisualConfigOverrides = Pick<
  PlaywrightTestConfig,
  'use' | 'testDir' | 'testMatch' | 'snapshotPathTemplate'
>;

function createVisualConfig(overrides: VisualConfigOverrides) {
  return defineConfig({
    ...config,

    ...overrides,

    expect: {
      ...config.expect,

      toHaveScreenshot: {
        animations: 'disabled',

        caret: 'hide',

        scale: 'css',
      },
    },

    use: {
      ...config.use,

      ...overrides.use,

      colorScheme: 'dark',

      deviceScaleFactor: 1,

      locale: 'en-US',

      timezoneId: 'UTC',
    },

    fullyParallel: false,

    workers: 1,
  });
}

export { createVisualConfig };

export type { VisualConfigOverrides };
