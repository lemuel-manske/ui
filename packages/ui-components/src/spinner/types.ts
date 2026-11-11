import type { SpinnerSize, SpinnerLabelVisibility } from './options';

interface SpinnerProps {
  /**
   * Shows the single status message beside the ring or hides it visually.
   * @remarks Type `SpinnerLabelVisibility`.
   * @default SpinnerLabelVisibility.HIDDEN
   */
  labelVisibility?: SpinnerLabelVisibility;

  /**
   * Status text announced to assistive technology. Supply a localized message describing the pending work.
   * @remarks Type `string`.
   * @default 'Loading'
   */
  label?: string;

  /**
   * Visual size of the component. This does not change its semantic role.
   * @remarks Type `SpinnerSize`.
   * @default Size.MEDIUM
   */
  size?: SpinnerSize;
}

export type { SpinnerProps };
