import { Size } from '@lemuel-manske/design-tokens';

import { cx, useAccessibility } from '@lemuel-manske/utils';

import { ComboboxAppearance } from './options';

import type { ComboboxProps } from './types';

import styles from './Combobox.module.css';

function useCombobox({
  size = Size.MEDIUM,
  appearance = ComboboxAppearance.CUSTOM,
  className,
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
    ...props,
    ...accessibility,
    disabled,
    className: cx(styles.combobox, className, {
      [styles.small]: size === Size.SMALL,
      [styles.medium]: size === Size.MEDIUM,
      [styles.large]: size === Size.LARGE,
      [styles.custom]: appearance === ComboboxAppearance.CUSTOM,
    }),
  };
}

export { useCombobox };
