import type {
  GraphEdge,
  GraphLayoutResult,
  GraphLimits,
  GraphNode,
  GraphNodeId,
  NodePosition,
  Rect,
} from '../domain';

/** Input for one deterministic layout pass. */
interface LayoutInput {
  /** Node whose expansion triggered the layout. */
  sourceId: GraphNodeId;

  /** Positions that MUST remain untouched. */
  existingPositions: Record<GraphNodeId, NodePosition>;

  /** Nodes introduced by the accepted relationships. */
  newNodes: GraphNode[];

  /** Edges introduced by the accepted relationships. */
  newEdges: GraphEdge[];

  /** Current viewport in graph units. */
  viewport: { width: number; height: number };

  /** Rectangles the layout MUST avoid. */
  reservedRects: Rect[];

  /** Effective disclosure limits. */
  config: GraphLimits;

  /** Seed stored in session state. */
  seed: number;
}

/** Output for one deterministic layout pass. */
type LayoutResult = GraphLayoutResult;

/** Pure placement policy injected into the controller. */
type LayoutEngine = (input: LayoutInput) => LayoutResult;

export type { LayoutEngine, LayoutInput, LayoutResult };
