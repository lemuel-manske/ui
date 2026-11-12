import type { Size } from '@lemuel-manske/design-tokens';

import type { Subset } from '@lemuel-manske/utils';

type TextareaSize = Subset<Size, 'small' | 'medium' | 'large'>;

export type { TextareaSize };
