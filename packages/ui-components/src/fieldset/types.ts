import type {
  FieldsetAppearance,
  LegendSize,
  LegendWeight,
  LegendTone,
  LegendEmphasis,
} from './options';

import type { ReactNode, Ref } from 'react';

interface FieldsetProps {
  /**
   * Outlined box, section divider, or unboxed grouping. Spacing uses semantic space tokens.
   * @remarks Type `FieldsetAppearance`.
   * @default FieldsetAppearance.OUTLINED
   */
  appearance?: FieldsetAppearance;

  /**
   * A Legend and the related form controls grouped by this fieldset.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Disables descendant controls according to native fieldset behavior.
   * @remarks Type `boolean`.
   * @default false
   */
  disabled?: boolean;

  /**
   * Native fieldset name used to identify the group within its form.
   * @remarks Type `string`.
   * @default undefined
   */
  name?: string;

  /**
   * ID applied to the native element for labels, descriptions, and fragment links.
   * @remarks Type `string`.
   * @default undefined
   */
  id?: string;

  /**
   * Space-separated IDs of elements that describe the component.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-describedby'?: string;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLFieldSetElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLFieldSetElement>;
}

interface LegendProps {
  /**
   * Visual caption size, preserving the native legend semantics.
   * @remarks Type `LegendSize`.
   * @default Size.MEDIUM
   */
  size?: LegendSize;

  /**
   * Visual font weight of the group caption.
   * @remarks Type `LegendWeight`.
   * @default Weight.MEDIUM
   */
  weight?: LegendWeight;

  /**
   * Semantic text color, independent of size and emphasis.
   * @remarks Type `LegendTone`.
   * @default 'primary'
   */
  tone?: LegendTone;

  /**
   * Visual italic emphasis. Load the real italic font face; use em for semantic emphasis.
   * @remarks Type `LegendEmphasis`.
   * @default Emphasis.NORMAL
   */
  emphasis?: LegendEmphasis;

  /**
   * Caption that names the enclosing fieldset.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * ID applied to the native element for labels, descriptions, and fragment links.
   * @remarks Type `string`.
   * @default undefined
   */
  id?: string;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLLegendElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLLegendElement>;
}

export type { FieldsetProps, LegendProps };
