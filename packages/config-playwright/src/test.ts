import { test as componentTest } from '@playwright/experimental-ct-react';
import type { ComponentFixtures } from '@playwright/experimental-ct-react';

type Fixtures = {
  render: ComponentFixtures['mount'];
};

const test = componentTest.extend<Fixtures>({
  render: async ({ mount }, use) => {
    await use(mount);
  },
});

type VisualFixtures = Fixtures & {
  theme: string;
};

const visualTest = componentTest.extend<VisualFixtures>({
  theme: ['', { option: true }],

  render: async ({ mount, page, theme }, use) => {
    if (theme !== '') {
      await page.evaluate((value) => {
        document.body.dataset.uiTheme = value;
      }, theme);
    }

    await use(mount);
  },
});

export { test, visualTest };
