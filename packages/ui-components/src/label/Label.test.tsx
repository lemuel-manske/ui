import { expect, test } from '@lemuel-manske/config-playwright';

import { Icon } from '../icon/Icon';
import { Input } from '../input/Input';
import { InfoIcon } from '../icon/ExampleIcons.test-fixture';

import { Label } from './Label';

test('Label focuses its associated field when clicked', async ({ render }) => {
  const root = await render(
    <div>
      <Label htmlFor="collection">Collection name</Label>

      <Input id="collection" />
    </div>,
  );

  await root.getByText('Collection name').click();

  await expect(root.getByRole('textbox', { name: 'Collection name' })).toBeFocused();
});

test('Label with a decorative icon names its field from the text', async ({ render }) => {
  const root = await render(
    <div>
      <Label htmlFor="collection">
        <Icon>
          <InfoIcon />
        </Icon>
        Collection name
      </Label>

      <Input id="collection" />
    </div>,
  );

  await expect(root.getByRole('textbox')).toHaveAccessibleName('Collection name');
});

test('an informative icon can supply the label content', async ({ render }) => {
  const root = await render(
    <div>
      <Label htmlFor="collection">
        <Icon label="Collection name">
          <InfoIcon />
        </Icon>
      </Label>

      <Input id="collection" />
    </div>,
  );

  await expect(root.getByRole('textbox')).toHaveAccessibleName('Collection name');
});

test('a text label has no accessibility violations', async ({ render, page }) => {
  await render(
    <div>
      <Label htmlFor="collection">Collection name</Label>

      <Input id="collection" />
    </div>,
  );

  await expect(page).noAccessibilityViolations();
});

test('a label composed with a decorative icon has no accessibility violations', async ({
  render,
  page,
}) => {
  await render(
    <div>
      <Label htmlFor="collection">
        <Icon>
          <InfoIcon />
        </Icon>
        Collection name
      </Label>

      <Input id="collection" />
    </div>,
  );

  await expect(page).noAccessibilityViolations();
});

test('a label composed with an informative icon has no accessibility violations', async ({
  render,
  page,
}) => {
  await render(
    <div>
      <Label htmlFor="collection">
        <Icon label="Collection name">
          <InfoIcon />
        </Icon>
      </Label>

      <Input id="collection" />
    </div>,
  );

  await expect(page).noAccessibilityViolations();
});
