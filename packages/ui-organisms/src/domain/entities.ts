import type {
  GraphEasing,
  GraphErrorCode,
  GraphExpansionStatus,
  GraphPinning,
  GraphRelatedEndpoint,
} from './options';

type GraphNodeId = string;

type GraphEdgeId = string;

type GraphCursor = string;

/** A domain entity displayed on the canvas. */
interface GraphNode {
  /** Stable identity across searches and expansions. */
  id: GraphNodeId;

  /** Primary editorial title. */
  title: string;

  /** Category or entity type shown as supporting metadata. */
  type: string;

  /** Short excerpt used in previews and the list view. */
  description?: string;

  /** Flat, display-ready metadata. */
  metadata?: Record<string, string>;
}

/** A relationship returned by the data adapter. */
interface GraphEdge {
  /** Stable identity; deduplication key. */
  id: GraphEdgeId;

  /** Origin endpoint. */
  sourceId: GraphNodeId;

  /** Destination endpoint. */
  targetId: GraphNodeId;

  /** Human-readable relationship label. */
  relation: string;
}

/** One relationship page item. */
interface GraphRelationship {
  /** The relationship itself. */
  edge: GraphEdge;

  /** The node on the opposite end of the expanded node. */
  relatedNode: GraphNode;

  /** Which endpoint of `edge` is `relatedNode`. */
  relatedEndpoint: GraphRelatedEndpoint;
}

/** Canvas-space coordinates in graph units, before the camera transform. */
interface Point {
  /** Horizontal graph-space coordinate. */
  x: number;

  /** Vertical graph-space coordinate. */
  y: number;
}

/** Axis-aligned rectangle in graph units. */
interface Rect extends Point {
  /** Rectangle width in graph units. */
  width: number;

  /** Rectangle height in graph units. */
  height: number;
}

/** A stored node position. */
interface NodePosition extends Point {
  /** `user` positions stay fixed; `layout` positions may be reused. */
  pinning: GraphPinning;
}

/** A 2D camera transform: translation plus uniform scale. */
interface CameraState {
  /** Graph-space point displayed at the viewport center. */
  center: Point;

  /** Linear scale where 1 is 100%. */
  zoom: number;
}

/** Error surfaced by the adapter or by an enforced graph limit. */
interface GraphError {
  /** Stable machine-readable cause. */
  code: GraphErrorCode;

  /** Technical detail; never shown raw without localization. */
  message: string;

  /** Whether retrying the failed operation is meaningful. */
  retryable: boolean;
}

/** Provenance of a node or edge; used to make collapse deterministic. */
type NodeOrigin =
  | { kind: 'root'; seq: number }
  | { kind: 'search'; seq: number }
  | { kind: 'relationship'; viaNodeId: GraphNodeId; viaEdgeId: GraphEdgeId; seq: number };

/** Internal normalized entry; selectors expose `GraphNode` values. */
interface GraphNodeEntry {
  /** Display data for the node. */
  node: GraphNode;

  /** Every session step that introduced the node. */
  origins: NodeOrigin[];
}

/** Internal normalized entry; selectors expose `GraphEdge` values. */
interface GraphEdgeEntry {
  /** Relationship data for the edge. */
  edge: GraphEdge;

  /** Every session step that introduced the edge. */
  origins: NodeOrigin[];
}

/** Expansion lifecycle for a single node. */
interface ExpansionState {
  /** Node being expanded. */
  nodeId: GraphNodeId;

  /** Current lifecycle status. */
  status: GraphExpansionStatus;

  /** Cursor for the next continuation request. */
  cursor?: GraphCursor;

  /** Whether another relationship page is available. */
  hasMore: boolean;

  /** Number of related nodes loaded from this node. */
  loadedCount: number;

  /** Present when `status` is `failed`. */
  error?: GraphError;
}

/** A page of command results. */
interface GraphSearchPage {
  /** Candidate results. */
  items: GraphNode[];

  /** Whether more results are available. */
  hasMore: boolean;

  /** Opaque continuation cursor. */
  nextCursor?: GraphCursor;

  /** Total number of available results, when known. */
  total?: number;
}

/** A bounded page of relationships around one node. */
interface GraphRelationshipPage {
  /** Relationship items. */
  items: GraphRelationship[];

  /** Whether more relationships are available. */
  hasMore: boolean;

  /** Opaque continuation cursor. */
  nextCursor?: GraphCursor;

  /** Total number of available relationships, when known. */
  total?: number;
}

/** Positions produced by one layout pass. */
interface GraphLayoutResult {
  /** New node positions only; existing IDs MUST be absent. */
  positions: Record<GraphNodeId, Point>;

  /** Source position used as the reveal origin. */
  revealOrigin: Point;
}

/** Bound limits for bounded disclosure. */
interface GraphLimits {
  /** Maximum results requested from `search`. */
  searchResultLimit: number;

  /** Maximum relationships requested per expansion or continuation. */
  relationshipPageSize: number;

  /** Maximum visible nodes in a session. */
  maxVisibleNodes: number;

  /** Maximum nodes loaded from one node across all pages. */
  maxExpandedNeighbors: number;

  /** Maximum retained history frames. */
  maxHistoryDepth: number;
}

/** Timing configuration; reduced motion always overrides these values. */
interface GraphMotionConfig {
  /** Node and edge reveal duration in milliseconds. */
  revealDurationMs: number;

  /** Camera transition duration in milliseconds. */
  cameraDurationMs: number;

  /** Easing used for reveals. */
  revealEasing: GraphEasing;

  /** Easing used for camera transitions. */
  cameraEasing: GraphEasing;
}

const DEFAULT_GRAPH_LIMITS: GraphLimits = {
  searchResultLimit: 8,
  relationshipPageSize: 8,
  maxVisibleNodes: 60,
  maxExpandedNeighbors: 24,
  maxHistoryDepth: 25,
};

const DEFAULT_GRAPH_MOTION: GraphMotionConfig = {
  revealDurationMs: 220,
  cameraDurationMs: 380,
  revealEasing: 'standard',
  cameraEasing: 'standard',
};

export {
  DEFAULT_GRAPH_LIMITS,
  DEFAULT_GRAPH_MOTION,
  type CameraState,
  type ExpansionState,
  type GraphCursor,
  type GraphEdge,
  type GraphEdgeEntry,
  type GraphEdgeId,
  type GraphError,
  type GraphLayoutResult,
  type GraphLimits,
  type GraphMotionConfig,
  type GraphNode,
  type GraphNodeEntry,
  type GraphNodeId,
  type GraphRelationship,
  type GraphRelationshipPage,
  type GraphSearchPage,
  type NodeOrigin,
  type NodePosition,
  type Point,
  type Rect,
};
