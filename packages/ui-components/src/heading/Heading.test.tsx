import { expect, test } from '@lemuel-manske/config-playwright';

import { Heading } from './Heading';

test('Heading renders its content', async ({ render, page }) => {
  await render(
    <Heading level={3} weight="semibold">
      Example
    </Heading>,
  );

  await expect(page.getByRole('heading', { level: 3, name: 'Example' })).toBeVisible();
});

test('Heading has no accessibility violations', async ({ render, page }) => {
  await render(<Heading>Example</Heading>);

  await expect(page).noAccessibilityViolations();
});

test('extra-large size preserves heading hierarchy', async ({ render, page }) => {
  await render(
    <Heading level={3} size="xlarge" weight="bold" emphasis="italic">
      Archive record
    </Heading>,
  );

  await expect(page.getByRole('heading', { level: 3, name: 'Archive record' })).toBeVisible();
});

test('extra-large heading reflows at narrow widths', async ({ render, page }) => {
  await page.setViewportSize({ width: 320, height: 640 });

  await render(<Heading size="xlarge">A collection of preserved documents</Heading>);

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test('secondary heading has no accessibility violations', async ({ render, page }) => {
  await render(
    <Heading size="medium" tone="secondary">
      Saved documents
    </Heading>,
  );

  await expect(page).noAccessibilityViolations();
});
