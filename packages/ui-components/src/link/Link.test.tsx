import { expect, test } from '@lemuel-manske/config-playwright';

import { Link } from './Link';

test('Link exposes its destination', async ({ render }) => {
  const link = await render(<Link href="#details">Details</Link>);

  await expect(link).toHaveAttribute('href', '#details');
});

test('Link can be reached by keyboard', async ({ render, page }) => {
  const link = await render(<Link href="#details">Details</Link>);

  await page.keyboard.press('Tab');

  await expect(link).toBeFocused();
});

test('Link has no accessibility violations', async ({ render, page }) => {
  await render(<Link href="#details">Details</Link>);

  await expect(page).noAccessibilityViolations();
});

test('small action link preserves download semantics', async ({ render, page }) => {
  await render(
    <Link href="/archive.wacz" download="capture.wacz" size="small" appearance="action">
      Download capture
    </Link>,
  );

  await expect(page.getByRole('link', { name: 'Download capture' })).toHaveAttribute(
    'download',
    'capture.wacz',
  );
});

test('action link remains keyboard navigable', async ({ render, page }) => {
  await render(
    <Link href="#details" appearance="action">
      Details
    </Link>,
  );

  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/#details$/);
});

test('small action link has no accessibility violations', async ({ render, page }) => {
  await render(
    <Link href="/archive.wacz" download size="small" appearance="action">
      Download capture
    </Link>,
  );

  await expect(page).noAccessibilityViolations();
});
