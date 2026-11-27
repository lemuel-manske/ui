import { pickProps, cx } from '@lemuel-manske/utils';

import type { ListProps, ListItemProps } from './types';

import styles from './List.module.css';

function useList({ as = 'ul', marker = 'default', ...props }: ListProps) {
  return {
    Tag: as,
    props: {
      ...pickProps(props, [
        'children',
        'start',
        'reversed',
        'id',
        'aria-label',
        'aria-labelledby',
        'aria-describedby',
      ]),
      role: props.role ?? (marker === 'none' ? ('list' as const) : undefined),
      className: cx(styles.list, {
        [styles.unmarked]: marker === 'none',
      }, props.className),
    },
  };
}

function useListItem(props: ListItemProps) {
  return {
    ...pickProps(props, [
      'children',
      'value',
      'id',
      'role',
      'aria-current',
      'aria-selected',
      'onMouseMove',
      'onClick',
      'onMouseDown',
    ]),
    className: cx(styles.item, props.className),
  };
}

export { useList, useListItem };
