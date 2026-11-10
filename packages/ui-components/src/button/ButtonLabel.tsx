import type { ReactNode, Ref } from 'react';

interface ButtonLabelProps {
  /** Text displayed inside Button.Label. */
  children: ReactNode;

  className?: string;

  ref?: Ref<HTMLSpanElement>;
}

function ButtonLabel(props: ButtonLabelProps) {
  return <span {...props} />;
}

export { ButtonLabel };

export type { ButtonLabelProps };
