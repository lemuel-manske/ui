import type { TextTone, TextEmphasis, TextSize, TextRole } from './options';

import type { ReactNode } from 'react';

interface TextProps {
  /**
   * Semantic text color, independent of size and emphasis.
   * @remarks Type `TextTone`.
   * @default 'primary'
   */
  tone?: TextTone;

  /**
   * Visual italic emphasis. Load the real italic font face; use em for semantic emphasis.
   * @remarks Type `TextEmphasis`.
   * @default 'normal'
   */
  emphasis?: TextEmphasis;

  /**
   * Text and inline content rendered in the selected native element.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Native HTML element used to render the component.
   * @remarks Type `TextRole`.
   * @default 'p'
   */
  as?: TextRole;

  /**
   * Visual size of the component. This does not change its semantic role.
   * @remarks Type `TextSize`.
   * @default 'medium'
   */
  size?: TextSize;

  /**
   * ID applied to the native element for labels, descriptions, and fragment links.
   * @remarks Type `string`.
   * @default undefined
   */
  id?: string;
}

export type { TextProps };
