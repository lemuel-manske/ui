import type { FormMethod, FormAutoComplete } from './options';

import type { ReactEventHandler, ReactNode, Ref, SubmitEventHandler } from 'react';

interface FormProps {
  /**
   * Standalone fields, controls, and actions rendered inside the native form.
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
   * Accessible name supplied as text. Prefer a visible label when one is available.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-label'?: string;

  /**
   * Space-separated IDs of elements that supply the accessible name.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-labelledby'?: string;

  /**
   * Native form submission URL used when the browser handles submission.
   * @remarks Type `string`.
   * @default Current document URL (native default)
   */
  action?: string;

  /**
   * Native HTTP method used for form submission.
   * @remarks Type `FormMethod`.
   * @default 'get' (native default)
   */
  method?: FormMethod;

  /**
   * Default browser autofill behavior for controls in the form.
   * @remarks Type `FormAutoComplete`.
   * @default 'on' (native default)
   */
  autoComplete?: FormAutoComplete;

  /**
   * Disables native browser constraint validation for this form.
   * @remarks Type `boolean`.
   * @default false
   */
  noValidate?: boolean;

  /**
   * Native submit handler. Call preventDefault when handling submission in JavaScript.
   * @remarks Type `SubmitEventHandler<HTMLFormElement>`.
   * @default undefined
   */
  onSubmit?: SubmitEventHandler<HTMLFormElement>;

  /**
   * Native reset handler. Uncontrolled fields reset to their initial values unless reset is prevented.
   * @remarks Type `ReactEventHandler<HTMLFormElement>`.
   * @default undefined
   */
  onReset?: ReactEventHandler<HTMLFormElement>;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLFormElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLFormElement>;
}

export type { FormProps };
