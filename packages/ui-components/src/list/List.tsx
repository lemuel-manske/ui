import type { ListProps, ListItemProps } from './types';

import { useList, useListItem } from './useList';

function ListItem(props: ListItemProps) {
  const item = useListItem(props);

  return <li {...item} />;
}

function List(props: ListProps) {
  const { Tag, props: elementProps } = useList(props);

  return <Tag {...elementProps} />;
}

List.Item = ListItem;

export { List, ListItem };
