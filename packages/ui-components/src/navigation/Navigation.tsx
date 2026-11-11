import { pickProps, cx } from '@lemuel-manske/utils';

import { useList } from '../list/useList';
import type { NavigationListProps, NavigationProps } from './types';

import styles from './Navigation.module.css';

/** Unmarked navigation list with wrapping horizontal or stacked vertical layout. */
function NavigationList({ orientation = 'horizontal', ...props }: NavigationListProps) {
  const { Tag, props: list } = useList({
    ...pickProps(props, ['children', 'id', 'aria-label', 'aria-labelledby', 'aria-describedby']),
    marker: 'none',
  });

  return <Tag {...list} className={cx(list.className, styles.list, styles[orientation])} />;
}

/** Native navigation landmark with explicit naming, language, and disclosure properties. */
function Navigation(props: NavigationProps) {
  return (
    <nav
      {...pickProps(props, [
        'children',
        'id',
        'lang',
        'dir',
        'hidden',
        'tabIndex',
        'onKeyDown',
        'onFocus',
        'onBlur',
        'onClick',
        'ref',
        'aria-label',
        'aria-labelledby',
        'aria-describedby',
      ])}
    />
  );
}

Navigation.List = NavigationList;

export { Navigation, NavigationList };
