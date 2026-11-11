import { Size, Tone, Variant } from '@lemuel-manske/design-tokens';

import { cx, useAccessibility } from '@lemuel-manske/utils';
import type { AccessibilityProperties } from '@lemuel-manske/utils';

import type { ButtonProps } from './types';

import styles from './Button.module.css';

type ButtonElementProps = Omit<ButtonProps, 'size' | 'variant' | 'tone'> &
  AccessibilityProperties & { className: string };

function useButton({
  size = Size.MEDIUM,
  variant = Variant.PRIMARY,
  tone = Tone.DEFAULT,
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
    [styles.small]: size === Size.SMALL,
    [styles.medium]: size === Size.MEDIUM,
    [styles.large]: size === Size.LARGE,

    [styles.primary]: variant === Variant.PRIMARY,
    [styles.secondary]: variant === Variant.SECONDARY,
    [styles.tertiary]: variant === Variant.TERTIARY,
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
