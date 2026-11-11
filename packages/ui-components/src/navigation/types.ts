import type { NavigationOrientation } from './options';

import type {
  ComponentPropsWithRef,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

import type { ListProps } from '../list/types';

interface NavigationProps {
  /**
   * Links, Navigation.List, and custom navigation content.
   * @remarks Type `ComponentPropsWithRef<'nav'>['children']`.
   * @default undefined
   */
  children?: ComponentPropsWithRef<'nav'>['children'];

  /**
   * ID used for descriptions and disclosure relationships.
   * @remarks Type `string`.
   * @default undefined
   */
  id?: string;

  /**
   * Language of the navigation content.
   * @remarks Type `string`.
   * @default Inherited from the document
   */
  lang?: string;

  /**
   * Reading direction of the navigation content.
   * @remarks Type `'ltr' | 'rtl' | 'auto'`.
   * @default Inherited from the document
   */
  dir?: 'ltr' | 'rtl' | 'auto';

  /**
   * Hides a collapsed navigation region using native hidden behavior.
   * @remarks Type `boolean`.
   * @default false
   */
  hidden?: boolean;

  /**
   * Keyboard focus order; use -1 for a programmatically focused landmark.
   * @remarks Type `number`.
   * @default undefined (native navigation behavior)
   */
  tabIndex?: number;

  /**
   * Keyboard handler for navigation-specific interactions.
   * @remarks Type `KeyboardEventHandler<HTMLElement>`.
   * @default undefined
   */
  onKeyDown?: KeyboardEventHandler<HTMLElement>;

  /**
   * Handler for focus entering the landmark or its descendants.
   * @remarks Type `FocusEventHandler<HTMLElement>`.
   * @default undefined
   */
  onFocus?: FocusEventHandler<HTMLElement>;

  /**
   * Handler for focus leaving the landmark or its descendants.
   * @remarks Type `FocusEventHandler<HTMLElement>`.
   * @default undefined
   */
  onBlur?: FocusEventHandler<HTMLElement>;

  /**
   * Native click handler for delegated navigation interactions.
   * @remarks Type `MouseEventHandler<HTMLElement>`.
   * @default undefined
   */
  onClick?: MouseEventHandler<HTMLElement>;

  /**
   * Ref to the native navigation landmark.
   * @remarks Type `ComponentPropsWithRef<'nav'>['ref']`.
   * @default undefined
   */
  ref?: ComponentPropsWithRef<'nav'>['ref'];

  /**
   * Accessible landmark name.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-label'?: string;

  /**
   * IDs of elements naming this landmark.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-labelledby'?: string;

  /**
   * IDs of elements describing this landmark.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-describedby'?: string;
}

interface NavigationListProps extends Omit<ListProps, 'as' | 'marker' | 'start' | 'reversed'> {
  /**
   * Horizontal wraps links onto additional rows when needed. Vertical stacks the items.
   * @remarks Type `NavigationOrientation`.
   * @default 'horizontal'
   */
  orientation?: NavigationOrientation;
}

export type { NavigationProps, NavigationListProps };
