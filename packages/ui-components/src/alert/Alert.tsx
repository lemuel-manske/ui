import type { AlertProps } from './types';

import { useAlert } from './useAlert';

/** Announces content through a polite status region or an assertive alert. */
function Alert(props: AlertProps) {
  const alert = useAlert(props);

  return <div {...alert} />;
}

export { Alert };
