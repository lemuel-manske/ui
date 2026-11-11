import type { InputProps } from './types';

import { useInput } from './useInput';

/** Native form input with shared sizing and accessible control attributes. */
function Input({ type = 'text', ...props }: InputProps) {
  const controlProps = useInput(props);

  return <input {...controlProps} type={type} />;
}

export { Input };
