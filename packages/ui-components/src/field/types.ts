import type { ReactElement, ReactNode } from 'react';

interface FieldProps {
  /** Field.Label, Field.Control, and optional description or error parts. */
  children: ReactNode;

  /** Control ID shared with Field.Label. Generated when omitted. */
  id?: string;

  /** Disables the child of Field.Control. */
  disabled?: boolean;

  /** Marks the child of Field.Control as required. Does not add visible label text. */
  required?: boolean;

  className?: string;
}

interface FieldPartProps {
  /** Visible label, help text, or error message. */
  children: ReactNode;

  className?: string;
}

interface FieldControlAttributes {
  id?: string;

  disabled?: boolean;

  required?: boolean;

  'aria-describedby'?: string;

  'aria-invalid'?: boolean;
}

interface FieldControlProps {
  /** Exactly one React element that forwards injected ID, state, and ARIA props to its control. */
  children: ReactElement<FieldControlAttributes>;
}

export type { FieldProps, FieldPartProps, FieldControlProps, FieldControlAttributes };
