import type { TextareaProps } from './types';

import { useTextarea } from './useTextarea';

/** Native multiline form control with shared sizing and accessible attributes. */
function Textarea(props: TextareaProps) {
  const controlProps = useTextarea(props);

  return <textarea {...controlProps} />;
}

export { Textarea };
