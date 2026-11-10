import { expect, test } from '@lkmliz/config-playwright';

import { archiveTheme, libraryTheme, Weight } from '@lkmliz/design-tokens';
import type { DesignTokens } from '@lkmliz/design-tokens';

import { Theme } from './Theme';

const tokenNames = {
  color: [
    'background',
    'surface',
    'surface-muted',
    'surface-inverse',
    'border',
    'text-primary',
    'text-secondary',
    'text-muted',
  ],
  action: [
    'primary',
    'primary-hover',
    'primary-foreground',
    'secondary',
    'secondary-hover',
    'secondary-foreground',
  ],
  state: ['focus', 'danger', 'danger-foreground', 'success', 'success-foreground'],
  font: ['body', 'display', 'mono'],
  text: ['small', 'medium', 'large', 'heading-small', 'heading-medium', 'heading-large', 'display'],
  weight: [Weight.REGULAR, Weight.MEDIUM, Weight.SEMIBOLD, Weight.BOLD],
  space: [4, 8, 12, 16, 24, 32, 48, 64, 96],
  control: ['small', 'medium', 'large'],
  border: ['width'],
  radius: ['none', 'small', 'medium', 'large', 'full'],
  motion: [
    'duration-fast',
    'duration-normal',
    'duration-slow',
    'easing-standard',
    'easing-emphasized',
  ],
} satisfies { [Group in keyof DesignTokens]: readonly (keyof DesignTokens[Group])[] };

function contrast(foreground: string, background: string) {
  function luminance(hex: string) {
    const channels = [1, 3, 5].map((start) => {
      const value = parseInt(hex.slice(start, start + 2), 16) / 255;

      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });

    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  }

  const first = luminance(foreground);
  const second = luminance(background);

  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

for (const [name, theme] of Object.entries({ archive: archiveTheme, library: libraryTheme })) {
  const variables = Object.fromEntries(
    Object.entries(theme).flatMap(([group, tokens]) =>
      Object.entries(tokens).map(([token, value]) => [`--ui-${group}-${token}`, String(value)]),
    ),
  );

  test(`${name} preset has the complete flat token contract`, () => {
    expect(Object.keys(theme).sort()).toEqual(Object.keys(tokenNames).sort());

    for (const [group, names] of Object.entries(tokenNames)) {
      const tokens = theme[group as keyof DesignTokens];

      expect(Object.keys(tokens).sort()).toEqual(names.map(String).sort());

      for (const value of Object.values(tokens)) {
        expect(['string', 'number']).toContain(typeof value);
      }
    }
  });

  test(`${name} generated stylesheet contains every token`, async ({ render }) => {
    const root = await render(<div data-ui-theme={name}>Generated theme</div>);

    const values = await root.evaluate((element, names) => {
      const style = getComputedStyle(element);

      return Object.fromEntries(
        names.map((token) => [token, style.getPropertyValue(token).trim()]),
      );
    }, Object.keys(variables));

    expect(values).toEqual(variables);

    await expect(root).toHaveCSS('--ui-color-dark-surface', '');

    await expect(root).toHaveCSS('--ui-border-radius', '');
  });

  test(`${name} Theme wrapper applies every token directly`, async ({ render }) => {
    const root = await render(<Theme theme={theme}>Inline theme</Theme>);

    const values = await root.evaluate(
      (element, names) =>
        Object.fromEntries(
          names.map((token) => [
            token,
            (element as HTMLElement).style.getPropertyValue(token).trim(),
          ]),
        ),
      Object.keys(variables),
    );

    expect(values).toEqual(variables);
  });

  test(`${name} semantic color pairs have sufficient contrast`, () => {
    const surfaces = [theme.color.background, theme.color.surface, theme.color['surface-muted']];

    for (const background of surfaces) {
      for (const foreground of [
        theme.color['text-primary'],
        theme.color['text-secondary'],
        theme.color['text-muted'],
        theme.action.primary,
        theme.action['secondary-foreground'],
        theme.state.danger,
        theme.state.success,
      ]) {
        expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
      }

      for (const foreground of [theme.color.border, theme.state.focus]) {
        expect(contrast(foreground, background)).toBeGreaterThanOrEqual(3);
      }
    }

    for (const [foreground, background] of [
      [theme.action['primary-foreground'], theme.action.primary],
      [theme.action['primary-foreground'], theme.action['primary-hover']],
      [theme.action['secondary-foreground'], theme.action['secondary-hover']],
      [theme.action['primary-foreground'], theme.color['surface-inverse']],
      [theme.state['danger-foreground'], theme.state.danger],
      [theme.state['success-foreground'], theme.state.success],
    ]) {
      expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
    }
  });
}
