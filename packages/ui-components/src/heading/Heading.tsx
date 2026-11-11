import type { HeadingProps } from './types';

import { useHeading } from './useHeading';

/** Semantic heading with independent visual size and font weight. */
function Heading(props: HeadingProps) {
  const { Tag, props: elementProps } = useHeading(props);

  return <Tag {...elementProps} />;
}

export { Heading };
