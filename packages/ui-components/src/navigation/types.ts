import type { ComponentPropsWithRef } from 'react';

import type { ListProps } from '../list/types';

type NavigationProps = Omit<ComponentPropsWithRef<'nav'>, 'role'>;

interface NavigationListProps extends Omit<ListProps, 'as' | 'marker' | 'start' | 'reversed'> {
  /**
   * Sets the layout direction. Horizontal lists wrap when space runs out.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
}

export type { NavigationProps, NavigationListProps };
