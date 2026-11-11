import { Size } from '@lemuel-manske/design-tokens';

import { pickProps, cx, useAccessibility } from '@lemuel-manske/utils';

import type { InputProps } from './types';

import styles from './Input.module.css';

function useInput({
  size = Size.MEDIUM,
  id,
  disabled = false,
  'aria-label': label,
  'aria-labelledby': labelledBy,
  'aria-describedby': describedBy,
  ...props
}: InputProps) {
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
      'type',
      'placeholder',
      'readOnly',
      'min',
      'max',
      'step',
      'minLength',
      'maxLength',
      'pattern',
    ]),
    ...accessibility,
    disabled,
    className: cx(styles.input, {
      [styles.small]: size === Size.SMALL,
      [styles.medium]: size === Size.MEDIUM,
      [styles.large]: size === Size.LARGE,
    }),
  };
}

export { useInput };
