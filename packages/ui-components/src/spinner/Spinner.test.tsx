import { SpinnerLabelVisibility } from './options';

import { expect, test } from '@lemuel-manske/config-playwright';

import { Spinner } from './Spinner';

test('Spinner exposes its loading message', async ({ render }) => {
  const spinner = await render(<Spinner label="Loading results" />);

  await expect(spinner).toHaveRole('status');

  await expect(spinner).toHaveText('Loading results');
});

test('Spinner has no accessibility violations', async ({ render, page }) => {
  await render(<Spinner />);

  await expect(page).noAccessibilityViolations();
});

test('visible spinner renders a single status message', async ({ render, page }) => {
  await render(
    <Spinner label="Capturing archive" labelVisibility={SpinnerLabelVisibility.VISIBLE} />,
  );

  await expect(page.getByText('Capturing archive', { exact: true })).toHaveCount(1);
});

test('visible spinner label remains readable with reduced motion', async ({ render, page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  await render(
    <Spinner label="Capturing archive" labelVisibility={SpinnerLabelVisibility.VISIBLE} />,
  );

  await expect(page.getByRole('status')).toHaveText('Capturing archive');
});

test('visible spinner has no accessibility violations', async ({ render, page }) => {
  await render(
    <Spinner label="Capturing archive" labelVisibility={SpinnerLabelVisibility.VISIBLE} />,
  );

  await expect(page).noAccessibilityViolations();
});
