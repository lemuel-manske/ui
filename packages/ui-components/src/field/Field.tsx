import { cloneElement } from 'react';

import { cx } from '@lemuel-manske/utils';

import { Label } from '../label/Label';

import type { FieldProps, FieldLabelProps, FieldPartProps, FieldControlProps } from './types';

import { FieldContext, useField, useFieldContext, useFieldMessage } from './useField';

import styles from './Field.module.css';

/**
 * Label for the surrounding Field's control. Use as Field.Label.
 */
function FieldLabel(props: FieldLabelProps) {
  const { id } = useFieldContext();

  return <Label {...props} htmlFor={id} />;
}

/**
 * Help text associated with the surrounding Field's control. Use as Field.Description.
 */
function FieldDescription({ className, ...props }: FieldPartProps) {
  const message = useFieldMessage(false);

  return <p {...props} {...message} className={cx(styles.message, className)} />;
}

/**
 * Conditional error message that marks the control invalid. Use as Field.Error.
 */
function FieldError({ className, ...props }: FieldPartProps) {
  const message = useFieldMessage(true);

  return (
    <p
      {...props}
      {...message}
      role="alert"
      className={cx(styles.message, styles.error, className)}
    />
  );
}

/**
 * Connects one control to the surrounding Field's label, messages, and validation state.
 * Use as Field.Control.
 */
function FieldControl({ children }: FieldControlProps) {
  const field = useFieldContext();

  const describedBy =
    [children.props['aria-describedby'], ...field.descriptions, ...field.errors]
      .filter(Boolean)
      .join(' ') || undefined;

  return cloneElement(children, {
    id: field.id,
    disabled: field.disabled || children.props.disabled,
    required: field.required || children.props.required,
    'aria-invalid': field.errors.length > 0 || children.props['aria-invalid'],
    'aria-describedby': describedBy,
  });
}

/**
 * Groups one control with Field.Label, Field.Description, and conditional Field.Error.
 * Wrap the control in Field.Control to connect accessible names and descriptions.
 */
function Field({ children, ...props }: FieldProps) {
  const field = useField({ ...props, children });

  return (
    <FieldContext value={field.context}>
      <div className={field.className}>{children}</div>
    </FieldContext>
  );
}

Field.Label = FieldLabel;

Field.Control = FieldControl;

Field.Description = FieldDescription;

Field.Error = FieldError;

export { Field, FieldLabel, FieldControl, FieldDescription, FieldError };
