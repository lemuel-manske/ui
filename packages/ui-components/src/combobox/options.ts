import type { Size } from '@lemuel-manske/design-tokens';

type ComboboxSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

enum ComboboxAppearance {
  CUSTOM = 'custom',
  NATIVE = 'native',
}

export type { ComboboxSize };
export { ComboboxAppearance };
