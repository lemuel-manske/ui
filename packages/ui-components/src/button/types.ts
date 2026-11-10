import type { MouseEventHandler, ReactNode, Ref } from 'react';

import type { AccessibilityOptions } from '@lemuel-manske/utils';

import type { ButtonSize, ButtonVariant } from './options';

interface ButtonProps extends AccessibilityOptions {
  /** Visible content or compound parts such as Button.Label. Provide an accessible name. */
  children: ReactNode;

  /** Control size. Defaults to ButtonSize.MEDIUM. */
  size?: ButtonSize;

  /** Visual emphasis. Defaults to ButtonVariant.PRIMARY. */
  variant?: ButtonVariant;

  /** Native button behavior. Defaults to 'button'; set 'submit' explicitly in forms. */
  type?: 'button' | 'submit' | 'reset';

  className?: string;

  name?: string;

  value?: string;

  onClick?: MouseEventHandler<HTMLButtonElement>;

  ref?: Ref<HTMLButtonElement>;
}

export type { ButtonProps };
