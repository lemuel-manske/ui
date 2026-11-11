import type { NavigationOrientation } from './options';

import type { ComponentPropsWithRef } from 'react';

import type { ListProps } from '../list/types';

/**
 * Native nav attributes and event handlers, with the navigation landmark supplied by the element.
 * Native attributes use React's types and browser defaults. The role is fixed by the native nav.
 */
interface NavigationProps extends Omit<ComponentPropsWithRef<'nav'>, 'role'> {
  /**
   * Links, Navigation.List, or custom navigation markup. Native nav attributes and event handlers are forwarded.
   * @remarks Type `ComponentPropsWithRef<'nav'>['children']`.
   * @default undefined
   */
  children?: ComponentPropsWithRef<'nav'>['children'];

  /**
   * ID applied to the native element for labels, descriptions, and fragment links.
   * @remarks Type `string`.
   * @default undefined
   */
  id?: string;

  /**
   * Additional CSS classes applied to the native nav landmark.
   * @remarks Type `string`.
   * @default undefined
   */
  className?: string;

  /**
   * Inline styles applied to the native navigation element.
   * @remarks Type `ComponentPropsWithRef<'nav'>['style']`.
   * @default undefined
   */
  style?: ComponentPropsWithRef<'nav'>['style'];

  /**
   * React ref to the native nav element.
   * @remarks Type `ComponentPropsWithRef<'nav'>['ref']`.
   * @default undefined
   */
  ref?: ComponentPropsWithRef<'nav'>['ref'];

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

interface NavigationListProps extends Omit<ListProps, 'as' | 'marker' | 'start' | 'reversed'> {
  /**
   * Horizontal wraps links onto additional rows when needed. Vertical stacks the items.
   * @remarks Type `NavigationOrientation`.
   * @default 'horizontal'
   */
  orientation?: NavigationOrientation;
}

export type { NavigationProps, NavigationListProps };
