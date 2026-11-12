import { pickProps, cx } from '@lemuel-manske/utils';

import type { FieldsetProps, LegendProps } from './types';

import styles from './Fieldset.module.css';

function useFieldset({ appearance = 'outlined', ...props }: FieldsetProps) {
  return {
    ...pickProps(props, ['children', 'disabled', 'name', 'id', 'aria-describedby', 'ref']),
    className: cx(styles.fieldset, styles[appearance]),
  };
}

function useLegend({ size = 'medium', weight = 'medium', tone, emphasis, ...props }: LegendProps) {
  return {
    ...pickProps(props, ['children', 'id', 'ref']),
    className: cx(styles.legend, tone && styles[tone], emphasis && styles[emphasis], {
      [styles.small]: size === 'small',
      [styles.medium]: size === 'medium',
      [styles.large]: size === 'large',
      [styles.regular]: weight === 'regular',
      [styles.mediumWeight]: weight === 'medium',
      [styles.semibold]: weight === 'semibold',
      [styles.bold]: weight === 'bold',
    }),
  };
}

export { useFieldset, useLegend };
