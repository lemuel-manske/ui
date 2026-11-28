import type {
  GraphCursor,
  GraphNode,
  GraphNodeId,
  GraphRelationshipPage,
  GraphSearchPage,
} from '../domain';

/** Options shared by every adapter request. */
interface GraphRequestOptions {
  /** Signal the adapter MUST honor. */
  signal: AbortSignal;

  /** Page size hint derived from `GraphLimits`. */
  limit: number;
}

/** Options for a relationship page request. */
interface GraphRelationshipRequestOptions extends GraphRequestOptions {
  /** Present only for continuation requests. */
  cursor?: GraphCursor;
}

/** Optional richer content for the detail surface. */
interface GraphNodeDetail extends GraphNode {
  /** Long-form content supplied by the application. */
  body?: string;
}

/** A command result translated from the Explorer surface. */
interface GraphResultItem {
  /** Stable identity matching `GraphNode.id`. */
  id: string;

  /** Primary text presented by Explorer. */
  label: string;

  /** Optional supporting text. */
  description?: string;

  /** Optional grouping label. */
  group?: string;
}

/** The only I/O boundary of Atlas. */
interface GraphExplorerAdapter {
  /** Retrieve candidate results for the command input. */
  search(query: string, options: GraphRequestOptions): Promise<GraphSearchPage>;

  /** Retrieve one bounded page of relationships around a node. */
  getRelationships(
    nodeId: GraphNodeId,
    options: GraphRelationshipRequestOptions,
  ): Promise<GraphRelationshipPage>;

  /** Retrieve full content when a richer detail surface is requested. */
  getNodeDetail?(
    nodeId: GraphNodeId,
    options: { signal: AbortSignal },
  ): Promise<GraphNodeDetail | null>;
}

export type {
  GraphExplorerAdapter,
  GraphNodeDetail,
  GraphRelationshipRequestOptions,
  GraphRequestOptions,
  GraphResultItem,
};
