import type { ReactNode } from 'react';

interface GraphNode {
  /** Stable identifier used by edges and interaction callbacks. */
  id: string;

  /** Visible node label. */
  label: string;

  /** Optional descriptive content rendered inside the node. */
  description?: string;

  /** Optional node category exposed as a data attribute. */
  type?: string;
}

interface GraphEdge {
  /** Stable identifier for the edge. */
  id: string;

  /** ID of the source node. */
  source: string;

  /** ID of the target node. */
  target: string;

  /** Optional relationship label. */
  label?: string;
}

interface GraphProps {
  /**
   * Nodes available to the graph. The component does not retrieve or mutate graph data.
   * @remarks Type `GraphNode[]`.
   * @default None (required)
   */
  nodes: GraphNode[];

  /**
   * Relationships between supplied nodes.
   * @remarks Type `GraphEdge[]`.
   * @default []
   */
  edges?: GraphEdge[];

  /**
   * IDs of nodes currently disclosed in the graph. When omitted, every supplied node is visible.
   * @remarks Type `string[]`.
   * @default undefined
   */
  visibleNodeIds?: string[];

  /**
   * ID of the currently focused node.
   * @remarks Type `string`.
   * @default undefined
   */
  focusedNodeId?: string;

  /**
   * Accessible name for the graph region.
   * @remarks Type `string`.
   * @default 'Graph'
   */
  'aria-label'?: string;

  /**
   * Called when a node receives focus through graph interaction.
   * @remarks Type `(nodeId: string) => void`.
   * @default undefined
   */
  onFocusNode?: (nodeId: string) => void;

  /**
   * Called when a node is activated to request disclosure of its neighborhood.
   * The application owns data retrieval and supplies any resulting graph updates.
   * @remarks Type `(nodeId: string) => void`.
   * @default undefined
   */
  onExpand?: (nodeId: string) => void;

  /**
   * Optional content rendered within each node, after its label and description.
   * @remarks Type `(node: GraphNode) => ReactNode`.
   * @default undefined
   */
  renderNodeContent?: (node: GraphNode) => ReactNode;
}

export type { GraphNode, GraphEdge, GraphProps };
