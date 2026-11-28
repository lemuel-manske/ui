import { defineConfig } from '@playwright/experimental-ct-react';

import type { PlaywrightTestConfig } from '@playwright/experimental-ct-react';

import { config } from './config.js';

type VisualConfigOverrides = Pick<
  PlaywrightTestConfig,
  'use' | 'testDir' | 'testMatch' | 'snapshotPathTemplate'
>;

type VisualConfigOptions = VisualConfigOverrides & {
  themes?: readonly string[];
};

function createVisualConfig({ themes, ...overrides }: VisualConfigOptions) {
  return defineConfig({
    ...config,

    ...overrides,

    testIgnore: [],

    projects: themes?.map((theme) => ({
      name: theme,

      use: { theme } as PlaywrightTestConfig['use'],
    })),

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

      viewport: { width: 1280, height: 720 },
    },

    fullyParallel: false,

    workers: 1,
  });
}

export { createVisualConfig };

export type { VisualConfigOptions, VisualConfigOverrides };
