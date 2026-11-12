import type { Size, Weight, Tone, Emphasis } from '@lemuel-manske/design-tokens';

enum FieldsetAppearanceEnum {
  OUTLINED = 'outlined',
  DIVIDED = 'divided',
  PLAIN = 'plain',
}

type LegendSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

type LegendWeight = Weight.REGULAR | Weight.MEDIUM | Weight.SEMIBOLD | Weight.BOLD;

type LegendTone = 'primary' | 'secondary' | 'accent' | Tone.SUCCESS | Tone.DANGER;

type LegendEmphasis = Emphasis.NORMAL | Emphasis.ITALIC;

type FieldsetAppearance =
  | FieldsetAppearanceEnum.PLAIN
  | FieldsetAppearanceEnum.DIVIDED
  | FieldsetAppearanceEnum.OUTLINED;

export { FieldsetAppearanceEnum };

export type { LegendSize, LegendWeight, LegendTone, LegendEmphasis, FieldsetAppearance };
