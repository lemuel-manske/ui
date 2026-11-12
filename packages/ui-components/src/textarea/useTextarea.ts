import { Size } from '@lemuel-manske/design-tokens';

import { pickProps, cx, useAccessibility } from '@lemuel-manske/utils';

import type { TextareaProps } from './types';

import styles from './Textarea.module.css';

function useTextarea({
  size = Size.MEDIUM,
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
      [styles.small]: size === Size.SMALL,
      [styles.medium]: size === Size.MEDIUM,
      [styles.large]: size === Size.LARGE,
    }),
  };
}

export { useTextarea };
