import type { ReactNode, Ref } from 'react';

interface RadioGroupProps {
  /**
   * RadioGroup.Item elements belonging to this selection group.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Visible legend naming the group.
   * @remarks Type `string`.
   * @default None (required)
   */
  label: string;

  /**
   * Shared native radio name. A unique group name is generated when omitted.
   * @remarks Type `string`.
   * @default Generated unique group name
   */
  name?: string;

  /**
   * Controlled selected item value. Update it in onValueChange.
   * @remarks Type `string`.
   * @default undefined
   */
  value?: string;

  /**
   * Initially selected item value for an uncontrolled group.
   * @remarks Type `string`.
   * @default undefined
   */
  defaultValue?: string;

  /**
   * Disables every item in the group.
   * @remarks Type `boolean`.
   * @default false
   */
  disabled?: boolean;

  /**
   * Requires one item to be selected before native form submission.
   * @remarks Type `boolean`.
   * @default false
   */
  required?: boolean;

  /**
   * Additional CSS classes applied to the component root.
   * @remarks Type `string`.
   * @default undefined
   */
  className?: string;

  /**
   * Space-separated IDs of elements that describe the component.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-describedby'?: string;

  /**
   * Receives the selected radio value. Update value when the group is controlled.
   * @remarks Type `(value: string) => void`.
   * @default undefined
   */
  onValueChange?: (value: string) => void;
}

interface RadioGroupItemProps {
  /**
   * Visible label content for this radio option.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Unique value for this option within its group.
   * @remarks Type `string`.
   * @default None (required)
   */
  value: string;

  /**
   * Disables this option. A disabled group also disables every option.
   * @remarks Type `boolean`.
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes applied to the wrapping label.
   * @remarks Type `string`.
   * @default undefined
   */
  className?: string;

  /**
   * React ref to the native radio input.
   * @remarks Type `Ref<HTMLInputElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLInputElement>;
}

export type { RadioGroupProps, RadioGroupItemProps };
