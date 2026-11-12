import { DisclosureButton } from './Button.test-fixture';

import { archiveTheme, libraryTheme } from '@lemuel-manske/design-tokens';

import { expect, test } from '@lemuel-manske/config-playwright';

import { Button } from './Button';
import { FormExample, StatusButtons } from './Button.test-fixture';

test('Button handles a click', async ({ render }) => {
  let activations = 0;

  const button = await render(<Button onClick={() => activations++}>Save</Button>);

  await button.click();

  await expect.poll(() => activations).toBe(1);
});

test('Button activates with Enter', async ({ render }) => {
  let activations = 0;

  const button = await render(<Button onClick={() => activations++}>Save</Button>);

  await button.press('Enter');

  await expect.poll(() => activations).toBe(1);
});

test('Button activates with Space', async ({ render }) => {
  let activations = 0;

  const button = await render(<Button onClick={() => activations++}>Save</Button>);

  await button.press('Space');

  await expect.poll(() => activations).toBe(1);
});

test('Button can be reached with Tab', async ({ render, page }) => {
  const button = await render(<Button>Save</Button>);

  await page.keyboard.press('Tab');

  await expect(button).toBeFocused();
});

test('disabled Button does not activate', async ({ render }) => {
  let activations = 0;

  const button = await render(
    <Button disabled onClick={() => activations++}>
      Save
    </Button>,
  );

  await button.click({ force: true });

  expect(activations).toBe(0);
});

test('Button does not submit a form by default', async ({ render }) => {
  let submissions = 0;

  const form = await render(
    <FormExample onSubmit={() => submissions++}>
      <Button>Save</Button>
    </FormExample>,
  );

  await form.getByRole('button', { name: 'Save' }).click();

  expect(submissions).toBe(0);
});

test('submit Button submits its form', async ({ render }) => {
  let submissions = 0;

  const form = await render(
    <FormExample onSubmit={() => submissions++}>
      <Button type="submit">Save</Button>
    </FormExample>,
  );

  await form.getByRole('button', { name: 'Save' }).click();

  await expect.poll(() => submissions).toBe(1);
});

test('icon-only Button has an accessible name', async ({ render }) => {
  const button = await render(
    <Button aria-label="Close">
      <span aria-hidden="true">×</span>
    </Button>,
  );

  await expect(button).toHaveAccessibleName('Close');
});

test('Button.Label provides the button accessible name', async ({ render }) => {
  const button = await render(
    <Button>
      <Button.Label>Save website</Button.Label>
    </Button>,
  );

  await expect(button).toHaveAccessibleName('Save website');
});

test('Button has no accessibility violations', async ({ render, page }) => {
  await render(<Button>Archive website</Button>);

  await expect(page).noAccessibilityViolations();
});

test('secondary Button has no accessibility violations', async ({ render, page }) => {
  await render(<Button variant="secondary">Archive website</Button>);

  await expect(page).noAccessibilityViolations();
});

test('tertiary Button has no accessibility violations', async ({ render, page }) => {
  await render(<Button variant="tertiary">Archive website</Button>);

  await expect(page).noAccessibilityViolations();
});

test('archive default button compositions have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(<StatusButtons theme={archiveTheme} tone="default" />);

  await expect(page).noAccessibilityViolations();
});

test('archive danger button compositions have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(<StatusButtons theme={archiveTheme} tone="danger" />);

  await expect(page).noAccessibilityViolations();
});

test('archive success button compositions have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(<StatusButtons theme={archiveTheme} tone="success" />);

  await expect(page).noAccessibilityViolations();
});

test('archive warning button compositions have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(<StatusButtons theme={archiveTheme} tone="warning" />);

  await expect(page).noAccessibilityViolations();
});

test('archive info button compositions have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(<StatusButtons theme={archiveTheme} tone="info" />);

  await expect(page).noAccessibilityViolations();
});

test('library default button compositions have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(<StatusButtons theme={libraryTheme} tone="default" />);

  await expect(page).noAccessibilityViolations();
});

test('library danger button compositions have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(<StatusButtons theme={libraryTheme} tone="danger" />);

  await expect(page).noAccessibilityViolations();
});

test('library success button compositions have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(<StatusButtons theme={libraryTheme} tone="success" />);

  await expect(page).noAccessibilityViolations();
});

test('library warning button compositions have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(<StatusButtons theme={libraryTheme} tone="warning" />);

  await expect(page).noAccessibilityViolations();
});

test('library info button compositions have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(<StatusButtons theme={libraryTheme} tone="info" />);

  await expect(page).noAccessibilityViolations();
});

test('Button controls a disclosure with keyboard activation', async ({ render, page }) => {
  await render(<DisclosureButton />);

  await page.getByRole('button', { name: 'Connect' }).press('Enter');

  await expect(page.getByRole('region', { name: 'Authentication' })).toBeVisible();
});

test('Button exposes the controlled disclosure state', async ({ render, page }) => {
  await render(<DisclosureButton />);

  await page.getByRole('button', { name: 'Connect' }).click();

  await expect(page.getByRole('button', { name: 'Connect' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

test('danger tertiary button preserves native disabled behavior in forced colors', async ({
  render,
  page,
}) => {
  await page.emulateMedia({ forcedColors: 'active' });

  await render(
    <Button tone="danger" variant="tertiary" disabled>
      Remove capture
    </Button>,
  );

  await expect(page.getByRole('button', { name: 'Remove capture' })).toBeDisabled();
});

test('disclosure composition has no accessibility violations', async ({ render, page }) => {
  await render(<DisclosureButton />);

  await expect(page).noAccessibilityViolations();
});
