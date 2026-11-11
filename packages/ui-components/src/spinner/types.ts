import type { SpinnerSize } from './options';

interface SpinnerProps {
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

  /**
   * Additional CSS classes applied to the component root.
   * @remarks Type `string`.
   * @default undefined
   */
  className?: string;
}

export type { SpinnerProps };
