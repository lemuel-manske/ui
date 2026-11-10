import type { ReactNode } from 'react';

import type { DesignTokens } from '@lkmliz/design-tokens';

interface ThemeProps {
  children: ReactNode;

  theme: DesignTokens;
}

export type { ThemeProps };
