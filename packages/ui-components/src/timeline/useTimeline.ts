import { pickProps, cx } from '@lemuel-manske/utils';

import type { TimelineProps, TimelineItemProps } from './types';

import styles from './Timeline.module.css';

function useTimeline({ orientation = 'vertical', ...props }: TimelineProps) {
  return {
    ...pickProps(props, ['children', 'aria-label']),
    'data-orientation': orientation,
    className: cx(styles.timeline),
  };
}

function useTimelineItem({ label, children, current = false }: TimelineItemProps) {
  return {
    label,
    children,
    props: {
      'aria-current': current || undefined,
      className: cx(styles.item),
    },
  };
}

export { useTimeline, useTimelineItem };
