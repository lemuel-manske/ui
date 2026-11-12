import type { Size, Weight, Tone, Emphasis } from '@lemuel-manske/design-tokens';

import type { Subset } from '@lemuel-manske/utils';

type LegendSize = Subset<Size, 'small' | 'medium' | 'large'>;

type LegendWeight = Subset<Weight, 'regular' | 'medium' | 'semibold' | 'bold'>;

type LegendTone = Subset<Tone, 'success' | 'danger'> | 'primary' | 'secondary' | 'accent';

type LegendEmphasis = Subset<Emphasis, 'normal' | 'italic'>;

type FieldsetAppearance = 'outlined' | 'divided' | 'plain';

export type { LegendSize, LegendWeight, LegendTone, LegendEmphasis, FieldsetAppearance };
