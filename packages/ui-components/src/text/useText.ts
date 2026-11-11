import { Size } from '@lemuel-manske/design-tokens';

import { pickProps, cx } from '@lemuel-manske/utils';

import type { TextProps } from './types';

import styles from './Text.module.css';

function useText({ as = 'p', size = Size.MEDIUM, tone, emphasis, ...props }: TextProps) {
  return {
    Tag: as,
    props: {
      ...pickProps(props, ['children', 'id']),
      className: cx(styles.text, tone && styles[tone], emphasis && styles[emphasis], {
        [styles.small]: size === Size.SMALL,
        [styles.medium]: size === Size.MEDIUM,
        [styles.large]: size === Size.LARGE,
      }),
    },
  };
}

export { useText };
