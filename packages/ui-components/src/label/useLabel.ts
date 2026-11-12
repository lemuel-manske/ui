import { cx, useAccessibility } from '@lemuel-manske/utils';
import type { AccessibilityProperties } from '@lemuel-manske/utils';

import type { LabelProps } from './types';

import styles from './Label.module.css';

type LabelElementProps = Omit<LabelProps, 'size' | 'tone'> &
  AccessibilityProperties & { className: string };

function useLabel({
  size = 'medium',
  tone = 'default',
  id,
  htmlFor,
  children,
  ref,
}: LabelProps): LabelElementProps {
  const accessibility = useAccessibility({ id });

  const classes = cx(styles.label, styles[tone], {
    [styles.small]: size === 'small',
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large',
  });

  return { ...accessibility, htmlFor, children, ref, className: classes };
}

export { useLabel };
