import type { Size, Tone } from '@lemuel-manske/design-tokens';

import type { Subset } from '@lemuel-manske/utils';

type IconSize = Subset<Size, 'small' | 'medium' | 'large'>;

type IconTone = Subset<Tone, 'default' | 'danger' | 'success' | 'warning' | 'info'>;

export type { IconSize, IconTone };
