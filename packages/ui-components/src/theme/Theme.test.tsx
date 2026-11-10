import { expect, test } from '@lkmliz/config-playwright';

import { archiveTheme, libraryTheme } from '@lkmliz/design-tokens';
import type { DesignTokens } from '@lkmliz/design-tokens';

import { Button } from '../button/Button';
import { Input } from '../input/Input';

import { Theme } from './Theme';
import { ThemeSwitcher } from './Theme.test-fixture';

test('nested themes are scoped to their descendants', async ({ render }) => {
  const root = await render(
    <div>
      <Theme theme={archiveTheme}>
        <Button>Archive before</Button>

        <Theme theme={libraryTheme}>
          <Button>Library</Button>
        </Theme>

        <Button>Archive after</Button>
      </Theme>

      <Theme theme={archiveTheme}>
        <Button>Sibling</Button>
      </Theme>
    </div>,
  );

  await expect(root.getByRole('button', { name: 'Library', exact: true })).toHaveCSS(
    'background-color',
    'rgb(25, 58, 50)',
  );

  for (const name of ['Archive before', 'Archive after', 'Sibling']) {
    await expect(root.getByRole('button', { name, exact: true })).toHaveCSS(
      'background-color',
      'rgb(33, 31, 27)',
    );
  }
});

test('a custom theme styles different component types', async ({ render }) => {
  const theme = {
    ...libraryTheme,

    color: {
      ...libraryTheme.color,
      background: '#f0f4ff',
      'text-primary': '#162f65',
    },

    font: { body: 'monospace', display: 'monospace', mono: 'monospace' },

    control: { small: '40px', medium: '52px', large: '60px' },

    border: { width: '2px', radius: '12px' },
  } satisfies DesignTokens;

  const root = await render(
    <Theme theme={theme}>
      <Button>Custom button</Button>

      <Input aria-label="Custom input" />

      <p>Custom text</p>
    </Theme>,
  );

  const button = root.getByRole('button', { name: 'Custom button' });
  const input = root.getByRole('textbox', { name: 'Custom input' });

  await expect(root).toHaveCSS('background-color', 'rgb(240, 244, 255)');

  await expect(button).toHaveCSS('background-color', 'rgb(22, 47, 101)');

  await expect(input).toHaveCSS('background-color', 'rgb(240, 244, 255)');

  for (const control of [button, input]) {
    await expect(control).toHaveCSS('min-height', '52px');

    await expect(control).toHaveCSS('border-radius', '12px');

    await expect(control).toHaveCSS('font-family', 'monospace');
  }

  await expect(root.getByText('Custom text')).toHaveCSS('color', 'rgb(22, 47, 101)');

  await expect(root.getByText('Custom text')).toHaveCSS('font-family', 'monospace');
});

test('changing the theme updates mounted components', async ({ render, page }) => {
  const root = await render(<ThemeSwitcher />);

  const button = root.getByRole('button', { name: 'Switch theme' });

  await expect(button).toHaveCSS('background-color', 'rgb(33, 31, 27)');

  await page.keyboard.press('Tab');

  await button.press('Enter');

  await expect(button).toHaveCSS('background-color', 'rgb(25, 58, 50)');

  await expect(button).toBeFocused();

  await button.press('Space');

  await expect(button).toHaveCSS('background-color', 'rgb(33, 31, 27)');
});

for (const [name, theme] of Object.entries({ archive: archiveTheme, library: libraryTheme })) {
  test(`${name} theme has no accessibility violations`, async ({ render, page }) => {
    await render(
      <Theme theme={theme}>
        <Button>Save changes</Button>

        <Input aria-label="Website address" />
      </Theme>,
    );

    await expect(page).noAccessibilityViolations();
  });
}
