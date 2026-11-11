import type { CheckboxProps } from './types';

import { useCheckbox } from './useCheckbox';

/** Native checkbox with a visible label and shared accessible control attributes. */
function Checkbox(props: CheckboxProps) {
  const checkbox = useCheckbox(props);

  return (
    <label className={checkbox.className}>
      <input {...checkbox.input} />

      <span>{checkbox.children}</span>
    </label>
  );
}

export { Checkbox };
