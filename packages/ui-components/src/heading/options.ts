import type { Size, Weight } from '@lemuel-manske/design-tokens';

type HeadingSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

type HeadingWeight = Weight.REGULAR | Weight.MEDIUM | Weight.SEMIBOLD | Weight.BOLD;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type { HeadingSize, HeadingWeight, HeadingLevel };
