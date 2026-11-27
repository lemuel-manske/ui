import type {
  AriaAttributes,
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  Ref,
} from 'react';

import type { AccessibilityOptions } from '@lemuel-manske/utils';

import type { InputSize, InputType } from './options';

interface InputProps extends AccessibilityOptions {
  /** Visual size of the component. @remarks Type `InputSize`. @default 'medium' */
  size?: InputSize;

  /** Name used for native form submission. @remarks Type `string`. @default undefined */
  name?: string;

  /** Controlled input value. @remarks Type `string`. @default undefined */
  value?: string;

  /** Initial uncontrolled value. @remarks Type `string`. @default undefined */
  defaultValue?: string;

  /** Requires a value for native form submission. @remarks Type `boolean`. @default false */
  required?: boolean;

  /** Marks the value invalid. @remarks Type `boolean`. @default undefined */
  'aria-invalid'?: boolean;

  /** Native browser autofill hint. @remarks Type `string`. @default undefined */
  autoComplete?: string;

  /** Native change handler. @remarks Type `ChangeEventHandler<HTMLInputElement>`. @default undefined */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /** Native blur handler. @remarks Type `FocusEventHandler<HTMLInputElement>`. @default undefined */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /** Native keyboard handler. @remarks Type `KeyboardEventHandler<HTMLInputElement>`. @default undefined */
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;

  /** React ref to the native input. @remarks Type `Ref<HTMLInputElement>`. @default undefined */
  ref?: Ref<HTMLInputElement>;

  /** Native input type. @remarks Type `InputType`. @default 'text' */
  type?: InputType;

  /** Hint shown while the value is empty. @remarks Type `string`. @default undefined */
  placeholder?: string;

  /** Prevents editing while preserving focus. @remarks Type `boolean`. @default false */
  readOnly?: boolean;

  /** Minimum permitted value. @remarks Type `string | number`. @default undefined */
  min?: string | number;

  /** Maximum permitted value. @remarks Type `string | number`. @default undefined */
  max?: string | number;

  /** Allowed increment. @remarks Type `string | number`. @default undefined */
  step?: string | number;

  /** Minimum text length. @remarks Type `number`. @default undefined */
  minLength?: number;

  /** Maximum text length. @remarks Type `number`. @default undefined */
  maxLength?: number;

  /** Native text validation pattern. @remarks Type `string`. @default undefined */
  pattern?: string;

  /** Native input role override for composite controls. @remarks Type `AriaAttributes['role']`. @default undefined */
  role?: AriaAttributes['role'];

  /** Popup suggestion behavior. @remarks Type `AriaAttributes['aria-autocomplete']`. @default undefined */
  'aria-autocomplete'?: AriaAttributes['aria-autocomplete'];

  /** Whether the associated popup is expanded. @remarks Type `boolean`. @default undefined */
  'aria-expanded'?: boolean;

  /** ID of the popup controlled by this input. @remarks Type `string`. @default undefined */
  'aria-controls'?: string;

  /** ID of the currently active popup option. @remarks Type `string`. @default undefined */
  'aria-activedescendant'?: string;
}

export type { InputProps };
