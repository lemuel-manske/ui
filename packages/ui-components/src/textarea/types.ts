import type { ChangeEventHandler, FocusEventHandler, Ref } from 'react';

import type { AccessibilityOptions } from '@lemuel-manske/utils';

import type { TextareaSize } from './options';

interface TextareaProps extends AccessibilityOptions {
  /**
   * Visual size of the component. This does not change its semantic role.
   * @remarks Type `TextareaSize`.
   * @default Size.MEDIUM
   */
  size?: TextareaSize;

  /**
   * Name used when the control contributes a value to native form submission.
   * @remarks Type `string`.
   * @default undefined
   */
  name?: string;

  /**
   * Controlled value. Supply the corresponding change handler to update it.
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
   * @remarks Type `ChangeEventHandler<HTMLTextAreaElement>`.
   * @default undefined
   */
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;

  /**
   * Native focus handler called when focus leaves the control.
   * @remarks Type `FocusEventHandler<HTMLTextAreaElement>`.
   * @default undefined
   */
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLTextAreaElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLTextAreaElement>;

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
   * Native number of visible text rows. Additional content can scroll.
   * @remarks Type `number`.
   * @default 2 (native default)
   */
  rows?: number;

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
}

export type { TextareaProps };
