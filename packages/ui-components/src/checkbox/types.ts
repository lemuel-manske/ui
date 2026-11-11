import type { ChangeEventHandler, ReactNode, Ref } from 'react';

import type { AccessibilityOptions } from '@lemuel-manske/utils';

interface CheckboxProps extends AccessibilityOptions {
  /**
   * Visible label content rendered beside the checkbox.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Name used when the control contributes a value to native form submission.
   * @remarks Type `string`.
   * @default undefined
   */
  name?: string;

  /**
   * Value submitted when this named checkbox is checked.
   * @remarks Type `string`.
   * @default 'on' (native checkbox default)
   */
  value?: string;

  /**
   * Controlled checked state. Supply onChange to update it.
   * @remarks Type `boolean`.
   * @default undefined
   */
  checked?: boolean;

  /**
   * Initial checked state for an uncontrolled checkbox.
   * @remarks Type `boolean`.
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Requires the checkbox to be checked before native form submission.
   * @remarks Type `boolean`.
   * @default false
   */
  required?: boolean;

  /**
   * Marks the current value as invalid for assistive technology. Supply a description of the error.
   * @remarks Type `boolean`.
   * @default undefined
   */
  'aria-invalid'?: boolean;

  /**
   * Additional CSS classes applied to the wrapping label.
   * @remarks Type `string`.
   * @default undefined
   */
  className?: string;

  /**
   * Native change handler called when the user edits or selects a value.
   * @remarks Type `ChangeEventHandler<HTMLInputElement>`.
   * @default undefined
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLInputElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLInputElement>;
}

export type { CheckboxProps };
