import type { ListMarker, ListElement } from './options';

import type { AriaAttributes, ReactNode } from 'react';

interface ListBaseProps {
  /**
   * ListItem elements forming the list.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Native list element. Use ul for unordered lists and ol for ordered lists.
   * @remarks Type `ListElement`.
   * @default 'ul'
   */
  as?: ListElement;

  /**
   * Starting number for an ordered list. Only available with as="ol".
   * @remarks Type `number`.
   * @default 1 for ol, or the item count for reversed ol (native defaults)
   */
  start?: number;

  /**
   * Counts ordered list items downward. Only available with as="ol".
   * @remarks Type `boolean`.
   * @default false
   */
  reversed?: boolean;

  /**
   * Use default for native bullets or numbering, or none for an unmarked semantic list.
   * @remarks Type `ListMarker`.
   * @default 'default'
   */
  marker?: ListMarker;

  /**
   * ID applied to the native element for labels, descriptions, and fragment links.
   * @remarks Type `string`.
   * @default undefined
   */
  id?: string;

  /**
   * Accessible name supplied as text. Prefer a visible label when one is available.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-label'?: string;

  /**
   * Space-separated IDs of elements that supply the accessible name.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-labelledby'?: string;

  /**
   * Space-separated IDs of elements that describe the component.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-describedby'?: string;
}

type OrderedProps = { as: 'ol'; start?: number; reversed?: boolean };

type UnorderedProps = { as?: 'ul'; start?: never; reversed?: never };

type ListProps = ListBaseProps & (OrderedProps | UnorderedProps);

interface ListItemProps {
  /**
   * Item content, including links, rich content, and nested lists.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Explicit item number when this item belongs to an ordered list.
   * @remarks Type `number`.
   * @default undefined
   */
  value?: number;

  /**
   * ID applied to the native element for labels, descriptions, and fragment links.
   * @remarks Type `string`.
   * @default undefined
   */
  id?: string;

  /**
   * Identifies the current page, location, or item within a related set.
   * @remarks Type `AriaAttributes['aria-current']`.
   * @default undefined
   */
  'aria-current'?: AriaAttributes['aria-current'];
}

export type { ListProps, ListItemProps };
