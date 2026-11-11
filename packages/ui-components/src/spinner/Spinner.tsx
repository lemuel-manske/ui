import type { SpinnerProps } from './types';

import { useSpinner } from './useSpinner';

import styles from './Spinner.module.css';

/** Loading indicator with a localized status message for assistive technology. */
function Spinner(props: SpinnerProps) {
  const spinner = useSpinner(props);

  return (
    <span role="status" className={spinner.className}>
      <span className={styles.ring} aria-hidden="true" />

      <span className={styles.label}>{spinner.label}</span>
    </span>
  );
}

export { Spinner };
