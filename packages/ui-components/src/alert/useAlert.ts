import { pickProps, cx } from '@lemuel-manske/utils';

import type { AlertProps } from './types';

import styles from './Alert.module.css';

function useAlert({ urgency = 'polite', ...props }: AlertProps) {
  return {
    ...pickProps(props, ['children', 'id']),
    role: urgency === 'assertive' ? 'alert' : 'status',
    'aria-atomic': true as const,
    className: cx(styles.alert),
  };
}

export { useAlert };
