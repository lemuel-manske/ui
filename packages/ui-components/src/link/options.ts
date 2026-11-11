import type { Size } from '@lemuel-manske/design-tokens';

type LinkTarget = '_self' | '_blank' | '_parent' | '_top';

type LinkSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

const LinkAppearance = { INLINE: 'inline', ACTION: 'action' } as const;

type LinkAppearance = (typeof LinkAppearance)[keyof typeof LinkAppearance];

export type { LinkSize, LinkTarget };

export { LinkAppearance };
