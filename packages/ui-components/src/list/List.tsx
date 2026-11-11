import type { ListProps, ListItemProps } from './types';

import { useList, useListItem } from './useList';

/** One list entry, including rich content or nested lists. */
function ListItem(props: ListItemProps) {
  const item = useListItem(props);

  return <li {...item} />;
}

/** Semantic ordered or unordered list with optional native markers. */
function List(props: ListProps) {
  const { Tag, props: elementProps } = useList(props);

  return <Tag {...elementProps} />;
}

List.Item = ListItem;

export { List, ListItem };
