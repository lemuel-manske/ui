import { Size, Tone } from '@lemuel-manske/design-tokens';

import { cx, useAccessibility } from '@lemuel-manske/utils';
import type { AccessibilityProperties } from '@lemuel-manske/utils';

import type { LabelProps } from './types';

import styles from './Label.module.css';

type LabelElementProps = Omit<LabelProps, 'size' | 'tone'> & AccessibilityProperties;

function useLabel({
  size = Size.MEDIUM,
  tone = Tone.DEFAULT,
  className,
  id,
  htmlFor,
  children,
  ref,
}: LabelProps): LabelElementProps {
  const accessibility = useAccessibility({ id });

  const classes = cx(styles.label, styles[tone], className, {
    [styles.small]: size === Size.SMALL,
    [styles.medium]: size === Size.MEDIUM,
    [styles.large]: size === Size.LARGE,
  });

  return { ...accessibility, htmlFor, children, ref, className: classes };
}

export { useLabel };
