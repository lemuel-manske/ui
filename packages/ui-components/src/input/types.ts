import type { ChangeEventHandler, FocusEventHandler, Ref } from 'react';

import type { AccessibilityOptions } from '@lemuel-manske/utils';

import type { InputSize, InputType } from './options';

interface InputProps extends AccessibilityOptions {
  /**
   * Visual size of the component. This does not change its semantic role.
   * @remarks Type `InputSize`.
   * @default Size.MEDIUM
   */
  size?: InputSize;

  /**
   * Name used when the control contributes a value to native form submission.
   * @remarks Type `string`.
   * @default undefined
   */
  name?: string;

  /**
   * Controlled input value. Supply onChange for an editable controlled input.
   * @remarks Type `string`.
   * @default undefined
   */
  value?: string;

  /**
   * Initial value for an uncontrolled control. Later updates do not reset user input.
   * @remarks Type `string`.
   * @default undefined
   */
  defaultValue?: string;

  /**
   * Requires a value before native form submission can complete.
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
   * Native browser autofill hint for the control.
   * @remarks Type `string`.
   * @default undefined
   */
  autoComplete?: string;

  /**
   * Native change handler called when the user edits or selects a value.
   * @remarks Type `ChangeEventHandler<HTMLInputElement>`.
   * @default undefined
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * Native focus handler called when focus leaves the control.
   * @remarks Type `FocusEventHandler<HTMLInputElement>`.
   * @default undefined
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLInputElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Native input type controlling editing, validation, and browser input affordances.
   * @remarks Type `InputType`.
   * @default 'text' (native default)
   */
  type?: InputType;

  /**
   * Short input hint shown while the value is empty. Supply a separate accessible label.
   * @remarks Type `string`.
   * @default undefined
   */
  placeholder?: string;

  /**
   * Prevents editing while preserving focus and native form submission.
   * @remarks Type `boolean`.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Minimum permitted value for compatible native input types.
   * @remarks Type `string | number`.
   * @default undefined
   */
  min?: string | number;

  /**
   * Maximum permitted value for compatible native input types.
   * @remarks Type `string | number`.
   * @default undefined
   */
  max?: string | number;

  /**
   * Allowed increment for compatible numeric, date, and time inputs.
   * @remarks Type `string | number`.
   * @default undefined
   */
  step?: string | number;

  /**
   * Minimum number of characters accepted by native text validation.
   * @remarks Type `number`.
   * @default undefined
   */
  minLength?: number;

  /**
   * Maximum number of characters the user can enter.
   * @remarks Type `number`.
   * @default undefined
   */
  maxLength?: number;

  /**
   * Native regular-expression constraint for compatible text input types.
   * @remarks Type `string`.
   * @default undefined
   */
  pattern?: string;
}

export type { InputProps };
