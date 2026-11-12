import { cx } from '@lemuel-manske/utils';

import type { IconProps } from './types';

import styles from './Icon.module.css';

/** Displays a client-supplied icon. An onClick and label turn it into a native button. */
function Icon(props: IconProps) {
  const { children, label, size = 'medium', tone = 'default' } = props;

  const classes = cx(styles.icon, styles[size], styles[tone]);

  const artwork = (
    <span className={styles.artwork} aria-hidden="true">
      {children}
    </span>
  );

  if (props.onClick) {
    return (
      <button
        type="button"
        className={cx(classes, styles.action)}
        aria-label={label}
        disabled={props.disabled}
        onClick={props.onClick}
        ref={props.ref}
      >
        {artwork}
      </button>
    );
  }

  return (
    <span
      className={classes}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      ref={props.ref}
    >
      {artwork}
    </span>
  );
}

export { Icon };
