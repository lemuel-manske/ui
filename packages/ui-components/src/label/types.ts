import type { ReactElement, Ref } from 'react';

import type { LabelSize, LabelTone } from './options';
import type { IconProps } from '../icon/types';

type LabelContent = string | readonly [ReactElement<IconProps>, string] | ReactElement<IconProps>;

interface LabelProps {
  /**
   * Label text, an Icon followed by text, or an informative Icon supplying the label name.
   * @remarks Type `LabelContent`.
   * @default None (required)
   */
  children: LabelContent;

  /**
   * Visual size of the component. This does not change its semantic role.
   * @remarks Type `LabelSize`.
   * @default 'medium'
   */
  size?: LabelSize;

  /**
   * Semantic status color, independent of the component size or emphasis.
   * @remarks Type `LabelTone`.
   * @default 'default'
   */
  tone?: LabelTone;

  /**
   * ID applied to the native element for labels, descriptions, and fragment links.
   * @remarks Type `string`.
   * @default Generated with React.useId()
   */
  id?: string;

  /**
   * ID of the form control named and focused by this label.
   * @remarks Type `string`.
   * @default undefined
   */
  htmlFor?: string;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLLabelElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLLabelElement>;
}

export type { LabelProps, LabelContent };
