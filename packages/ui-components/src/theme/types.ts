import type { ReactNode } from 'react';

import type { DesignTokens } from '@lemuel-manske/design-tokens';

interface ThemeProps {
  /** Application UI that inherits this theme's semantic CSS variables. */
  children: ReactNode;

  /** Complete DesignTokens contract; archiveTheme and libraryTheme are provided presets. */
  theme: DesignTokens;
}

export type { ThemeProps };
