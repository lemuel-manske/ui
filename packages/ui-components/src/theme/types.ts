import type { ReactNode } from 'react';

import type { DesignTokens } from '@lemuel-manske/design-tokens';

interface ThemeProps {
  /**
   * Application content that inherits the supplied semantic token theme.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Complete semantic design token contract applied to descendants. Provided presets include archiveTheme and libraryTheme.
   * @remarks Type `DesignTokens`.
   * @default None (required)
   */
  theme: DesignTokens;
}

export type { ThemeProps };
