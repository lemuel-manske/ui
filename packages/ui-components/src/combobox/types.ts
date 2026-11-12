import type { ChangeEventHandler, FocusEventHandler, ReactNode, Ref } from 'react';

import type { AccessibilityOptions } from '@lemuel-manske/utils';

import type { ComboboxSize } from './options';

interface ComboboxProps extends AccessibilityOptions {
  /**
   * Native option elements, usually composed using Combobox.Option.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Visual control size. The component always renders a single-selection native select.
   * @remarks Type `ComboboxSize`.
   * @default Size.MEDIUM
   */
  size?: ComboboxSize;

  /**
   * Name used when the control contributes a value to native form submission.
   * @remarks Type `string`.
   * @default undefined
   */
  name?: string;

  /**
   * Controlled selected option value. Supply onChange to update it.
   * @remarks Type `string`.
   * @default undefined
   */
  value?: string;

  /**
   * Initial selected option value for an uncontrolled select.
   * @remarks Type `string`.
   * @default First available option (native default)
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
   * @remarks Type `ChangeEventHandler<HTMLSelectElement>`.
   * @default undefined
   */
  onChange?: ChangeEventHandler<HTMLSelectElement>;

  /**
   * Native focus handler called when focus leaves the control.
   * @remarks Type `FocusEventHandler<HTMLSelectElement>`.
   * @default undefined
   */
  onBlur?: FocusEventHandler<HTMLSelectElement>;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLSelectElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLSelectElement>;
}

interface ComboboxOptionProps {
  /**
   * Visible text of this option.
   * @remarks Type `string`.
   * @default None (required)
   */
  children: string;

  /**
   * Value selected and submitted when this option is chosen.
   * @remarks Type `string`.
   * @default None (required)
   */
  value: string;

  /**
   * Makes this option unavailable for selection.
   * @remarks Type `boolean`.
   * @default false
   */
  disabled?: boolean;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLOptionElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLOptionElement>;
}

export type { ComboboxProps, ComboboxOptionProps };
