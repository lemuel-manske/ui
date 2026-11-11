import { cx } from '@lemuel-manske/utils';

import { List, ListItem } from '../list/List';

import type { NavigationListProps, NavigationProps } from './types';

import styles from './Navigation.module.css';

function NavigationList({ orientation = 'horizontal', className, ...props }: NavigationListProps) {
  return (
    <List {...props} marker="none" className={cx(styles.list, styles[orientation], className)} />
  );
}

function Navigation(props: NavigationProps) {
  return <nav {...props} />;
}

Navigation.List = NavigationList;

Navigation.Item = ListItem;

export { Navigation, NavigationList };
