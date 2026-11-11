import { expect, test } from '@lemuel-manske/config-playwright';

import { archiveTheme } from '@lemuel-manske/design-tokens';

import { Button } from '../button/Button';

import { Theme } from './Theme';

test('Theme renders children', async ({ render }) => {
  const content = await render(
    <Theme theme={archiveTheme}>
      <Button>Example</Button>
    </Theme>,
  );

  await expect(content.getByRole('button')).toHaveText('Example');
});

test('Theme has no accessibility violations', async ({ render, page }) => {
  await render(
    <Theme theme={archiveTheme}>
      <Button>Example</Button>
    </Theme>,
  );

  await expect(page).noAccessibilityViolations();
});
