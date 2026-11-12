import { expect, test } from '@lemuel-manske/config-playwright';

import { Fieldset, Legend } from './Fieldset';

import { Input } from '../input/Input';

test('Legend names its fieldset', async ({ render }) => {
  const fieldset = await render(
    <Fieldset>
      <Legend>Contact details</Legend>

      <Input aria-label="Email" />
    </Fieldset>,
  );

  await expect(fieldset).toHaveAccessibleName('Contact details');
});

test('Fieldset disables its controls', async ({ render }) => {
  const fieldset = await render(
    <Fieldset disabled>
      <Legend>Contact details</Legend>

      <Input aria-label="Email" />
    </Fieldset>,
  );

  await expect(fieldset.getByRole('textbox')).toBeDisabled();
});

test('Fieldset has no accessibility violations', async ({ render, page }) => {
  await render(
    <Fieldset>
      <Legend>Contact details</Legend>

      <Input aria-label="Email" />
    </Fieldset>,
  );

  await expect(page).noAccessibilityViolations();
});

test('plain fieldset retains its legend as the group name', async ({ render, page }) => {
  await render(
    <Fieldset appearance="plain">
      <Legend size="large" weight="semibold">
        Authentication
      </Legend>
      <Input aria-label="Account" />
    </Fieldset>,
  );

  await expect(page.getByRole('group', { name: 'Authentication' })).toBeVisible();
});

test('divided fieldset retains native disabled behavior', async ({ render, page }) => {
  await render(
    <Fieldset appearance="divided" disabled>
      <Legend>Authentication</Legend>
      <Input aria-label="Account" />
    </Fieldset>,
  );

  await expect(page.getByRole('textbox', { name: 'Account' })).toBeDisabled();
});

test('plain fieldset with title legend has no accessibility violations', async ({
  render,
  page,
}) => {
  await render(
    <Fieldset appearance="plain">
      <Legend size="large" weight="semibold">
        Authentication
      </Legend>
      <Input aria-label="Account" />
    </Fieldset>,
  );

  await expect(page).noAccessibilityViolations();
});

test('divided fieldset has no accessibility violations', async ({ render, page }) => {
  await render(
    <Fieldset appearance="divided">
      <Legend size="small">Preferences</Legend>
      <Input aria-label="Collection" />
    </Fieldset>,
  );

  await expect(page).noAccessibilityViolations();
});
