import { expect, test } from '@lemuel-manske/config-jest/globals';

import { createTheme, type ThemeOverrides } from './createTheme';
import { archiveTheme, libraryTheme, type DesignTokens } from './tokens';

test('creates a complete brand from partial group overrides', () => {
  const brand: DesignTokens = createTheme(libraryTheme, {
    color: { background: '#FFFFFF', 'text-primary': '#172554' },
    action: { primary: '#1D4ED8', 'primary-hover': '#1E40AF' },
    font: { display: 'Inter, sans-serif' },
    text: { display: 'clamp(2.5rem, 5vw, 5rem)' },
    tracking: { display: '-0.02em' },
  });

  expect(brand).toMatchObject({
    color: { background: '#FFFFFF', 'text-primary': '#172554', border: libraryTheme.color.border },
    action: { primary: '#1D4ED8', 'primary-hover': '#1E40AF', danger: libraryTheme.action.danger },
    font: { display: 'Inter, sans-serif', body: libraryTheme.font.body },
    text: { display: 'clamp(2.5rem, 5vw, 5rem)', medium: libraryTheme.text.medium },
    tracking: { display: '-0.02em', body: libraryTheme.tracking.body },
    space: libraryTheme.space,
  });
});

test('an empty override preserves the complete base theme', () => {
  expect(createTheme(archiveTheme, {})).toEqual(archiveTheme);
});

test('copies groups instead of sharing mutable objects with either input', () => {
  const base = structuredClone(archiveTheme);
  const originalBase = structuredClone(base);

  const overrides: ThemeOverrides = { action: { primary: '#1D4ED8' } };
  const originalOverrides = structuredClone(overrides);

  const brand = createTheme(base, overrides);

  brand.action.primary = '#000000';
  brand.color.background = '#000000';
  brand.space[8] = '1rem';

  expect({ base, overrides }).toEqual({ base: originalBase, overrides: originalOverrides });
});

test('accepts frozen inputs without mutation', () => {
  const overrides = Object.freeze({ action: Object.freeze({ primary: '#1D4ED8' }) });
  const base = Object.freeze({
    ...libraryTheme,
    action: Object.freeze({ ...libraryTheme.action }),
  });

  expect(createTheme(base, overrides).action.primary).toBe('#1D4ED8');
});

test('preserves base values for explicitly undefined optional overrides', () => {
  expect(createTheme(libraryTheme, { color: { background: undefined } }).color.background).toBe(
    libraryTheme.color.background,
  );
});

test('can derive a second brand without changing the first brand', () => {
  const first = createTheme(libraryTheme, { action: { primary: '#1D4ED8' } });
  const second = createTheme(first, { action: { 'primary-hover': '#1E40AF' } });

  expect(second.action).toEqual({ ...first.action, 'primary-hover': '#1E40AF' });

  expect(first.action['primary-hover']).toBe(libraryTheme.action['primary-hover']);
});

// Compile-time validation exercises the same public function signature used by consumers.
function validateOverrides() {
  // @ts-expect-error Unknown semantic token names are rejected.
  createTheme(libraryTheme, { action: { invented: '#000000' } });

  // @ts-expect-error Numeric foundation weights cannot be replaced by strings.
  createTheme(libraryTheme, { weight: { bold: '700' } });

  // @ts-expect-error Typography recipe groups are not part of the token contract.
  createTheme(libraryTheme, { typography: { display: { family: 'Inter' } } });
}

void validateOverrides;
