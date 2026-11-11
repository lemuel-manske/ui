import { Size, Weight } from '@lemuel-manske/design-tokens';

import { pickProps, cx } from '@lemuel-manske/utils';

import type { HeadingProps } from './types';

import styles from './Heading.module.css';

const tagMap = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;

function useHeading({
  level = 2,
  size = Size.MEDIUM,
  weight = Weight.MEDIUM,
  tone,
  emphasis,
  ...props
}: HeadingProps) {
  return {
    Tag: tagMap[level],
    props: {
      ...pickProps(props, ['children', 'id']),
      className: cx(styles.heading, tone && styles[tone], emphasis && styles[emphasis], {
        [styles.xlarge]: size === Size.XLARGE,
        [styles.small]: size === Size.SMALL,
        [styles.medium]: size === Size.MEDIUM,
        [styles.large]: size === Size.LARGE,
        [styles.regular]: weight === Weight.REGULAR,
        [styles.mediumWeight]: weight === Weight.MEDIUM,
        [styles.semibold]: weight === Weight.SEMIBOLD,
        [styles.bold]: weight === Weight.BOLD,
      }),
    },
  };
}

export { useHeading };
