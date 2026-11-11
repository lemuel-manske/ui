import { Size } from '@lemuel-manske/design-tokens';

import { pickProps, cx, useAccessibility } from '@lemuel-manske/utils';

import { ComboboxAppearance } from './options';

import type { ComboboxProps } from './types';

import styles from './Combobox.module.css';

function useCombobox({
  size = Size.MEDIUM,
  appearance = ComboboxAppearance.CUSTOM,
  id,
  disabled = false,
  'aria-label': label,
  'aria-labelledby': labelledBy,
  'aria-describedby': describedBy,
  ...props
}: ComboboxProps) {
  const accessibility = useAccessibility({
    id,
    disabled,
    'aria-label': label,
    'aria-labelledby': labelledBy,
    'aria-describedby': describedBy,
  });

  return {
    ...pickProps(props, [
      'children',
      'name',
      'value',
      'defaultValue',
      'required',
      'aria-invalid',
      'autoComplete',
      'onChange',
      'onBlur',
      'ref',
    ]),
    ...accessibility,
    disabled,
    className: cx(styles.combobox, {
      [styles.small]: size === Size.SMALL,
      [styles.medium]: size === Size.MEDIUM,
      [styles.large]: size === Size.LARGE,
      [styles.custom]: appearance === ComboboxAppearance.CUSTOM,
    }),
  };
}

export { useCombobox };
