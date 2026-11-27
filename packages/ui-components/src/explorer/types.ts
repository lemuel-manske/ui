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

interface ExplorerMessages {
  /** Localized accessible name for the search input. */
  searchLabel: string;

  /** Localized hint shown while the query is empty. */
  searchPlaceholder: string;

  /** Localized accessible name for the clear-query action. */
  clearSearchLabel: string;

  /** Localized accessible name for the results listbox. */
  resultsLabel: string;

  /** Localized status announced while results are loading. */
  loadingMessage: string;

  /** Localized message shown when a query has no results. */
  emptyMessage: string;
}

interface ExplorerProps {
  /** Current search query. The component is controlled. */
  query: string;

  /** Results supplied by the consuming application for the current query. */
  results?: ExplorerItem[];

  /** All user-facing strings, translated by the consuming application. */
  messages: ExplorerMessages;

  /** Reports query edits. Search execution and result retrieval remain application-owned. */
  onQueryChange: (query: string) => void;

  /** Called when a result is selected by pointer or keyboard. */
  onSelect?: (item: ExplorerItem) => void;

  /** Shows the localized loading status while the application resolves results. */
  loading?: boolean;
}

export type { ExplorerItem, ExplorerMessages, ExplorerProps };
