import { cx } from '@lemuel-manske/utils';

import { List } from '../list/List';

import type { NavigationListProps, NavigationProps } from './types';

import styles from './Navigation.module.css';

/** Unmarked navigation list with wrapping horizontal or stacked vertical layout. */
function NavigationList({ orientation = 'horizontal', className, ...props }: NavigationListProps) {
  return (
    <List {...props} marker="none" className={cx(styles.list, styles[orientation], className)} />
  );
}

/** Native navigation landmark accepting custom markup and native attributes. */
function Navigation(props: NavigationProps) {
  return <nav {...props} />;
}

Navigation.List = NavigationList;

export { Navigation, NavigationList };
