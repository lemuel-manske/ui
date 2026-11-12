import type { HeadingTone, HeadingEmphasis } from './options';

import type { ReactNode } from 'react';

import type { HeadingLevel, HeadingSize, HeadingWeight } from './options';

interface HeadingProps {
  /**
   * Semantic text color, independent of size and emphasis.
   * @remarks Type `HeadingTone`.
   * @default 'primary'
   */
  tone?: HeadingTone;

  /**
   * Visual italic emphasis. Load the real italic font face; use em for semantic emphasis.
   * @remarks Type `HeadingEmphasis`.
   * @default 'normal'
   */
  emphasis?: HeadingEmphasis;

  /**
   * Heading text and inline content. The heading supplies its native semantic level.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Semantic heading level. Choose it from the document hierarchy independently of visual size.
   * @remarks Type `HeadingLevel`.
   * @default 2
   */
  level?: HeadingLevel;

  /**
   * Visual size of the component. This does not change its semantic role.
   * @remarks Type `HeadingSize`.
   * @default 'medium'
   */
  size?: HeadingSize;

  /**
   * Visual font weight of the heading.
   * @remarks Type `HeadingWeight`.
   * @default 'medium'
   */
  weight?: HeadingWeight;

  /**
   * ID applied to the native element for labels, descriptions, and fragment links.
   * @remarks Type `string`.
   * @default undefined
   */
  id?: string;
}

export type { HeadingProps };
