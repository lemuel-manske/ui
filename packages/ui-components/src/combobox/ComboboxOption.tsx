import type { ComboboxOptionProps } from './types';

/** Native option belonging to a Combobox. */
function ComboboxOption(props: ComboboxOptionProps) {
  return <option {...props} />;
}

export { ComboboxOption };
