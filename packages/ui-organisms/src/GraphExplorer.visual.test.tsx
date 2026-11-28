import { expect, test } from '@lemuel-manske/config-playwright';

import { GraphExplorer } from './index';

import { adapter, messages } from './GraphExplorer.test-fixture';

test('GraphExplorer empty state is stable', async ({ render, page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });

  const graph = await render(<GraphExplorer adapter={adapter} messages={messages} />);

  await expect(graph).toHaveScreenshot('empty-state.png');
});
