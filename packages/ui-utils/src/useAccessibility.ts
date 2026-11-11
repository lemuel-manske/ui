import { useId } from 'react';

interface AccessibilityOptions {
  /**
   * Control ID used for label and description relationships. React generates a stable ID when omitted.
   * @remarks Type `string`.
   * @default Generated with React.useId()
   */
  id?: string;

  /**
   * Disables native interaction, keyboard focus, and inclusion in form submission.
   * @remarks Type `boolean`.
   * @default false
   */
  disabled?: boolean;

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
   * Space-separated IDs of elements that describe the component.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-describedby'?: string;
}

interface AccessibilityProperties {
  id: string;

  'aria-label'?: string;

  'aria-labelledby'?: string;

  'aria-describedby'?: string;

  'aria-disabled'?: true;

  tabIndex?: -1;
}

function useAccessibility({
  id,
  disabled,
  'aria-label': label,
  'aria-labelledby': labelledBy,
  'aria-describedby': describedBy,
}: AccessibilityOptions = {}): AccessibilityProperties {
  const generatedId = useId();

  return {
    id: id ?? generatedId,
    'aria-label': label,
    'aria-labelledby': labelledBy,
    'aria-describedby': describedBy,
    'aria-disabled': disabled ? true : undefined,
    tabIndex: disabled ? -1 : undefined,
  };
}

export { useAccessibility, type AccessibilityOptions, type AccessibilityProperties };
