import { pickProps, cx, useAccessibility } from '@lemuel-manske/utils';

import type { CheckboxProps } from './types';

import styles from './Checkbox.module.css';

function useCheckbox({
  children,
  id,
  disabled = false,
  'aria-label': label,
  'aria-labelledby': labelledBy,
  'aria-describedby': describedBy,
  ...props
}: CheckboxProps) {
  const accessibility = useAccessibility({
    id,
    disabled,
    'aria-label': label,
    'aria-labelledby': labelledBy,
    'aria-describedby': describedBy,
  });

  return {
    children,
    className: cx(styles.checkbox),
    input: {
      ...pickProps(props, [
        'name',
        'value',
        'checked',
        'defaultChecked',
        'required',
        'aria-invalid',
        'onChange',
        'ref',
      ]),
      ...accessibility,
      disabled,
      type: 'checkbox' as const,
    },
  };
}

export { useCheckbox };
