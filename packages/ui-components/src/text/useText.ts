import { Size } from '@lemuel-manske/design-tokens';

import { cx } from '@lemuel-manske/utils';

import type { TextProps } from './types';

import styles from './Text.module.css';

function useText({ as = 'p', size = Size.MEDIUM, className, ...props }: TextProps) {
  return {
    Tag: as,
    props: {
      ...props,
      className: cx(styles.text, className, {
        [styles.small]: size === Size.SMALL,
        [styles.medium]: size === Size.MEDIUM,
        [styles.large]: size === Size.LARGE,
      }),
    },
  };
}

export { useText };
