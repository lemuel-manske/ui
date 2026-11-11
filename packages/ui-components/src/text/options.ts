import type { Size, Tone, Emphasis } from '@lemuel-manske/design-tokens';

type TextSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

type TextTone = 'primary' | 'secondary' | 'accent' | Tone.SUCCESS | Tone.DANGER;

type TextEmphasis = Emphasis.NORMAL | Emphasis.ITALIC;

type TextRole = 'p' | 'span';

export type { TextSize, TextTone, TextRole, TextEmphasis };
