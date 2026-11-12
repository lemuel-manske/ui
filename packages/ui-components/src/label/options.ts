import type { Size, Tone } from '@lemuel-manske/design-tokens';

import type { Subset } from '@lemuel-manske/utils';

type LabelSize = Subset<Size, 'small' | 'medium' | 'large'>;

type LabelTone = Subset<Tone, 'default' | 'danger' | 'success' | 'warning' | 'info'>;

export type { LabelSize, LabelTone };
