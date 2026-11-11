import { List } from '../list/List';

import type { TimelineProps, TimelineItemProps } from './types';

import { useTimeline, useTimelineItem } from './useTimeline';

import styles from './Timeline.module.css';

/** Timeline-specific list item with a label, optional details, and current-state marker. */
function TimelineItem(props: TimelineItemProps) {
  const item = useTimelineItem(props);

  return (
    <List.Item {...item.props}>
      <span aria-hidden="true" className={styles.marker} />

      <div className={styles.label}>{item.label}</div>

      {item.children != null && <div className={styles.content}>{item.children}</div>}
    </List.Item>
  );
}

/** Ordered sequence of labeled events with an optional current item. */
function Timeline(props: TimelineProps) {
  const timeline = useTimeline(props);

  return <List {...timeline} as="ol" marker="none" />;
}

Timeline.Item = TimelineItem;

export { Timeline, TimelineItem };
