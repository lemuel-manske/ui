import type { ReactNode } from 'react';

import type { DesignTokens } from '@lemuel-manske/design-tokens';

interface ThemeProps {
  children: ReactNode;

  theme: DesignTokens;
}

export type { ThemeProps };
