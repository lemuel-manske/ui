import { expect, test } from '@lkmliz/config-playwright';

import { archiveTheme, libraryTheme } from '@lkmliz/design-tokens';

import { ThemedControls } from './Theme.test-fixture';

for (const [name, theme] of Object.entries({ archive: archiveTheme, library: libraryTheme })) {
  test(`${name} buttons preserve hover and disabled states`, async ({ render }) => {
    const root = await render(<ThemedControls theme={theme} />);

    const primary = root.getByRole('button', { name: 'Primary', exact: true });

    await primary.hover();

    const primaryHover = await primary.evaluate((element) =>
      getComputedStyle(element).getPropertyValue('--ui-action-primary-hover').trim(),
    );

    expect(primaryHover).toBe(theme.action['primary-hover']);

    await expect(primary).toHaveCSS(
      'background-color',
      name === 'archive' ? 'rgb(52, 49, 44)' : 'rgb(40, 81, 70)',
    );

    for (const label of ['Secondary', 'Tertiary']) {
      const button = root.getByRole('button', { name: label, exact: true });

      await button.hover();

      await expect(button).toHaveCSS(
        'background-color',
        name === 'archive' ? 'rgb(231, 224, 211)' : 'rgb(228, 238, 233)',
      );
    }

    const disabled = root.getByRole('button', { name: 'Disabled' });

    await disabled.hover({ force: true });

    await expect(disabled).toBeDisabled();

    await expect(disabled).toHaveCSS('opacity', '0.45');

    await expect(disabled).toHaveCSS(
      'background-color',
      name === 'archive' ? 'rgb(33, 31, 27)' : 'rgb(25, 58, 50)',
    );
  });

  test(`${name} focus indicators and invalid controls use state colors`, async ({
    render,
    page,
  }) => {
    const root = await render(<ThemedControls theme={theme} />);

    const invalid = [
      root.getByRole('textbox', { name: 'Invalid address', exact: true }),
      root.getByRole('textbox', { name: 'Invalid notes' }),
      root.getByRole('combobox', { name: 'Invalid collection' }),
    ];

    for (const control of invalid) {
      await expect(control).toHaveAttribute('aria-invalid', 'true');

      await expect(control).toHaveCSS('border-color', 'rgb(154, 51, 36)');

      await expect(control).toHaveCSS('border-width', '2px');
    }

    await expect(root.getByRole('alert')).toHaveCSS('color', 'rgb(154, 51, 36)');

    const checkbox = root.getByRole('checkbox', { name: 'Accept terms' });

    await expect(checkbox).toHaveCSS('outline-color', 'rgb(154, 51, 36)');

    await page.keyboard.press('Tab');

    for (const control of [
      root.getByRole('button', { name: 'Primary', exact: true }),
      root.getByRole('textbox', { name: 'Website address', exact: true }),
      ...invalid,
      root.getByRole('checkbox', { name: 'Remember collection' }),
      checkbox,
      root.getByRole('radio', { name: 'Private', exact: true }),
      root.getByRole('link'),
    ]) {
      await control.focus();

      await expect(control).toHaveCSS(
        'outline-color',
        name === 'archive' ? 'rgb(33, 31, 27)' : 'rgb(25, 58, 50)',
      );

      await expect(control).toHaveCSS('outline-width', '2px');
    }
  });

  test(`${name} headings keep their existing sizes`, async ({ render }) => {
    const root = await render(<ThemedControls theme={theme} />);

    for (const [label, size] of [
      ['Small heading', '22.5px'],
      ['Medium heading', '31.5px'],
      ['Large heading', '45px'],
    ]) {
      await expect(root.getByRole('heading', { name: label })).toHaveCSS('font-size', size);
    }
  });

  test(`${name} spinner preserves its speed and respects reduced motion`, async ({
    render,
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });

    const root = await render(<ThemedControls theme={theme} />);

    const ring = root.getByRole('status').locator('span').first();

    await expect(ring).toHaveCSS('animation-duration', '0.8s');

    await page.emulateMedia({ reducedMotion: 'reduce' });

    await expect(ring).toHaveCSS('animation-name', 'none');

    await expect(root.getByRole('status')).toHaveText('Loading');
  });

  test(`${name} focus indicators remain visible in forced colors`, async ({ render, page }) => {
    await page.emulateMedia({ forcedColors: 'active' });

    const root = await render(<ThemedControls theme={theme} />);

    await page.keyboard.press('Tab');

    for (const control of [
      root.getByRole('button', { name: 'Primary', exact: true }),
      root.getByRole('textbox', { name: 'Invalid address', exact: true }),
      root.getByRole('checkbox', { name: 'Accept terms' }),
      root.getByRole('link'),
    ]) {
      await control.focus();

      await expect(control).toBeFocused();

      await expect(control).toHaveCSS('outline-style', 'solid');

      await expect(control).toHaveCSS('outline-width', '2px');
    }
  });
}
