import {
  type GraphEdgeEntry,
  type GraphError,
  type GraphLayoutResult,
  type GraphNode,
  type GraphNodeEntry,
  type GraphNodeId,
  type GraphRelationshipPage,
  type GraphSearchPage,
  type NodeOrigin,
} from './entities';
import { createExpansionPlan, getCollapsibleNodeIds, isValidSnapshot } from './invariants';
import {
  createEmptyState,
  pushHistory,
  stateFromSnapshot,
  type DetailRequest,
  type GraphExplorerState,
  type GraphSessionSnapshot,
} from './state';
import type { GraphCameraReason, GraphView } from './options';

type GraphAction =
  | { type: 'QUERY_CHANGED'; query: string }
  | { type: 'SEARCH_STARTED'; requestId: number }
  | { type: 'SEARCH_SUCCEEDED'; requestId: number; page: GraphSearchPage }
  | { type: 'SEARCH_FAILED'; requestId: number; error: GraphError }
  | { type: 'ROOT_SELECTED'; node: GraphNode }
  | { type: 'NODE_FOCUSED'; nodeId: GraphNodeId }
  | { type: 'NODE_INSPECTED'; nodeId: GraphNodeId }
  | { type: 'PREVIEW_DISMISSED' }
  | { type: 'EXPANSION_STARTED'; nodeId: GraphNodeId; requestId: number }
  | {
      type: 'EXPANSION_SUCCEEDED';

      nodeId: GraphNodeId;

      requestId: number;

      page: GraphRelationshipPage;

      layout: GraphLayoutResult;
    }
  | { type: 'EXPANSION_FAILED'; nodeId: GraphNodeId; requestId: number; error: GraphError }
  | { type: 'EXPANSION_COLLAPSED'; nodeId: GraphNodeId }
  | { type: 'NODE_PINNED'; nodeId: GraphNodeId; x: number; y: number }
  | { type: 'CAMERA_CHANGED'; camera: GraphExplorerState['camera']; reason: GraphCameraReason }
  | { type: 'VIEW_CHANGED'; view: GraphView }
  | { type: 'DETAIL_OPENED'; request: DetailRequest }
  | { type: 'DETAIL_CLOSED' }
  | { type: 'HISTORY_BACK' }
  | { type: 'RESET' }
  | { type: 'SNAPSHOT_RESTORED'; snapshot: GraphSessionSnapshot };

function phaseFor(session: GraphExplorerState): GraphExplorerState['phase'] {
  if (session.rootId == null) {
    return 'empty';
  }

  const isExploring = Object.keys(session.nodes).length > 1;

  return isExploring ? 'exploring' : 'root';
}

function upsertOrigins(
  existing: GraphNodeEntry['origins'] | GraphEdgeEntry['origins'],
  origin: NodeOrigin,
) {
  return [...existing, origin];
}

function graphReducer(state: GraphExplorerState, action: GraphAction): GraphExplorerState {
  switch (action.type) {
    case 'QUERY_CHANGED': {
      const isEmpty = action.query.trim().length === 0;

      return {
        ...state,
        query: action.query,
        phase: isEmpty ? 'empty' : 'searching',
        search: isEmpty ? { status: 'idle', items: [], hasMore: false } : state.search,
      };
    }

    case 'SEARCH_STARTED': {
      const isEmptyQuery = state.query.trim().length === 0;

      return {
        ...state,
        phase: isEmptyQuery ? state.phase : 'searching',
        search: { status: 'loading', items: [], hasMore: false },
        searchRequestId: action.requestId,
      };
    }

    case 'SEARCH_SUCCEEDED': {
      if (action.requestId !== state.searchRequestId) {
        return state;
      }

      const items = action.page.items.slice(0, state.limits.searchResultLimit);

      return {
        ...state,
        phase: phaseFor(state),
        search: {
          status: 'ready',
          items,
          hasMore:
            action.page.hasMore || (action.page.total != null && action.page.total > items.length),
        },
      };
    }

    case 'SEARCH_FAILED': {
      if (action.requestId !== state.searchRequestId) {
        return state;
      }

      return {
        ...state,
        phase: phaseFor(state),
        search: { status: 'error', items: [], hasMore: false, error: action.error },
      };
    }

    case 'ROOT_SELECTED': {
      if (state.rootId === action.node.id) {
        return state;
      }

      const history = state.rootId == null ? state.history : pushHistory(state, 'root-replaced');
      const session = createEmptyState(state.limits);
      const nodeId = action.node.id;

      return {
        ...session,
        history,
        rootId: nodeId,
        focusedId: nodeId,
        selectedId: nodeId,
        inspectedId: nodeId,
        phase: 'root',
        nodes: {
          [nodeId]: { node: action.node, origins: [{ kind: 'root', seq: 0 }] },
        },
        positions: {
          [nodeId]: { ...session.camera.center, pinning: 'layout' },
        },
      };
    }

    case 'NODE_FOCUSED': {
      if (state.nodes[action.nodeId] == null) {
        return state;
      }

      return { ...state, focusedId: action.nodeId };
    }

    case 'NODE_INSPECTED': {
      if (state.nodes[action.nodeId] == null) {
        return state;
      }

      return {
        ...state,
        focusedId: action.nodeId,
        selectedId: action.nodeId,
        inspectedId: action.nodeId,
      };
    }

    case 'PREVIEW_DISMISSED':
      return state.inspectedId == null ? state : { ...state, inspectedId: null };

    case 'EXPANSION_STARTED': {
      if (state.nodes[action.nodeId] == null) {
        return state;
      }

      return {
        ...state,
        expansions: {
          ...state.expansions,
          [action.nodeId]: {
            nodeId: action.nodeId,
            status: 'loading',
            hasMore: state.expansions[action.nodeId]?.hasMore ?? false,
            loadedCount: state.expansions[action.nodeId]?.loadedCount ?? 0,
            cursor: state.expansions[action.nodeId]?.cursor,
          },
        },
        expansionRequestIds: {
          ...state.expansionRequestIds,
          [action.nodeId]: action.requestId,
        },
      };
    }

    case 'EXPANSION_SUCCEEDED': {
      if (action.requestId !== state.expansionRequestIds[action.nodeId]) {
        return state;
      }

      const plan = createExpansionPlan(state, action.nodeId, action.page);
      const nodes = { ...state.nodes };
      const edges = { ...state.edges };
      const positions = { ...state.positions };
      const expansions = { ...state.expansions };
      const originSeq = state.layoutSeed + 1;

      for (const relationship of plan.accepted) {
        const origin: NodeOrigin = {
          kind: 'relationship',
          viaNodeId: action.nodeId,
          viaEdgeId: relationship.edge.id,
          seq: originSeq,
        };
        const existingNode = nodes[relationship.relatedNode.id];
        const existingEdge = edges[relationship.edge.id];

        nodes[relationship.relatedNode.id] = {
          node: existingNode?.node ?? relationship.relatedNode,
          origins: upsertOrigins(existingNode?.origins ?? [], origin),
        };

        edges[relationship.edge.id] = {
          edge: existingEdge?.edge ?? relationship.edge,
          origins: upsertOrigins(existingEdge?.origins ?? [], origin),
        };
      }

      for (const node of plan.newNodes) {
        const position = action.layout.positions[node.id];

        if (position != null && positions[node.id] == null) {
          positions[node.id] = { x: position.x, y: position.y, pinning: 'layout' };
        }
      }

      expansions[action.nodeId] = plan.nextExpansion;

      const addedNodes = plan.newNodes.length > 0;
      const addedEdges = plan.newEdges.length > 0;
      const session: GraphExplorerState = {
        ...state,
        nodes,
        edges,
        positions,
        expansions,
        layoutSeed: originSeq,
        history:
          addedNodes || addedEdges
            ? pushHistory(state, `expanded:${action.nodeId}`)
            : state.history,
        expansionRequestIds: Object.fromEntries(
          Object.entries(state.expansionRequestIds).filter(([nodeId]) => nodeId !== action.nodeId),
        ),
      };

      return { ...session, phase: phaseFor(session) };
    }

    case 'EXPANSION_FAILED': {
      if (action.requestId !== state.expansionRequestIds[action.nodeId]) {
        return state;
      }

      return {
        ...state,
        expansions: {
          ...state.expansions,
          [action.nodeId]: {
            nodeId: action.nodeId,
            status: 'failed',
            hasMore: state.expansions[action.nodeId]?.hasMore ?? false,
            loadedCount: state.expansions[action.nodeId]?.loadedCount ?? 0,
            error: action.error,
          },
        },
        expansionRequestIds: Object.fromEntries(
          Object.entries(state.expansionRequestIds).filter(([nodeId]) => nodeId !== action.nodeId),
        ),
      };
    }

    case 'EXPANSION_COLLAPSED': {
      if (state.nodes[action.nodeId] == null) {
        return state;
      }

      const removedIds = getCollapsibleNodeIds(state, action.nodeId);

      if (removedIds.size === 0 && state.expansions[action.nodeId] == null) {
        return state;
      }

      const nodes = Object.fromEntries(
        Object.entries(state.nodes).filter(([nodeId]) => !removedIds.has(nodeId)),
      );
      const edges = Object.fromEntries(
        Object.entries(state.edges).filter(
          ([, entry]) =>
            !removedIds.has(entry.edge.sourceId) && !removedIds.has(entry.edge.targetId),
        ),
      );
      const positions = Object.fromEntries(
        Object.entries(state.positions).filter(([nodeId]) => !removedIds.has(nodeId)),
      );
      const expansions = Object.fromEntries(
        Object.entries(state.expansions).filter(([nodeId]) => !removedIds.has(nodeId)),
      );

      expansions[action.nodeId] = {
        nodeId: action.nodeId,
        status: 'unexpanded',
        hasMore: false,
        loadedCount: 0,
      };

      const fallbackId = removedIds.has(state.focusedId ?? '') ? action.nodeId : state.focusedId;
      const selectedFallback = removedIds.has(state.selectedId ?? '')
        ? action.nodeId
        : state.selectedId;
      const inspectedFallback = removedIds.has(state.inspectedId ?? '') ? null : state.inspectedId;
      const session: GraphExplorerState = {
        ...state,
        nodes,
        edges,
        positions,
        expansions,
        focusedId: fallbackId,
        selectedId: selectedFallback,
        inspectedId: inspectedFallback,
        history:
          removedIds.size > 0 ? pushHistory(state, `collapsed:${action.nodeId}`) : state.history,
      };

      return { ...session, phase: phaseFor(session) };
    }

    case 'NODE_PINNED': {
      if (state.nodes[action.nodeId] == null) {
        return state;
      }

      return {
        ...state,
        positions: {
          ...state.positions,
          [action.nodeId]: { x: action.x, y: action.y, pinning: 'user' },
        },
      };
    }

    case 'CAMERA_CHANGED':
      return { ...state, camera: action.camera };

    case 'VIEW_CHANGED':
      return { ...state, view: action.view };

    case 'DETAIL_OPENED':
      return {
        ...state,
        detail: action.request,
        history: pushHistory(state, `detail:${action.request.nodeId}`),
      };

    case 'DETAIL_CLOSED':
      return { ...state, detail: null };

    case 'HISTORY_BACK': {
      if (state.history.length === 0) {
        return createEmptyState(state.limits);
      }

      const frame = state.history[state.history.length - 1];

      if (frame == null) {
        return createEmptyState(state.limits);
      }

      return {
        ...stateFromSnapshot(frame.core, state.limits),
        history: state.history.slice(0, -1),
      };
    }

    case 'RESET':
      return createEmptyState(state.limits);

    case 'SNAPSHOT_RESTORED': {
      if (!isValidSnapshot(action.snapshot)) {
        return state;
      }

      return {
        ...stateFromSnapshot(action.snapshot, state.limits),
        history: structuredClone(action.snapshot.history),
      };
    }
  }
}

export { graphReducer, type GraphAction };
