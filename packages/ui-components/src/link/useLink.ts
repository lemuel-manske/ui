import { pickProps, cx } from '@lemuel-manske/utils';

import type { LinkProps } from './types';

import styles from './Link.module.css';

function useLink({ target, rel, size, appearance = 'inline', ...props }: LinkProps) {
  const resolvedSize = size ?? (appearance === 'action' ? 'medium' : undefined);

  return {
    ...pickProps(props, [
      'children',
      'href',
      'download',
      'id',
      'aria-label',
      'aria-current',
      'onClick',
      'ref',
    ]),
    target,
    rel:
      target === '_blank'
        ? [...new Set([...(rel?.split(/\s+/) ?? []), 'noopener', 'noreferrer'])].join(' ')
        : rel,
    className: cx(styles.link, styles[appearance], resolvedSize && styles[resolvedSize]),
  };
}

export { useLink };
