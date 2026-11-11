import { Size } from '@lemuel-manske/design-tokens';

import { cx, useAccessibility } from '@lemuel-manske/utils';

import type { TextareaProps } from './types';

import styles from './Textarea.module.css';

function useTextarea({
  size = Size.MEDIUM,
  className,
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
    ...props,
    ...accessibility,
    disabled,
    className: cx(styles.textarea, className, {
      [styles.small]: size === Size.SMALL,
      [styles.medium]: size === Size.MEDIUM,
      [styles.large]: size === Size.LARGE,
    }),
  };
}

export { useTextarea };
