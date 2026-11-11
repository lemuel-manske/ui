import type { ReactNode } from 'react';

import type { HeadingLevel, HeadingSize, HeadingWeight } from './options';

interface HeadingProps {
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
   * @default Size.MEDIUM
   */
  size?: HeadingSize;

  /**
   * Visual font weight of the heading.
   * @remarks Type `HeadingWeight`.
   * @default Weight.MEDIUM
   */
  weight?: HeadingWeight;

  /**
   * ID applied to the native element for labels, descriptions, and fragment links.
   * @remarks Type `string`.
   * @default undefined
   */
  id?: string;

  /**
   * Additional CSS classes applied to the component root.
   * @remarks Type `string`.
   * @default undefined
   */
  className?: string;
}

export type { HeadingProps };
