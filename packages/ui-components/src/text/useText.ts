import { pickProps, cx } from '@lemuel-manske/utils';

import type { TextProps } from './types';

import styles from './Text.module.css';

function useText({ as = 'p', size = 'medium', tone, emphasis, ...props }: TextProps) {
  return {
    Tag: as,
    props: {
      ...pickProps(props, ['children', 'id']),
      className: cx(styles.text, tone && styles[tone], emphasis && styles[emphasis], {
        [styles.small]: size === 'small',
        [styles.medium]: size === 'medium',
        [styles.large]: size === 'large',
      }),
    },
  };
}

export { useText };
