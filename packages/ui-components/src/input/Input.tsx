import type { InputProps } from './types';

import { useInput } from './useInput';

/** Native form input with shared sizing and accessible control attributes. */
function Input({
  type = 'text',
  role,
  'aria-autocomplete': ariaAutocomplete,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  'aria-activedescendant': ariaActiveDescendant,
  onKeyDown,
  ...props
}: InputProps) {
  const controlProps = useInput(props);

  return (
    <input
      {...controlProps}
      type={type}
      role={role}
      aria-autocomplete={ariaAutocomplete}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-activedescendant={ariaActiveDescendant}
      onKeyDown={onKeyDown}
    />
  );
}

export { Input };
