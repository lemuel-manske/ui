import { cx } from '@lemuel-manske/utils';

import type { ListProps, ListItemProps } from './types';

import styles from './List.module.css';

function useList({ as = 'ul', marker = 'default', className, ...props }: ListProps) {
  return {
    Tag: as,
    props: {
      ...props,
      role: marker === 'none' ? ('list' as const) : undefined,
      className: cx(styles.list, className, {
        [styles.unmarked]: marker === 'none',
      }),
    },
  };
}

function useListItem({ className, ...props }: ListItemProps) {
  return {
    ...props,
    className: cx(styles.item, className),
  };
}

export { useList, useListItem };
