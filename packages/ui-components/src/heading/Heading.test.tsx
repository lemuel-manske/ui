import { Weight } from '@lemuel-manske/design-tokens';

import { expect, test } from '@lemuel-manske/config-playwright';

import { Heading } from './Heading';

test('Heading renders its content', async ({ render, page }) => {
  await render(
    <Heading level={3} weight={Weight.SEMIBOLD}>
      Example
    </Heading>,
  );

  await expect(page.getByRole('heading', { level: 3, name: 'Example' })).toBeVisible();
});

test('Heading has no accessibility violations', async ({ render, page }) => {
  await render(<Heading>Example</Heading>);

  await expect(page).noAccessibilityViolations();
});
