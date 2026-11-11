import type { Size, Tone } from '@lemuel-manske/design-tokens';

type LabelSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

type LabelTone = Tone.DEFAULT | Tone.DANGER | Tone.SUCCESS | Tone.WARNING | Tone.INFO;

export type { LabelSize, LabelTone };
