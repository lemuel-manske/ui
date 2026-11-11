import type { ComboboxOptionProps } from './types';

/** Native option belonging to a Combobox. */
function ComboboxOption({ children, value, disabled, ref }: ComboboxOptionProps) {
  return (
    <option value={value} disabled={disabled} ref={ref}>
      {children}
    </option>
  );
}

export { ComboboxOption };
