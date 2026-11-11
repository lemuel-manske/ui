import { Size, Weight } from '@lemuel-manske/design-tokens';

import { pickProps, cx } from '@lemuel-manske/utils';

import { FieldsetAppearance } from './options';

import type { FieldsetProps, LegendProps } from './types';

import styles from './Fieldset.module.css';

function useFieldset({ appearance = FieldsetAppearance.OUTLINED, ...props }: FieldsetProps) {
  return {
    ...pickProps(props, ['children', 'disabled', 'name', 'id', 'aria-describedby', 'ref']),
    className: cx(styles.fieldset, styles[appearance]),
  };
}

function useLegend({
  size = Size.MEDIUM,
  weight = Weight.MEDIUM,
  tone,
  emphasis,
  ...props
}: LegendProps) {
  return {
    ...pickProps(props, ['children', 'id', 'ref']),
    className: cx(styles.legend, tone && styles[tone], emphasis && styles[emphasis], {
      [styles.small]: size === Size.SMALL,
      [styles.medium]: size === Size.MEDIUM,
      [styles.large]: size === Size.LARGE,
      [styles.regular]: weight === Weight.REGULAR,
      [styles.mediumWeight]: weight === Weight.MEDIUM,
      [styles.semibold]: weight === Weight.SEMIBOLD,
      [styles.bold]: weight === Weight.BOLD,
    }),
  };
}

export { useFieldset, useLegend };
