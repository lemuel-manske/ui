import type { Size } from '@lemuel-manske/design-tokens';

import type { Subset } from '@lemuel-manske/utils';

type SpinnerSize = Subset<Size, 'small' | 'medium' | 'large'>;

export type { SpinnerSize };
