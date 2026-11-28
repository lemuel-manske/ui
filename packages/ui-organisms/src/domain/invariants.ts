import type {
  ExpansionState,
  GraphEdge,
  GraphNode,
  GraphNodeEntry,
  GraphNodeId,
  GraphRelationship,
  GraphRelationshipPage,
} from './entities';
import type { GraphExplorerState, GraphSessionSnapshot } from './state';

interface ExpansionPlan {
  /** Relationships accepted after validation and limit checks. */
  accepted: GraphRelationship[];

  /** Nodes absent from the current session. */
  newNodes: GraphNode[];

  /** Edges absent from the current session. */
  newEdges: GraphEdge[];

  /** Expansion state after the page is applied. */
  nextExpansion: ExpansionState;

  /** Items discarded by validation or limits. */
  rejectedCount: number;
}

function isValidRelationship(relationship: GraphRelationship, sourceId: GraphNodeId) {
  const { edge, relatedNode, relatedEndpoint } = relationship;

  if (relatedNode.id === sourceId) {
    return false;
  }

  if (edge.sourceId !== sourceId && edge.targetId !== sourceId) {
    return false;
  }

  if (relatedEndpoint === 'source') {
    return edge.sourceId === relatedNode.id && edge.targetId === sourceId;
  }

  return edge.targetId === relatedNode.id && edge.sourceId === sourceId;
}

function createExpansionPlan(
  state: GraphExplorerState,
  nodeId: GraphNodeId,
  page: GraphRelationshipPage,
): ExpansionPlan {
  const source = state.nodes[nodeId];

  if (source == null) {
    return {
      accepted: [],
      newNodes: [],
      newEdges: [],
      nextExpansion: {
        nodeId,
        status: 'failed',
        hasMore: false,
        loadedCount: 0,
      },
      rejectedCount: page.items.length,
    };
  }

  const current = state.expansions[nodeId];
  const seenNodeIds = new Set(Object.keys(state.nodes));
  const seenEdgeIds = new Set(Object.keys(state.edges));
  const accepted: GraphRelationship[] = [];
  const newNodes: GraphNode[] = [];
  const newEdges: GraphEdge[] = [];

  for (const item of page.items) {
    const loadedCount = (current?.loadedCount ?? 0) + accepted.length;

    if (!isValidRelationship(item, nodeId)) {
      continue;
    }

    if (loadedCount >= state.limits.maxExpandedNeighbors) {
      break;
    }

    const isNodeLimitReached =
      Object.keys(state.nodes).length + newNodes.length >= state.limits.maxVisibleNodes;

    if (!seenNodeIds.has(item.relatedNode.id) && isNodeLimitReached) {
      continue;
    }

    accepted.push(item);

    if (!seenNodeIds.has(item.relatedNode.id)) {
      seenNodeIds.add(item.relatedNode.id);
      newNodes.push(item.relatedNode);
    }

    if (!seenEdgeIds.has(item.edge.id)) {
      seenEdgeIds.add(item.edge.id);
      newEdges.push(item.edge);
    }
  }

  return {
    accepted,
    newNodes,
    newEdges,
    nextExpansion: {
      nodeId,
      status: 'expanded',
      cursor: page.nextCursor,
      hasMore: page.hasMore,
      loadedCount: (current?.loadedCount ?? 0) + accepted.length,
    },
    rejectedCount: page.items.length - accepted.length,
  };
}

function isRelationshipOrigin(entry: GraphNodeEntry, viaNodeId: GraphNodeId) {
  return entry.origins.every(
    (origin) => origin.kind === 'relationship' && origin.viaNodeId === viaNodeId,
  );
}

function getCollapsibleNodeIds(state: GraphExplorerState, sourceId: GraphNodeId) {
  const protectedIds = new Set(
    [
      state.rootId,
      sourceId,
      ...Object.entries(state.positions)
        .filter(([, position]) => position.pinning === 'user')
        .map(([nodeId]) => nodeId),
    ].filter((nodeId): nodeId is GraphNodeId => nodeId != null),
  );
  const removedIds = new Set<GraphNodeId>();

  let changed = true;

  while (changed) {
    changed = false;

    for (const [nodeId, entry] of Object.entries(state.nodes)) {
      if (protectedIds.has(nodeId) || removedIds.has(nodeId)) {
        continue;
      }

      const isRemovable =
        isRelationshipOrigin(entry, sourceId) ||
        entry.origins.every(
          (origin) => origin.kind === 'relationship' && removedIds.has(origin.viaNodeId),
        );

      if (isRemovable) {
        removedIds.add(nodeId);
        changed = true;
      }
    }
  }

  return removedIds;
}

function isValidSnapshot(value: unknown): value is GraphSessionSnapshot {
  if (typeof value !== 'object' || value == null) {
    return false;
  }

  const snapshot = value as GraphSessionSnapshot;
  const hasValidIdentity =
    snapshot.version === 1 &&
    typeof snapshot.query === 'string' &&
    (snapshot.rootId === null || typeof snapshot.rootId === 'string');
  const hasValidCollections =
    typeof snapshot.nodes === 'object' &&
    typeof snapshot.edges === 'object' &&
    typeof snapshot.positions === 'object' &&
    typeof snapshot.expansions === 'object';
  const hasValidCamera =
    typeof snapshot.camera?.zoom === 'number' &&
    typeof snapshot.camera?.center?.x === 'number' &&
    typeof snapshot.camera?.center?.y === 'number';
  const hasValidHistory =
    typeof snapshot.layoutSeed === 'number' && Array.isArray(snapshot.history);
  const isValid = hasValidIdentity && hasValidCollections && hasValidCamera && hasValidHistory;

  return isValid;
}

export {
  createExpansionPlan,
  getCollapsibleNodeIds,
  isRelationshipOrigin,
  isValidRelationship,
  isValidSnapshot,
};

export type { ExpansionPlan };
