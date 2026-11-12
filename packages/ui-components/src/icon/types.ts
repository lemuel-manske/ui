import type { MouseEventHandler, ReactElement, Ref } from 'react';

import type { IconSize, IconTone } from './options';

interface IconVisualProps {
  /**
   * One artwork element supplied by the application, such as an SVG component, image, or font icon.
   * @remarks Type `ReactElement`.
   * @default None (required)
   */
  children: ReactElement;

  /**
   * Visual size of the component. This does not change its semantic role.
   * @remarks Type `IconSize`.
   * @default 'medium'
   */
  size?: IconSize;

  /**
   * Semantic status color, independent of the component size or emphasis.
   * @remarks Type `IconTone`.
   * @default 'default'
   */
  tone?: IconTone;
}

interface IconActionProps {
  /**
   * Accessible name describing the action performed by this icon button.
   * @remarks Type `string`.
   * @default None (required)
   */
  label: string;

  /**
   * Native activation handler, including pointer clicks and keyboard activation.
   * @remarks Type `MouseEventHandler<HTMLButtonElement>`.
   * @default None (required)
   */
  onClick: MouseEventHandler<HTMLButtonElement>;

  /**
   * Disables native interaction, keyboard focus, and inclusion in form submission.
   * @remarks Type `boolean`.
   * @default false
   */
  disabled?: boolean;

  /**
   * React ref to the native button rendered for an actionable Icon.
   * @remarks Type `Ref<HTMLButtonElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLButtonElement>;
}

interface IconImageProps {
  /**
   * Accessible name for informative artwork. Omit it to hide decorative artwork from assistive technology.
   * @remarks Type `string`.
   * @default undefined
   */
  label?: string;

  /**
   * Omit for static artwork. Providing an action requires the IconActionProps contract.
   * @remarks Type `never`.
   * @default undefined
   */
  onClick?: never;

  /**
   * Omit for static artwork. Disabled state is supported by actionable icons.
   * @remarks Type `never`.
   * @default undefined
   */
  disabled?: never;

  /**
   * React ref to the span rendered for static artwork.
   * @remarks Type `Ref<HTMLSpanElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLSpanElement>;
}

type IconProps = IconVisualProps & (IconActionProps | IconImageProps);

export type { IconProps, IconVisualProps, IconActionProps, IconImageProps };
