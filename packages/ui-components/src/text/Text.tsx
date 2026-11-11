import type { TextProps } from './types';

import { useText } from './useText';

/** Paragraph or inline text with shared typography sizing. */
function Text(props: TextProps) {
  const { Tag, props: elementProps } = useText(props);

  return <Tag {...elementProps} />;
}

export { Text };
