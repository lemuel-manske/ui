import { Size } from '@lemuel-manske/design-tokens';

import { cx } from '@lemuel-manske/utils';

import { SpinnerLabelVisibility } from './options';

import type { SpinnerProps } from './types';

import styles from './Spinner.module.css';

function useSpinner({
  label = 'Loading',
  size = Size.MEDIUM,
  labelVisibility = SpinnerLabelVisibility.HIDDEN,
}: SpinnerProps) {
  return {
    label,
    labelClassName: labelVisibility === SpinnerLabelVisibility.HIDDEN ? styles.label : undefined,
    className: cx(styles.spinner, {
      [styles.small]: size === Size.SMALL,
      [styles.medium]: size === Size.MEDIUM,
      [styles.large]: size === Size.LARGE,
    }),
  };
}

export { useSpinner };
