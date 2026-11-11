import type { LabelProps } from './types';

import { useLabel } from './useLabel';

/** Names an associated form control using text and optional informative artwork. */
function Label(props: LabelProps) {
  const labelProps = useLabel(props);

  return <label {...labelProps} />;
}

export { Label };
