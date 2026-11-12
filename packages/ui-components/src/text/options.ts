import type { Size, Tone, Emphasis } from '@lemuel-manske/design-tokens';

import type { Subset } from '@lemuel-manske/utils';

type TextSize = Subset<Size, 'small' | 'medium' | 'large'>;

type TextTone = Subset<Tone, 'success' | 'danger'> | 'primary' | 'secondary' | 'accent';

type TextEmphasis = Subset<Emphasis, 'normal' | 'italic'>;

type TextRole = 'p' | 'span';

export type { TextSize, TextTone, TextRole, TextEmphasis };
