import { pickProps, cx, useAccessibility } from '@lemuel-manske/utils';

import type { FormProps } from './types';

import styles from './Form.module.css';

function useForm({ id, 'aria-label': label, 'aria-labelledby': labelledBy, ...props }: FormProps) {
  const accessibility = useAccessibility({
    id,
    'aria-label': label,
    'aria-labelledby': labelledBy,
  });

  return {
    ...pickProps(props, [
      'children',
      'action',
      'method',
      'autoComplete',
      'noValidate',
      'onSubmit',
      'onReset',
      'ref',
    ]),
    ...accessibility,
    className: cx(styles.form),
  };
}

export { useForm };
