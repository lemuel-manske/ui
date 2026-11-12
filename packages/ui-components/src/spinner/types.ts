import type { SpinnerSize } from './options';

interface SpinnerProps {
  /**
   * Whether the status text is visually hidden. When true, the label is visually hidden but still available to assistive technology.
   * @remarks Type `boolean`.
   * @default false
   */
  labelHidden?: boolean;

  /**
   * Status text announced to assistive technology. Supply a localized message describing the pending work.
   * @remarks Type `string`.
   * @default 'Loading'
   */
  label?: string;

  /**
   * Visual size of the component. This does not change its semantic role.
   * @remarks Type `SpinnerSize`.
   * @default 'medium'
   */
  size?: SpinnerSize;
}

export type { SpinnerProps };
