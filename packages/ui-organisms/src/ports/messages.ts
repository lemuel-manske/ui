/** Fields Atlas passes unchanged to the `Explorer` primitive. */
interface ExplorerMessagePort {
  /** Accessible name for the search input. */
  searchLabel: string;

  /** Hint shown while the query is empty. */
  searchPlaceholder: string;

  /** Accessible name for the clear-query action. */
  clearSearchLabel: string;

  /** Accessible name for the results listbox. */
  resultsLabel: string;

  /** Status announced while results load. */
  loadingMessage: string;

  /** Message shown when a query has no results. */
  emptyMessage: string;
}

/** All user-facing copy owned by the host application. */
interface GraphExplorerMessages extends ExplorerMessagePort {
  /** Accessible name for the graph canvas region. */
  graphLabel: string;

  /** Hint associated with the graph canvas. */
  graphHint: string;

  /** Accessible name for the non-spatial node list. */
  nodeListLabel: string;

  /** Label for the canvas view toggle. */
  listViewLabel: string;

  /** Label for the canvas view toggle when list view is active. */
  canvasViewLabel: string;

  /** Accessible name for the inspect action. */
  inspectActionLabel: string;

  /** Accessible name for the expand action. */
  expandActionLabel: string;

  /** Accessible name for the collapse action. */
  collapseActionLabel: string;

  /** Accessible name for the continuation action. */
  showMoreActionLabel: string;

  /** Accessible name for the detail action. */
  detailActionLabel: string;

  /** Accessible name for the back action. */
  backActionLabel: string;

  /** Accessible name for the reset action. */
  resetActionLabel: string;

  /** Label prefix for a root node. */
  rootLabel: string;

  /** Label prefix for a relationship. */
  relationshipLabel: string;

  /** Accessible name for the preview region. */
  previewLabel: string;

  /** Status shown while relationships load. */
  loadingRelationshipsMessage: string;

  /** Message shown when a node has no relationships. */
  emptyRelationshipsMessage: string;

  /** Message shown when relationships fail to load. */
  relationshipsErrorMessage: string;

  /** Accessible name for the retry action. */
  retryLabel: string;

  /** Accessible name for the detail return action. */
  detailReturnLabel: string;

  /** Formats a result count. */
  resultCount: (count: number) => string;

  /** Formats a truncated result count. */
  truncatedResultCount: (shown: number, total: number) => string;

  /** Formats a relationship count. */
  relationshipCount: (count: number, title: string) => string;

  /** Announces a new root. */
  rootAnnouncement: (title: string) => string;

  /** Announces an expansion. */
  expansionAnnouncement: (title: string, count: number) => string;

  /** Announces an inspection. */
  previewAnnouncement: (title: string) => string;

  /** Announces an error. */
  errorAnnouncement: (message: string) => string;
}

export type { ExplorerMessagePort, GraphExplorerMessages };
