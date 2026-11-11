import type { AlertUrgency } from './options';

import type { ReactNode } from 'react';

interface AlertProps {
  /**
   * Announcement content. Changes are announced using the selected urgency.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Live announcement priority. Polite uses status, while assertive uses alert.
   * @remarks Type `AlertUrgency`.
   * @default 'polite'
   */
  urgency?: AlertUrgency;

  /**
   * ID applied to the native element for labels, descriptions, and fragment links.
   * @remarks Type `string`.
   * @default undefined
   */
  id?: string;
}

export type { AlertProps };
