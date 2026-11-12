import type { Size } from '@lemuel-manske/design-tokens';

import type { Subset } from '@lemuel-manske/utils';

type LinkTarget = '_self' | '_blank' | '_parent' | '_top';

type LinkSize = Subset<Size, 'small' | 'medium' | 'large'>;

type LinkAppearance = 'inline' | 'action';

export type { LinkSize, LinkTarget, LinkAppearance };
