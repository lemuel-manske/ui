import type { ReactNode } from 'react';

interface TimelineProps {
  children: ReactNode;

  'aria-label': string;

  orientation?: 'vertical' | 'horizontal';

  className?: string;
}

interface TimelineItemProps {
  label: ReactNode;

  children?: ReactNode;

  current?: boolean;

  className?: string;
}

export type { TimelineProps, TimelineItemProps };
