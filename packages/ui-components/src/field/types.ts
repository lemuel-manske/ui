import type { ReactElement, ReactNode } from 'react';

import type { LabelProps } from '../label/types';

type FieldLabelProps = Pick<LabelProps, 'children'>;

interface FieldProps {
  /**
   * Field.Label, Field.Control, and optional Field.Description or Field.Error parts.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * ID applied to the native element for labels, descriptions, and fragment links.
   * @remarks Type `string`.
   * @default Generated with React.useId()
   */
  id?: string;

  /**
   * Disables the control composed inside Field.Control.
   * @remarks Type `boolean`.
   * @default false
   */
  disabled?: boolean;

  /**
   * Marks the control inside Field.Control as required. Add visible required guidance to the label.
   * @remarks Type `boolean`.
   * @default false
   */
  required?: boolean;
}

interface FieldPartProps {
  /**
   * Help or validation text. Rich inline content such as links is supported.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;
}

interface FieldControlAttributes {
  /**
   * Control ID supplied by the surrounding Field and used by Field.Label.
   * @remarks Type `string`.
   * @default Surrounding Field ID
   */
  id?: string;

  /**
   * Child disabled state, combined with the surrounding Field disabled state.
   * @remarks Type `boolean`.
   * @default false
   */
  disabled?: boolean;

  /**
   * Child required state, combined with the surrounding Field required state.
   * @remarks Type `boolean`.
   * @default false
   */
  required?: boolean;

  /**
   * Child description IDs, combined with registered Field.Description and Field.Error IDs.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-describedby'?: string;

  /**
   * Child invalid state, also enabled while a Field.Error is rendered.
   * @remarks Type `boolean`.
   * @default undefined
   */
  'aria-invalid'?: boolean;
}

interface FieldControlProps {
  /**
   * Exactly one control element accepting the injected FieldControlAttributes.
   * @remarks Type `ReactElement<FieldControlAttributes>`.
   * @default None (required)
   */
  children: ReactElement<FieldControlAttributes>;
}

export type {
  FieldProps,
  FieldLabelProps,
  FieldPartProps,
  FieldControlProps,
  FieldControlAttributes,
};
