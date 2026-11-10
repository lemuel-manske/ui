import { cx } from '@lemuel-manske/utils';

import type { TimelineProps, TimelineItemProps } from './types';

import styles from './Timeline.module.css';

function useTimeline({ orientation = 'vertical', className, ...props }: TimelineProps) {
  return {
    ...props,
    'data-orientation': orientation,
    className: cx(styles.timeline, className),
  };
}

function useTimelineItem({ label, children, current = false, className }: TimelineItemProps) {
  return {
    label,
    children,
    props: {
      'aria-current': current || undefined,
      className: cx(styles.item, className),
    },
  };
}

export { useTimeline, useTimelineItem };
