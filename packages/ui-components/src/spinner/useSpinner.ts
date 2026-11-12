import { cx } from '@lemuel-manske/utils';

import type { SpinnerProps } from './types';

import styles from './Spinner.module.css';

function useSpinner({ label = 'Loading', size = 'medium', labelHidden = true }: SpinnerProps) {
  return {
    label,
    labelClassName: labelHidden ? styles.label : undefined,
    className: cx(styles.spinner, {
      [styles.small]: size === 'small',
      [styles.medium]: size === 'medium',
      [styles.large]: size === 'large',
    }),
  };
}

export { useSpinner };
