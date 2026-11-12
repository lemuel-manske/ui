import type { ButtonLabelProps } from './types';

/** Renders button text in a span without introducing form-label behavior. */
function ButtonLabel({ children, ref }: ButtonLabelProps) {
  return <span ref={ref}>{children}</span>;
}

export { ButtonLabel };
