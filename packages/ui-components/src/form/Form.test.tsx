import { Button } from '../button/Button';

import { Label } from '../label/Label';

import { Combobox } from '../combobox/Combobox';

import { Textarea } from '../textarea/Textarea';

import { Input } from '../input/Input';

import { expect, test } from '@lemuel-manske/config-playwright';

import { Form } from './Form';

import { FormExample, ControlledInput } from './Form.test-fixture';

test('Form submits named input values', async ({ render }) => {
  const form = await render(<FormExample />);

  await form.getByRole('textbox', { name: 'Website URL' }).fill('https://example.com');

  await form.getByRole('button', { name: 'Save' }).click();

  await expect(form.getByRole('status')).toHaveText('https://example.com');
});

test('Form preserves native required validation', async ({ render }) => {
  const form = await render(<FormExample />);

  await form.getByRole('button', { name: 'Save' }).click();

  await expect(form.getByRole('textbox')).toBeFocused();

  await expect(form.getByRole('status')).toBeEmpty();
});

test('Form label focuses its input', async ({ render }) => {
  const form = await render(<FormExample />);

  await form.getByText('Website URL', { exact: true }).click();

  await expect(form.getByRole('textbox')).toBeFocused();
});

test('Input supports controlled values', async ({ render }) => {
  const input = await render(<ControlledInput />);

  await input.fill('Archive');

  await expect(input).toHaveValue('Archive');
});

test('Input exposes validation feedback', async ({ render }) => {
  const form = await render(
    <Form>
      <Input aria-label="URL" aria-invalid aria-describedby="error" />

      <p id="error">Enter a valid URL.</p>
    </Form>,
  );

  await expect(form.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');

  await expect(form.getByRole('textbox')).toHaveAccessibleDescription('Enter a valid URL.');
});

test('Input supports read-only values', async ({ render }) => {
  const input = await render(<Input aria-label="Title" readOnly value="Archive" />);

  await expect(input).not.toBeEditable();
});

test('Textarea accepts multiline text', async ({ render }) => {
  const input = await render(<Textarea aria-label="Notes" />);

  await input.fill('First line\nSecond line');

  await expect(input).toHaveValue('First line\nSecond line');
});

test('form controls have no accessibility violations', async ({ render, page }) => {
  await render(
    <Form aria-label="Capture">
      <Label htmlFor="url">URL</Label>

      <Input id="url" required />

      <Label htmlFor="notes">Notes</Label>

      <Textarea id="notes" />

      <Label htmlFor="collection">Collection</Label>

      <Combobox id="collection">
        <Combobox.Option value="reading">Reading</Combobox.Option>
      </Combobox>

      <Button type="submit">
        <Button.Label>Save</Button.Label>
      </Button>
    </Form>,
  );

  await expect(page).noAccessibilityViolations();
});
