import type { Size, Variant, Tone } from '@lemuel-manske/design-tokens';

type ButtonSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

type ButtonVariant = Variant.PRIMARY | Variant.SECONDARY | Variant.TERTIARY;

type ButtonTone = Tone.DEFAULT | Tone.DANGER | Tone.SUCCESS | Tone.WARNING | Tone.INFO;

type ButtonType = 'button' | 'submit' | 'reset';

export type { ButtonSize, ButtonVariant, ButtonTone, ButtonType };
