import { createVisualConfig } from '@lemuel-manske/config-playwright';

export default createVisualConfig({
  testDir: './src',

  testMatch: '**/*.visual.test.tsx',

  use: {
    ctTemplateDir: './playwright',

    ctCacheDir: './playwright/.cache',
  },

  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
});
