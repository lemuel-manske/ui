import type { Size } from '@lemuel-manske/design-tokens';

type SpinnerSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

const SpinnerLabelVisibility = { VISIBLE: 'visible', HIDDEN: 'hidden' } as const;

type SpinnerLabelVisibility = (typeof SpinnerLabelVisibility)[keyof typeof SpinnerLabelVisibility];

export type { SpinnerSize };

export { SpinnerLabelVisibility };
