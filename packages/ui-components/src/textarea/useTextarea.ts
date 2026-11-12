import { pickProps, cx, useAccessibility } from '@lemuel-manske/utils';

import type { TextareaProps } from './types';

import styles from './Textarea.module.css';

function useTextarea({
  size = 'medium',
  rows = 4,
  id,
  disabled = false,
  'aria-label': label,
  'aria-labelledby': labelledBy,
  'aria-describedby': describedBy,
  ...props
}: TextareaProps) {
  const accessibility = useAccessibility({
    id,
    disabled,
    'aria-label': label,
    'aria-labelledby': labelledBy,
    'aria-describedby': describedBy,
  });

  return {
    ...pickProps(props, [
      'name',
      'value',
      'defaultValue',
      'required',
      'aria-invalid',
      'autoComplete',
      'onChange',
      'onBlur',
      'ref',
      'placeholder',
      'readOnly',
      'minLength',
      'maxLength',
    ]),
    ...accessibility,
    rows,
    disabled,
    className: cx(styles.textarea, {
      [styles.small]: size === 'small',
      [styles.medium]: size === 'medium',
      [styles.large]: size === 'large',
    }),
  };
}

export { useTextarea };
