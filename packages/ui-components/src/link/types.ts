import type { LinkTarget, LinkSize, LinkAppearance } from './options';

import type { MouseEventHandler, ReactNode, Ref } from 'react';

interface LinkProps {
  /**
   * Explicit font size; action links also use the matching minimum target height.
   * @remarks Type `LinkSize`.
   * @default undefined (inherited inline; medium for action)
   */
  size?: LinkSize;

  /**
   * Inline prose link or action with a padded interaction target.
   * @remarks Type `LinkAppearance`.
   * @default 'inline'
   */
  appearance?: LinkAppearance;

  /**
   * Link text and inline content supplying its accessible name.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Destination URL or fragment. Navigation follows native anchor behavior.
   * @remarks Type `string`.
   * @default None (required)
   */
  href: string;

  /**
   * Browsing context used to open the destination.
   * @remarks Type `LinkTarget`.
   * @default '_self' (native default)
   */
  target?: LinkTarget;

  /**
   * Space-separated link relationship tokens. New-tab links add noopener and noreferrer.
   * @remarks Type `string`.
   * @default noopener noreferrer when target is _blank, otherwise undefined
   */
  rel?: string;

  /**
   * Requests a download. A string suggests the downloaded filename.
   * @remarks Type `boolean | string`.
   * @default false
   */
  download?: boolean | string;

  /**
   * ID applied to the native element for labels, descriptions, and fragment links.
   * @remarks Type `string`.
   * @default undefined
   */
  id?: string;

  /**
   * Accessible name supplied as text. Prefer a visible label when one is available.
   * @remarks Type `string`.
   * @default undefined
   */
  'aria-label'?: string;

  /**
   * Identifies the current page, location, or item within a related set.
   * @remarks Type `'page' | 'step' | 'location' | 'date' | 'time' | boolean`.
   * @default undefined
   */
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;

  /**
   * Native activation handler, including pointer clicks and keyboard activation.
   * @remarks Type `MouseEventHandler<HTMLAnchorElement>`.
   * @default undefined
   */
  onClick?: MouseEventHandler<HTMLAnchorElement>;

  /**
   * React ref to the native element rendered by this component.
   * @remarks Type `Ref<HTMLAnchorElement>`.
   * @default undefined
   */
  ref?: Ref<HTMLAnchorElement>;
}

export type { LinkProps };
