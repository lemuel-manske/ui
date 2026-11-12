import type { Size, Weight, Tone, Emphasis } from '@lemuel-manske/design-tokens';

import type { Subset } from '@lemuel-manske/utils';

type HeadingSize = Subset<Size, 'small' | 'medium' | 'large' | 'xlarge'>;

type HeadingWeight = Subset<Weight, 'regular' | 'medium' | 'semibold' | 'bold'>;

type HeadingTone = Subset<Tone, 'success' | 'danger'> | 'primary' | 'secondary' | 'accent';

type HeadingEmphasis = Subset<Emphasis, 'normal' | 'italic'>;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type { HeadingSize, HeadingWeight, HeadingTone, HeadingLevel, HeadingEmphasis };
