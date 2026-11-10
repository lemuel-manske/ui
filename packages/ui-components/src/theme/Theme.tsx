import type { CSSProperties } from 'react';

import type { ThemeProps } from './types';

import styles from './Theme.module.css';

function Theme({ children, theme }: ThemeProps) {
  const style = Object.fromEntries(
    Object.entries(theme).flatMap(([group, tokens]) =>
      Object.entries(tokens).map(([name, value]) => [`--ui-${group}-${name}`, value]),
    ),
  ) as CSSProperties;

  return (
    <div className={styles.theme} style={style}>
      {children}
    </div>
  );
}

export { Theme };
