import { expect, test } from '@lkmliz/config-playwright';

import { archiveTheme, libraryTheme } from '@lkmliz/design-tokens';
import type { DesignTokens } from '@lkmliz/design-tokens';

import { Button } from '../button/Button';
import { ButtonVariant } from '../button/options';
import { Input } from '../input/Input';
import { Heading } from '../heading/Heading';
import { HeadingSize } from '../heading/options';
import { Spinner } from '../spinner/Spinner';

import { Theme } from './Theme';
import { ThemeSwitcher, ThemedControls } from './Theme.test-fixture';

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

    action: {
      ...libraryTheme.action,
      primary: '#243fa0',
      'primary-hover': '#18357a',
      'primary-foreground': '#ffffff',
      secondary: '#e8edf2',
      'secondary-hover': '#dbe4ff',
      'secondary-foreground': '#163159',
    },

    state: {
      ...libraryTheme.state,
      focus: '#7a2990',
      danger: '#8c1350',
    },

    font: { body: 'monospace', display: 'monospace', mono: 'monospace' },

    text: {
      ...libraryTheme.text,
      large: '2rem',
      'heading-small': '1.25rem',
      'heading-medium': '1.75rem',
      'heading-large': '2.5rem',
    },

    control: { small: '40px', medium: '52px', large: '60px' },

    border: { width: '2px' },

    radius: { ...libraryTheme.radius, small: '12px' },

    motion: { ...libraryTheme.motion, 'duration-normal': '100ms' },
  } satisfies DesignTokens;

  const root = await render(
    <Theme theme={theme}>
      <Button>Custom button</Button>

      <Button variant={ButtonVariant.SECONDARY}>Custom secondary</Button>

      <Input aria-label="Custom input" />

      <Input aria-label="Custom invalid input" aria-invalid />

      <p>Custom text</p>

      <Heading level={1} size={HeadingSize.SMALL}>
        Small heading
      </Heading>

      <Heading size={HeadingSize.MEDIUM}>Medium heading</Heading>

      <Heading level={3} size={HeadingSize.LARGE}>
        Large heading
      </Heading>

      <Spinner />
    </Theme>,
  );

  const button = root.getByRole('button', { name: 'Custom button' });
  const input = root.getByRole('textbox', { name: 'Custom input' });

  await expect(root).toHaveCSS('background-color', 'rgb(240, 244, 255)');

  await expect(button).toHaveCSS('background-color', 'rgb(36, 63, 160)');

  await expect(button).toHaveCSS('color', 'rgb(255, 255, 255)');

  await expect(input).toHaveCSS('background-color', 'rgb(240, 244, 255)');

  for (const control of [button, input]) {
    await expect(control).toHaveCSS('min-height', '52px');

    await expect(control).toHaveCSS('border-radius', '12px');

    await expect(control).toHaveCSS('font-family', 'monospace');
  }

  await expect(root.getByText('Custom text')).toHaveCSS('color', 'rgb(22, 47, 101)');

  await expect(root.getByText('Custom text')).toHaveCSS('font-family', 'monospace');

  await expect(root.getByRole('textbox', { name: 'Custom invalid input' })).toHaveCSS(
    'border-color',
    'rgb(140, 19, 80)',
  );

  await input.focus();

  await expect(input).toHaveCSS('outline-color', 'rgb(122, 41, 144)');

  await button.hover();

  await expect(button).toHaveCSS('background-color', 'rgb(24, 53, 122)');

  const secondary = root.getByRole('button', { name: 'Custom secondary' });

  await expect(secondary).toHaveCSS('background-color', 'rgb(232, 237, 242)');

  await expect(secondary).toHaveCSS('color', 'rgb(22, 49, 89)');

  await secondary.hover();

  await expect(secondary).toHaveCSS('background-color', 'rgb(219, 228, 255)');

  for (const [name, size] of [
    ['Small heading', '20px'],
    ['Medium heading', '28px'],
    ['Large heading', '40px'],
  ]) {
    await expect(root.getByRole('heading', { name })).toHaveCSS('font-size', size);
  }

  await expect(root.getByRole('status').locator('span').first()).toHaveCSS(
    'animation-duration',
    '0.4s',
  );
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
    await render(<ThemedControls theme={theme} />);

    await expect(page).noAccessibilityViolations();
  });
}
