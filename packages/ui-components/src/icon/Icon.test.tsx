import { expect, test } from '@lemuel-manske/config-playwright';

import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { Label } from '../label/Label';

import { Icon } from './Icon';
import { GlobeIcon, CheckIcon } from './ExampleIcons.test-fixture';
import { IconActionExample } from './IconAction.test-fixture';

test('Icon activates its action when clicked', async ({ render }) => {
  const root = await render(<IconActionExample />);

  await root.getByRole('button', { name: 'Change language' }).click();

  await expect(root.getByRole('status', { name: 'Activated' })).toHaveText('true');
});

test('Icon activates its action with Enter', async ({ render }) => {
  const root = await render(<IconActionExample />);

  await root.getByRole('button', { name: 'Change language' }).press('Enter');

  await expect(root.getByRole('status', { name: 'Activated' })).toHaveText('true');
});

test('Icon activates its action with Space', async ({ render }) => {
  const root = await render(<IconActionExample />);

  await root.getByRole('button', { name: 'Change language' }).press('Space');

  await expect(root.getByRole('status', { name: 'Activated' })).toHaveText('true');
});

test('a disabled Icon does not activate its action', async ({ render }) => {
  const root = await render(<IconActionExample disabled />);

  await root.getByRole('button', { name: 'Change language' }).click({ force: true });

  await expect(root.getByRole('status', { name: 'Activated' })).toHaveText('false');
});

test('an informative Icon exposes its accessible name', async ({ render }) => {
  const icon = await render(
    <Icon label="Languages available">
      <GlobeIcon />
    </Icon>,
  );

  await expect(icon).toHaveAccessibleName('Languages available');
});

test('Icon preserves the enclosing button name', async ({ render }) => {
  const button = await render(
    <Button>
      <Icon>
        <CheckIcon />
      </Icon>

      <Button.Label>Save changes</Button.Label>
    </Button>,
  );

  await expect(button).toHaveAccessibleName('Save changes');
});

test('decorative and informative icons have no accessibility violations together', async ({
  render,
  page,
}) => {
  await render(
    <div>
      <Icon>
        <GlobeIcon />
      </Icon>

      <Icon label="Languages available">
        <GlobeIcon />
      </Icon>
    </div>,
  );

  await expect(page).noAccessibilityViolations();
});

test('enabled and disabled icon actions have no accessibility violations together', async ({
  render,
  page,
}) => {
  await render(
    <div>
      <Icon label="Change language" onClick={() => {}}>
        <GlobeIcon />
      </Icon>

      <Icon label="Unavailable language action" disabled onClick={() => {}}>
        <GlobeIcon />
      </Icon>
    </div>,
  );

  await expect(page).noAccessibilityViolations();
});

test('icons composed with a field label and an adjacent action have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(
    <div>
      <Label htmlFor="collection">
        <Icon>
          <GlobeIcon />
        </Icon>
        Collection name
      </Label>

      <Icon label="About collection names" onClick={() => {}}>
        <GlobeIcon />
      </Icon>

      <Input id="collection" />
    </div>,
  );

  await expect(page).noAccessibilityViolations();
});

test('an icon-only Button has no accessibility violations', async ({ render, page }) => {
  await render(
    <Button aria-label="Save changes">
      <Icon>
        <CheckIcon />
      </Icon>
    </Button>,
  );

  await expect(page).noAccessibilityViolations();
});
