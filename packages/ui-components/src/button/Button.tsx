import type { ButtonProps } from './types';

import { ButtonLabel } from './ButtonLabel';

import { useButton } from './useButton';

/**
 * Performs an action.
 *
 * Use Link for navigation and type="submit" for form submission.
 *
 * Use Button.Label for the text inside a composed button.
 */
function Button(props: ButtonProps) {
  const buttonProps = useButton(props);

  return <button {...buttonProps} />;
}

Button.Label = ButtonLabel;

export { Button };
