import type { LinkProps } from './types';

import { useLink } from './useLink';

/** Native anchor that adds safe relationship tokens when opening a new browsing context. */
function Link(props: LinkProps) {
  const link = useLink(props);

  return <a {...link} />;
}

export { Link };
