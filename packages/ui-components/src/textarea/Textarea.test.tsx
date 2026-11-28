import { expect, test } from '@lemuel-manske/config-playwright';

import { Textarea } from './Textarea';

import { Button } from '../button/Button';

test('Textarea supports native form reset', async ({ render }) => {
  const form = await render(
    <form>
      <Textarea aria-label="Name" defaultValue="Original" />

      <Button type="reset">Reset</Button>
    </form>,
  );

  await form.getByRole('textbox').fill('Changed');

  await form.getByRole('button').click();

  await expect(form.getByRole('textbox')).toHaveValue('Original');
});

test('Textarea uses two visible rows by default', async ({ render }) => {
  const input = await render(<Textarea aria-label="Notes" />);

  await expect(input).toHaveJSProperty('rows', 2);
});

test('Textarea accepts an explicit row count', async ({ render }) => {
  const input = await render(<Textarea aria-label="Notes" rows={6} />);

  await expect(input).toHaveJSProperty('rows', 6);
});

test('Textarea has no accessibility violations', async ({ render, page }) => {
  await render(<Textarea aria-label="Name" />);

  await expect(page).noAccessibilityViolations();
});
