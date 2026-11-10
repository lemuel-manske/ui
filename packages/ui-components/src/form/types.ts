import type { FormEventHandler, ReactNode, Ref } from 'react';

interface FormProps {
  /** Form fields and actions. Form.Input and the other compound parts alias standalone controls. */
  children: ReactNode;

  id?: string;

  className?: string;

  'aria-label'?: string;

  'aria-labelledby'?: string;

  action?: string;

  method?: 'get' | 'post';

  autoComplete?: 'on' | 'off';

  /** Disables native browser validation when application validation handles the form instead. */
  noValidate?: boolean;

  /** Native submit handler. Call preventDefault() when handling submission in JavaScript. */
  onSubmit?: FormEventHandler<HTMLFormElement>;

  onReset?: FormEventHandler<HTMLFormElement>;

  ref?: Ref<HTMLFormElement>;
}

export type { FormProps };
