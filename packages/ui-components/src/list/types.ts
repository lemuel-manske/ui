import type { AriaAttributes, ReactNode } from 'react';

interface ListBaseProps {
  children: ReactNode;

  marker?: 'default' | 'none';

  id?: string;

  className?: string;

  'aria-label'?: string;

  'aria-labelledby'?: string;

  'aria-describedby'?: string;
}

type ListProps = ListBaseProps &
  (
    | { as?: 'ul'; start?: never; reversed?: never }
    | { as: 'ol'; start?: number; reversed?: boolean }
  );

interface ListItemProps {
  children: ReactNode;

  value?: number;

  id?: string;

  className?: string;

  'aria-current'?: AriaAttributes['aria-current'];
}

export type { ListProps, ListItemProps };
