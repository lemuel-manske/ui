import type { TimelineOrientation } from './options';

import type { ReactNode } from 'react';

interface TimelineProps {
  /**
   * Timeline.Item elements presented in sequence.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Accessible name describing the timeline or sequence.
   * @remarks Type `string`.
   * @default None (required)
   */
  'aria-label': string;

  /**
   * Direction used to lay out the items.
   * @remarks Type `TimelineOrientation`.
   * @default 'vertical'
   */
  orientation?: TimelineOrientation;
}

interface TimelineItemProps {
  /**
   * Visible item heading or timestamp. Rich content such as a link is supported.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  label: ReactNode;

  /**
   * Optional detail content rendered below the item label.
   * @remarks Type `ReactNode`.
   * @default undefined
   */
  children?: ReactNode;

  /**
   * Marks this timeline item as current and exposes aria-current on the item.
   * @remarks Type `boolean`.
   * @default false
   */
  current?: boolean;
}

export type { TimelineProps, TimelineItemProps };
