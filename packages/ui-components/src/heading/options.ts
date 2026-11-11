import type { Size, Weight, Tone, Emphasis } from '@lemuel-manske/design-tokens';

type HeadingSize = Size.SMALL | Size.MEDIUM | Size.LARGE | Size.XLARGE;

type HeadingWeight = Weight.REGULAR | Weight.MEDIUM | Weight.SEMIBOLD | Weight.BOLD;

type HeadingTone = 'primary' | 'secondary' | 'accent' | Tone.SUCCESS | Tone.DANGER;

type HeadingEmphasis = Emphasis.NORMAL | Emphasis.ITALIC;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type { HeadingSize, HeadingWeight, HeadingTone, HeadingLevel, HeadingEmphasis };
