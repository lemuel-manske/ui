import type { ReactNode } from 'react';

interface DialogProps {
  /**
   * Modal body and interactive content rendered below the title.
   * @remarks Type `ReactNode`.
   * @default None (required)
   */
  children: ReactNode;

  /**
   * Visible dialog title and accessible name of the modal.
   * @remarks Type `string`.
   * @default None (required)
   */
  title: string;

  /**
   * Controlled modal visibility. The browser manages modal focus while the dialog is open.
   * @remarks Type `boolean`.
   * @default None (required)
   */
  open: boolean;

  /**
   * Receives false when the user closes or cancels the dialog. Update open in the application.
   * @remarks Type `(open: boolean) => void`.
   * @default None (required)
   */
  onOpenChange: (open: boolean) => void;

  /**
   * Text and accessible name of the dialog close button. Supply a localized value.
   * @remarks Type `string`.
   * @default 'Close'
   */
  closeLabel?: string;

  /**
   * Additional CSS classes applied to the component root.
   * @remarks Type `string`.
   * @default undefined
   */
  className?: string;
}

export type { DialogProps };
