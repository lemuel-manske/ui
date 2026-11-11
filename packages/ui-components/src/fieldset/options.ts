import type { Size, Weight, Tone, Emphasis } from '@lemuel-manske/design-tokens';

type LegendSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

type LegendWeight = Weight.REGULAR | Weight.MEDIUM | Weight.SEMIBOLD | Weight.BOLD;

type LegendTone = 'primary' | 'secondary' | 'accent' | Tone.SUCCESS | Tone.DANGER;

type LegendEmphasis = Emphasis.NORMAL | Emphasis.ITALIC;

const FieldsetAppearance = { OUTLINED: 'outlined', DIVIDED: 'divided', PLAIN: 'plain' } as const;

type FieldsetAppearance = (typeof FieldsetAppearance)[keyof typeof FieldsetAppearance];

export type { LegendSize, LegendWeight, LegendTone, LegendEmphasis };

export { FieldsetAppearance };
