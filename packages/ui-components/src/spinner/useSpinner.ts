import { Size } from '@lemuel-manske/design-tokens';

import { cx } from '@lemuel-manske/utils';

import type { SpinnerProps } from './types';

import styles from './Spinner.module.css';

function useSpinner({ label = 'Loading', size = Size.MEDIUM, className }: SpinnerProps) {
  return {
    label,
    className: cx(styles.spinner, className, {
      [styles.small]: size === Size.SMALL,
      [styles.medium]: size === Size.MEDIUM,
      [styles.large]: size === Size.LARGE,
    }),
  };
}

export { useSpinner };
