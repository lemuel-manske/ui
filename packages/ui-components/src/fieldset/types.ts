import type { ReactNode, Ref } from 'react';

interface FieldsetProps {
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
   * Additional CSS classes applied to the component root.
   * @remarks Type `string`.
   * @default undefined
   */
  className?: string;

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
   * Additional CSS classes applied to the native legend element.
   * @remarks Type `string`.
   * @default undefined
   */
  className?: string;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLLegendElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLLegendElement>;
}

export type { FieldsetProps, LegendProps };
