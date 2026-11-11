import { Fieldset, Legend } from '../fieldset/Fieldset';

import type { RadioGroupProps, RadioGroupItemProps } from './types';

import { RadioGroupContext, useRadioGroup, useRadioGroupItem } from './useRadioGroup';

import styles from './RadioGroup.module.css';

/** Native radio option bound to its enclosing RadioGroup selection and disabled state. */
function RadioGroupItem(props: RadioGroupItemProps) {
  const item = useRadioGroupItem(props);

  return (
    <label className={item.className}>
      <input {...item.input} />

      <span>{item.children}</span>
    </label>
  );
}

/** Groups mutually exclusive radio options with a visible legend. */
function RadioGroup(props: RadioGroupProps) {
  const group = useRadioGroup(props);

  return (
    <RadioGroupContext value={group}>
      <Fieldset disabled={props.disabled} aria-describedby={props['aria-describedby']}>
        <Legend>{props.label}</Legend>

        <div className={styles.items}>{props.children}</div>
      </Fieldset>
    </RadioGroupContext>
  );
}

RadioGroup.Item = RadioGroupItem;

export { RadioGroup, RadioGroupItem };
