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
  size = 'medium',
  weight = 'medium',
  tone,
  emphasis,
  ...props
}: HeadingProps) {
  return {
    Tag: tagMap[level],
    props: {
      ...pickProps(props, ['children', 'id']),
      className: cx(styles.heading, tone && styles[tone], emphasis && styles[emphasis], {
        [styles.xlarge]: size === 'xlarge',
        [styles.small]: size === 'small',
        [styles.medium]: size === 'medium',
        [styles.large]: size === 'large',
        [styles.regular]: weight === 'regular',
        [styles.mediumWeight]: weight === 'medium',
        [styles.semibold]: weight === 'semibold',
        [styles.bold]: weight === 'bold',
      }),
    },
  };
}

export { useHeading };
