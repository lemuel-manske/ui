import type { ButtonLabelProps } from './types';

/** Renders button text in a span without introducing form-label behavior. */
function ButtonLabel(props: ButtonLabelProps) {
  return <span {...props} />;
}

export { ButtonLabel };

export type { ButtonLabelProps } from './types';
