import type { AriaAttributes, MouseEventHandler, ReactElement, Ref } from 'react';

import type { IconVisualProps } from '../icon/types';

import type { AccessibilityOptions } from '@lemuel-manske/utils';

import type { ButtonSize, ButtonVariant, ButtonTone, ButtonType } from './options';

interface ButtonLabelProps {
  /**
   * Text rendered in the button-specific label span.
   * @remarks Type `string`.
   * @default None (required)
   */
  children: string;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLSpanElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLSpanElement>;
}

type ButtonPart = string | ReactElement<ButtonLabelProps> | ReactElement<IconVisualProps>;

type ButtonContent = ButtonPart | readonly (ButtonPart | false | null | undefined)[];

interface ButtonProps extends AccessibilityOptions {
  /**
   * Button text, Button.Label, and decorative Icon elements. Icon-only buttons need an accessible name.
   * @remarks Type `ButtonContent`.
   * @default None (required)
   */
  children: ButtonContent;

  /**
   * Visual size of the component. This does not change its semantic role.
   * @remarks Type `ButtonSize`.
   * @default Size.MEDIUM
   */
  size?: ButtonSize;

  /**
   * Visual emphasis. PRIMARY is filled, SECONDARY is outlined, and TERTIARY has reduced emphasis.
   * @remarks Type `ButtonVariant`.
   * @default Variant.PRIMARY
   */
  variant?: ButtonVariant;

  /**
   * Semantic status color, independent of the component size or emphasis.
   * @remarks Type `ButtonTone`.
   * @default Tone.DEFAULT
   */
  tone?: ButtonTone;

  /**
   * Reports whether content controlled by this button is expanded.
   * @remarks Type `AriaAttributes['aria-expanded']`.
   * @default undefined
   */
  'aria-expanded'?: AriaAttributes['aria-expanded'];

  /**
   * ID or space-separated IDs of content controlled by this button.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-controls'?: string;

  /**
   * Identifies the kind of popup opened by the button.
   * @remarks Type `AriaAttributes['aria-haspopup']`.
   * @default undefined
   */
  'aria-haspopup'?: AriaAttributes['aria-haspopup'];

  /**
   * Checked state for a toggle button. Omit for an ordinary action button.
   * @remarks Type `AriaAttributes['aria-pressed']`.
   * @default undefined
   */
  'aria-pressed'?: AriaAttributes['aria-pressed'];

  /**
   * Native button behavior. Use submit for form submission and reset to reset an enclosing form.
   * @remarks Type `ButtonType`.
   * @default 'button'
   */
  type?: ButtonType;

  /**
   * Name used when the control contributes a value to native form submission.
   * @remarks Type `string`.
   * @default undefined
   */
  name?: string;

  /**
   * Value submitted with name when this button submits its enclosing form.
   * @remarks Type `string`.
   * @default undefined
   */
  value?: string;

  /**
   * Native activation handler, including pointer clicks and keyboard activation.
   * @remarks Type `MouseEventHandler<HTMLButtonElement>`.
   * @default undefined
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLButtonElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLButtonElement>;
}

export type { ButtonProps, ButtonContent, ButtonLabelProps };
