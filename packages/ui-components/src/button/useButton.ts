import { cx, useAccessibility } from '@lemuel-manske/utils';
import type { AccessibilityProperties } from '@lemuel-manske/utils';

import type { ButtonProps } from './types';

import styles from './Button.module.css';

type ButtonElementProps = Omit<ButtonProps, 'size' | 'variant' | 'tone'> &
  AccessibilityProperties & { className: string };

function useButton({
  size = 'medium',
  variant = 'primary',
  tone = 'default',
  type = 'button',
  children,
  onClick,
  ref,
  name,
  value,
  'aria-expanded': expanded,
  'aria-controls': controls,
  'aria-haspopup': hasPopup,
  'aria-pressed': pressed,
  ...accessibilityOptions
}: ButtonProps): ButtonElementProps {
  const accessibility = useAccessibility(accessibilityOptions);

  const classes = cx(styles.button, styles[tone], {
    [styles.small]: size === 'small',
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large',

    [styles.primary]: variant === 'primary',
    [styles.secondary]: variant === 'secondary',
    [styles.tertiary]: variant === 'tertiary',
  });

  return {
    ...accessibility,
    children,
    type,
    onClick,
    ref,
    name,
    value,
    'aria-expanded': expanded,
    'aria-controls': controls,
    'aria-haspopup': hasPopup,
    'aria-pressed': pressed,
    disabled: accessibilityOptions.disabled ?? false,
    className: classes,
  };
}

export { useButton };
