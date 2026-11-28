import {
  DEFAULT_GRAPH_LIMITS,
  type CameraState,
  type ExpansionState,
  type GraphEdgeEntry,
  type GraphEdgeId,
  type GraphError,
  type GraphLimits,
  type GraphNode,
  type GraphNodeEntry,
  type GraphNodeId,
  type NodePosition,
} from './entities';
import type {
  GraphCameraReason,
  GraphDetailTrigger,
  GraphErrorCode,
  GraphPhase,
  GraphSearchStatus,
  GraphView,
} from './options';

interface GraphSearchState {
  /** Current command result lifecycle. */
  status: GraphSearchStatus;

  /** Results available to the command surface. */
  items: GraphNode[];

  /** Whether more command results are available. */
  hasMore: boolean;

  /** Present when `status` is `error`. */
  error?: GraphError;
}

/** Complete runtime state of the graph layer. */
interface GraphExplorerState {
  /** High-level session stage. */
  phase: GraphPhase;

  /** Current command query. */
  query: string;

  /** Command result state. */
  search: GraphSearchState;

  /** Root node of the current session. */
  rootId: GraphNodeId | null;

  /** Node with keyboard focus, when focus is inside the graph. */
  focusedId: GraphNodeId | null;

  /** Node selected by the latest inspection or result selection. */
  selectedId: GraphNodeId | null;

  /** Node shown in the preview surface. */
  inspectedId: GraphNodeId | null;

  /** Visible nodes keyed by stable ID. */
  nodes: Record<GraphNodeId, GraphNodeEntry>;

  /** Visible edges keyed by stable ID. */
  edges: Record<GraphEdgeId, GraphEdgeEntry>;

  /** Stored positions for visible nodes. */
  positions: Record<GraphNodeId, NodePosition>;

  /** Expansion lifecycle per expanded node. */
  expansions: Record<GraphNodeId, ExpansionState>;

  /** Current 2D camera transform. */
  camera: CameraState;

  /** Active presentation surface. */
  view: GraphView;

  /** Seed used by the next deterministic layout pass. */
  layoutSeed: number;

  /** Undoable navigation frames. */
  history: HistoryFrame[];

  /** Pending richer detail request. */
  detail: DetailRequest | null;

  /** Effective disclosure limits. */
  limits: GraphLimits;

  /** Latest search request token. */
  searchRequestId: number;

  /** Latest expansion request token per node. */
  expansionRequestIds: Record<GraphNodeId, number>;
}

/** Serializable session core with no cyclic history. */
interface GraphSnapshotCore {
  /** Snapshot schema version. */
  version: 1;

  /** Command query at capture time. */
  query: string;

  /** Root node of the session. */
  rootId: GraphNodeId | null;

  /** Focused node at capture time. */
  focusedId: GraphNodeId | null;

  /** Selected node at capture time. */
  selectedId: GraphNodeId | null;

  /** Inspected node at capture time. */
  inspectedId: GraphNodeId | null;

  /** Visible nodes and their provenance. */
  nodes: Record<GraphNodeId, GraphNodeEntry>;

  /** Visible edges and their provenance. */
  edges: Record<GraphEdgeId, GraphEdgeEntry>;

  /** Stored node positions. */
  positions: Record<GraphNodeId, NodePosition>;

  /** Expansion lifecycles. */
  expansions: Record<GraphNodeId, ExpansionState>;

  /** Camera transform. */
  camera: CameraState;

  /** Presentation surface. */
  view: GraphView;

  /** Seed for the next layout pass. */
  layoutSeed: number;
}

/** One undoable navigation step. */
interface HistoryFrame {
  /** Stable frame identity. */
  id: string;

  /** Human-readable label supplied by the controller. */
  label: string;

  /** Session state captured at this step. */
  core: GraphSnapshotCore;
}

/** Full serializable session, including history. */
interface GraphSessionSnapshot extends GraphSnapshotCore {
  /** Undoable navigation frames. */
  history: HistoryFrame[];
}

/** Request emitted when a node asks for a richer detail surface. */
interface DetailRequest {
  /** Node to present. */
  nodeId: GraphNodeId;

  /** Snapshot the application passes back when returning. */
  returnSnapshot: GraphSessionSnapshot;

  /** Source of the request. */
  trigger: GraphDetailTrigger;
}

/** Cause emitted with a committed state transition. */
type GraphChange =
  | { kind: 'query'; query: string }
  | { kind: 'search-started' }
  | { kind: 'search-succeeded'; count: number; truncated: boolean }
  | { kind: 'search-failed'; error: GraphError }
  | { kind: 'root-replaced'; nodeId: GraphNodeId; previousRootId: GraphNodeId | null }
  | { kind: 'focus'; nodeId: GraphNodeId | null }
  | { kind: 'select'; nodeId: GraphNodeId | null }
  | { kind: 'inspect'; nodeId: GraphNodeId | null }
  | {
      kind: 'expand';

      nodeId: GraphNodeId;

      addedNodeIds: GraphNodeId[];

      addedEdgeIds: GraphEdgeId[];
    }
  | { kind: 'show-more'; nodeId: GraphNodeId; addedNodeIds: GraphNodeId[] }
  | { kind: 'expand-failed'; nodeId: GraphNodeId; error: GraphError }
  | { kind: 'collapse'; nodeId: GraphNodeId; removedNodeIds: GraphNodeId[] }
  | { kind: 'camera'; camera: CameraState; reason: GraphCameraReason }
  | { kind: 'view'; view: GraphView }
  | { kind: 'history-back'; restored: GraphSnapshotCore }
  | { kind: 'detail'; nodeId: GraphNodeId | null }
  | { kind: 'reset' };

function cloneEntries<T>(entries: Record<string, T>): Record<string, T> {
  return Object.fromEntries(
    Object.entries(entries).map(([id, entry]) => [id, structuredClone(entry)]),
  );
}

function clonePositions(positions: Record<GraphNodeId, NodePosition>) {
  return Object.fromEntries(
    Object.entries(positions).map(([id, position]) => [id, { ...position }]),
  );
}

function createEmptyState(limits: GraphLimits = DEFAULT_GRAPH_LIMITS): GraphExplorerState {
  return {
    phase: 'empty',
    query: '',
    search: { status: 'idle', items: [], hasMore: false },
    rootId: null,
    focusedId: null,
    selectedId: null,
    inspectedId: null,
    nodes: {},
    edges: {},
    positions: {},
    expansions: {},
    camera: { center: { x: 0, y: 0 }, zoom: 1 },
    view: 'canvas',
    layoutSeed: 0,
    history: [],
    detail: null,
    limits,
    searchRequestId: 0,
    expansionRequestIds: {},
  };
}

function createSnapshotCore(state: GraphExplorerState): GraphSnapshotCore {
  return {
    version: 1,
    query: state.query,
    rootId: state.rootId,
    focusedId: state.focusedId,
    selectedId: state.selectedId,
    inspectedId: state.inspectedId,
    nodes: cloneEntries(state.nodes),
    edges: cloneEntries(state.edges),
    positions: clonePositions(state.positions),
    expansions: cloneEntries(state.expansions),
    camera: { center: { ...state.camera.center }, zoom: state.camera.zoom },
    view: state.view,
    layoutSeed: state.layoutSeed,
  };
}

function createSnapshot(state: GraphExplorerState): GraphSessionSnapshot {
  return {
    ...createSnapshotCore(state),
    history: structuredClone(state.history),
  };
}

function createHistoryFrame(state: GraphExplorerState, label: string): HistoryFrame {
  const sequence =
    state.history.reduce((highest, frame) => {
      const value = Number(frame.id.split('-').at(-1));

      return Number.isFinite(value) ? Math.max(highest, value) : highest;
    }, 0) + 1;

  return {
    id: `frame-${sequence}`,
    label,
    core: createSnapshotCore(state),
  };
}

function pushHistory(state: GraphExplorerState, label: string): HistoryFrame[] {
  return [...state.history, createHistoryFrame(state, label)].slice(-state.limits.maxHistoryDepth);
}

function stateFromSnapshot(
  snapshot: GraphSnapshotCore,
  limits: GraphLimits = DEFAULT_GRAPH_LIMITS,
): GraphExplorerState {
  const state = createEmptyState(limits);
  const isExploring = snapshot.rootId != null && Object.keys(snapshot.nodes).length > 1;
  const phase = snapshot.rootId == null ? 'empty' : isExploring ? 'exploring' : 'root';

  return {
    ...state,
    phase,
    query: snapshot.query,
    rootId: snapshot.rootId,
    focusedId: snapshot.focusedId,
    selectedId: snapshot.selectedId,
    inspectedId: snapshot.inspectedId,
    nodes: structuredClone(snapshot.nodes),
    edges: structuredClone(snapshot.edges),
    positions: clonePositions(snapshot.positions),
    expansions: structuredClone(snapshot.expansions),
    camera: { center: { ...snapshot.camera.center }, zoom: snapshot.camera.zoom },
    view: snapshot.view,
    layoutSeed: snapshot.layoutSeed,
  };
}

function abortedError(): GraphError {
  return { code: 'ABORTED' as GraphErrorCode, message: 'Request aborted', retryable: false };
}

export {
  abortedError,
  createEmptyState,
  createHistoryFrame,
  createSnapshot,
  createSnapshotCore,
  pushHistory,
  stateFromSnapshot,
  type DetailRequest,
  type GraphChange,
  type GraphExplorerState,
  type GraphSearchState,
  type GraphSessionSnapshot,
  type GraphSnapshotCore,
  type HistoryFrame,
};
