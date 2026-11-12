import type { Size, Variant, Tone } from '@lemuel-manske/design-tokens';

import type { Subset } from '@lemuel-manske/utils';

type ButtonSize = Subset<Size, 'small' | 'medium' | 'large'>;

type ButtonVariant = Subset<Variant, 'primary' | 'secondary' | 'tertiary'>;

type ButtonTone = Subset<Tone, 'default' | 'danger' | 'success' | 'warning' | 'info'>;

type ButtonType = 'button' | 'submit' | 'reset';

export type { ButtonSize, ButtonVariant, ButtonTone, ButtonType };
