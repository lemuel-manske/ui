import type { FormProps } from './types';

import { useForm } from './useForm';

/**
 * Native form with design-system styles. Compose standalone controls inside it.
 * Supply submission and application validation logic through onSubmit.
 */
function Form(props: FormProps) {
  const formProps = useForm(props);

  return <form {...formProps} />;
}

export { Form };
