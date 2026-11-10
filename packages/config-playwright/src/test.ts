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

export { test };
