interface ExplorerItem {
  /** Stable identifier used for active option state and selection callbacks. */
  id: string;

  /** Primary text presented for this result. */
  label: string;

  /** Optional supporting text presented below the result label. */
  description?: string;

  /** Optional category used to group related results visually. */
  group?: string;
}

interface ExplorerProps {
  /**
   * Current search query. The component is controlled and reports edits through onQueryChange.
   * @remarks Type `string`.
   * @default None (required)
   */
  query: string;

  /**
   * Results supplied by the consuming application for the current query.
   * @remarks Type `ExplorerItem[]`.
   * @default []
   */
  results?: ExplorerItem[];

  /**
   * Accessible name for the persistent search input.
   * @remarks Type `string`.
   * @default 'Search'
   */
  'aria-label'?: string;

  /**
   * Hint displayed while the query is empty.
   * @remarks Type `string`.
   * @default 'Search...'
   */
  placeholder?: string;

  /**
   * Reports query edits. Search execution and result retrieval remain application-owned.
   * @remarks Type `(query: string) => void`.
   * @default None (required)
   */
  onQueryChange: (query: string) => void;

  /**
   * Called when a result is selected by pointer or keyboard.
   * @remarks Type `(item: ExplorerItem) => void`.
   * @default undefined
   */
  onSelect?: (item: ExplorerItem) => void;

  /**
   * Shows a loading message while the application resolves results.
   * @remarks Type `boolean`.
   * @default false
   */
  loading?: boolean;

  /**
   * Message shown when a non-empty query has no results.
   * @remarks Type `string`.
   * @default 'No results found.'
   */
  emptyMessage?: string;
}

export type { ExplorerItem, ExplorerProps };
