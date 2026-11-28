import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { RefObject } from 'react';

import {
  DEFAULT_GRAPH_LIMITS,
  createEmptyState,
  createExpansionPlan,
  createSnapshot,
  getCollapsibleNodeIds,
  graphReducer,
  isValidSnapshot,
  stateFromSnapshot,
  type CameraState,
  type GraphCameraSetReason,
  type GraphChange,
  type GraphDetailTrigger,
  type GraphErrorCode,
  type GraphError,
  type GraphExplorerState,
  type GraphLimits,
  type GraphMotionConfig,
  type GraphNodeId,
  type GraphSessionSnapshot,
  type GraphView,
} from '../domain';
import type { GraphExplorerAdapter, GraphExplorerMessages } from '../ports';
import { createCameraController, horizontalLayout } from '../services';

import type { GraphActions } from './graphActions';

interface UseGraphExplorerOptions {
  /** Application-owned data source. */
  adapter: GraphExplorerAdapter;

  /** All user-facing copy. */
  messages: GraphExplorerMessages;

  /** Query used on first mount. */
  initialQuery?: string;

  /** Restored session from a detail round trip. */
  initialState?: GraphSessionSnapshot;

  /** Overrides for bounded disclosure limits. */
  limits?: Partial<GraphLimits>;

  /** Overrides for motion timing. */
  motion?: Partial<GraphMotionConfig>;

  /** Notified after every committed transition. */
  onStateChange?: (state: GraphExplorerState, change: GraphChange) => void;
}

interface GraphExplorerHandle {
  /** Read the latest committed state. */
  getState(): GraphExplorerState;

  /** Read the serializable session snapshot. */
  getSnapshot(): GraphSessionSnapshot;

  /** Move focus to the command input. */
  focusCommand(): void;

  /** Move focus to a visible node. */
  focusNode(nodeId: GraphNodeId): void;

  /** Inspect a node without changing topology. */
  inspectNode(nodeId: GraphNodeId): void;

  /** Close the preview while keeping selection and focus. */
  dismissPreview(): void;

  /** Load the first relationship page. */
  expandNode(nodeId: GraphNodeId): void;

  /** Load the next relationship page. */
  showMore(nodeId: GraphNodeId): void;

  /** Collapse one expansion. */
  collapseNode(nodeId: GraphNodeId): void;

  /** Commit a camera transform. */
  setCamera(camera: CameraState, reason: GraphCameraSetReason): void;

  /** Switch presentation surface. */
  setView(view: GraphView): void;

  /** Request a richer detail surface. */
  openDetail(nodeId: GraphNodeId): void;

  /** Restore the previous navigation step. */
  back(): void;

  /** Return to the empty session. */
  reset(): void;

  /** Restore a validated serialized session. */
  restore(snapshot: GraphSessionSnapshot): void;
}

interface UseGraphExplorerResult {
  /** Latest committed state. */
  state: GraphExplorerState;

  /** Bound commands for the view. */
  actions: GraphActions;

  /** Imperative surface for hosts and tests. */
  handle: GraphExplorerHandle;

  /** Polite and assertive announcement text. */
  announcements: { polite: string; assertive: string };

  /** Ref attached to the Explorer input by the view. */
  commandRef: RefObject<HTMLDivElement | null>;
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError';
}

function toGraphError(error: unknown, code: GraphErrorCode): GraphError {
  return {
    code,
    message: error instanceof Error ? error.message : 'Unknown error',
    retryable: true,
  };
}

function useGraphExplorer(options: UseGraphExplorerOptions): UseGraphExplorerResult {
  const { adapter, messages, initialQuery = '', initialState } = options;
  const limits = useMemo(() => ({ ...DEFAULT_GRAPH_LIMITS, ...options.limits }), [options.limits]);
  const onStateChange = options.onStateChange;

  const createInitialState = () => {
    if (initialState != null && isValidSnapshot(initialState)) {
      return stateFromSnapshot(initialState, limits);
    }

    return { ...createEmptyState(limits), query: initialQuery };
  };

  const [state, setState] = useState(createInitialState);
  const stateRef = useRef(state);

  const commandRef = useRef<HTMLDivElement | null>(null);
  const searchAbortRef = useRef<AbortController | null>(null);
  const expansionAbortRef = useRef(new Map<GraphNodeId, AbortController>());
  const searchRequestRef = useRef(0);
  const expansionRequestRef = useRef(0);
  const messagesRef = useRef(messages);
  const onStateChangeRef = useRef(onStateChange);

  messagesRef.current = messages;
  onStateChangeRef.current = onStateChange;

  const commit = useCallback((action: Parameters<typeof graphReducer>[1], change?: GraphChange) => {
    const current = stateRef.current;
    const next = graphReducer(current, action);

    if (next === current) {
      return;
    }

    stateRef.current = next;
    setState(next);

    if (change != null) {
      onStateChangeRef.current?.(next, change);
    }
  }, []);

  const camera = useMemo(
    () =>
      createCameraController({
        getCamera: () => stateRef.current.camera,
        getPosition: (nodeId) => stateRef.current.positions[nodeId],
        setCamera: (next, reason) =>
          commit(
            { type: 'CAMERA_CHANGED', camera: next, reason },
            { kind: 'camera', camera: next, reason },
          ),
      }),
    [commit],
  );

  const runSearch = useCallback(
    async (query: string, requestId: number, signal: AbortSignal) => {
      try {
        const page = await adapter.search(query, {
          signal,
          limit: stateRef.current.limits.searchResultLimit,
        });

        if (signal.aborted || requestId !== searchRequestRef.current) {
          return;
        }

        const items = page.items.slice(0, stateRef.current.limits.searchResultLimit);
        const truncated = page.total != null && page.total > items.length;

        commit(
          { type: 'SEARCH_SUCCEEDED', requestId, page },
          { kind: 'search-succeeded', count: items.length, truncated },
        );
      } catch (error) {
        if (signal.aborted || requestId !== searchRequestRef.current || isAbortError(error)) {
          return;
        }

        const graphError = toGraphError(error, 'SEARCH_FAILED');

        commit(
          { type: 'SEARCH_FAILED', requestId, error: graphError },
          { kind: 'search-failed', error: graphError },
        );
      }
    },
    [adapter, commit],
  );

  const requestRelationships = useCallback(
    async (nodeId: GraphNodeId, continuation: boolean) => {
      const current = stateRef.current;
      const expansion = current.expansions[nodeId];

      if (current.nodes[nodeId] == null || expansion?.status === 'loading') {
        return;
      }

      if (!continuation && expansion?.status === 'expanded' && !expansion.hasMore) {
        return;
      }

      if (continuation && (!expansion?.hasMore || expansion.cursor == null)) {
        return;
      }

      if ((expansion?.loadedCount ?? 0) >= current.limits.maxExpandedNeighbors) {
        return;
      }

      const previous = expansionAbortRef.current.get(nodeId);

      previous?.abort();

      const controller = new AbortController();
      const requestId = ++expansionRequestRef.current;

      expansionAbortRef.current.set(nodeId, controller);
      commit({ type: 'EXPANSION_STARTED', nodeId, requestId });

      try {
        const page = await adapter.getRelationships(nodeId, {
          signal: controller.signal,
          limit: current.limits.relationshipPageSize,
          cursor: continuation ? expansion?.cursor : undefined,
        });

        if (controller.signal.aborted || requestId !== expansionRequestRef.current) {
          return;
        }

        const beforeLayout = stateRef.current;
        const plan = createExpansionPlan(beforeLayout, nodeId, page);
        const layout = horizontalLayout({
          sourceId: nodeId,
          existingPositions: beforeLayout.positions,
          newNodes: plan.newNodes,
          newEdges: plan.newEdges,
          viewport: { width: 1200, height: 800 },
          reservedRects: [],
          config: beforeLayout.limits,
          seed: beforeLayout.layoutSeed + 1,
        });

        commit(
          { type: 'EXPANSION_SUCCEEDED', nodeId, requestId, page, layout },
          {
            kind: continuation ? 'show-more' : 'expand',
            nodeId,
            addedNodeIds: plan.newNodes.map((node) => node.id),
            addedEdgeIds: plan.newEdges.map((edge) => edge.id),
          },
        );
      } catch (error) {
        if (
          controller.signal.aborted ||
          requestId !== expansionRequestRef.current ||
          isAbortError(error)
        ) {
          return;
        }

        const graphError = toGraphError(error, 'RELATIONSHIPS_FAILED');

        commit(
          { type: 'EXPANSION_FAILED', nodeId, requestId, error: graphError },
          { kind: 'expand-failed', nodeId, error: graphError },
        );
      }
    },
    [adapter, commit],
  );

  const abortAllRequests = useCallback(() => {
    searchAbortRef.current?.abort();
    searchRequestRef.current += 1;

    for (const controller of expansionAbortRef.current.values()) {
      controller.abort();
    }

    expansionAbortRef.current.clear();
    expansionRequestRef.current += 1;
  }, []);

  const actions = useMemo<GraphActions>(
    () => ({
      setQuery: (query) => {
        searchAbortRef.current?.abort();

        const requestId = ++searchRequestRef.current;
        const controller = new AbortController();

        searchAbortRef.current = controller;
        commit({ type: 'QUERY_CHANGED', query }, { kind: 'query', query });
        commit({ type: 'SEARCH_STARTED', requestId }, { kind: 'search-started' });
        void runSearch(query, requestId, controller.signal);
      },

      selectResult: (item) => {
        const node = stateRef.current.search.items.find((candidate) => candidate.id === item.id);

        if (node == null) {
          return;
        }

        abortAllRequests();

        commit(
          { type: 'ROOT_SELECTED', node },
          { kind: 'root-replaced', nodeId: node.id, previousRootId: stateRef.current.rootId },
        );
      },

      focusNode: (nodeId) => commit({ type: 'NODE_FOCUSED', nodeId }, { kind: 'focus', nodeId }),

      inspectNode: (nodeId) => {
        if (stateRef.current.camera.zoom < 0.45) {
          camera.focusOn(nodeId);
        }

        commit({ type: 'NODE_INSPECTED', nodeId }, { kind: 'inspect', nodeId });
      },

      dismissPreview: () =>
        commit({ type: 'PREVIEW_DISMISSED' }, { kind: 'inspect', nodeId: null }),

      expandNode: (nodeId) => void requestRelationships(nodeId, false),

      showMore: (nodeId) => void requestRelationships(nodeId, true),

      collapseNode: (nodeId) => {
        const removedNodeIds = [...getCollapsibleNodeIds(stateRef.current, nodeId)];

        commit(
          { type: 'EXPANSION_COLLAPSED', nodeId },
          { kind: 'collapse', nodeId, removedNodeIds },
        );
      },

      setCamera: (next, reason) =>
        commit(
          { type: 'CAMERA_CHANGED', camera: next, reason },
          { kind: 'camera', camera: next, reason },
        ),

      panBy: (delta) => camera.panBy(delta),

      zoomTo: (zoom, anchor) => camera.zoomTo(zoom, anchor),

      focusOn: (nodeId) => camera.focusOn(nodeId),

      fitNodes: (nodeIds) => camera.fitNodes(nodeIds),

      setView: (view) => commit({ type: 'VIEW_CHANGED', view }, { kind: 'view', view }),

      openDetail: (nodeId, trigger: GraphDetailTrigger = 'programmatic') => {
        if (stateRef.current.nodes[nodeId] == null) {
          return;
        }

        const request = {
          nodeId,
          returnSnapshot: createSnapshot(stateRef.current),
          trigger,
        };

        commit({ type: 'DETAIL_OPENED', request }, { kind: 'detail', nodeId });
      },

      closeDetail: () => commit({ type: 'DETAIL_CLOSED' }, { kind: 'detail', nodeId: null }),

      back: () => {
        const history = stateRef.current.history;

        if (history.length === 0) {
          commit({ type: 'RESET' }, { kind: 'reset' });
          return;
        }

        const frame = history[history.length - 1];

        if (frame != null) {
          commit({ type: 'HISTORY_BACK' }, { kind: 'history-back', restored: frame.core });
        }
      },

      reset: () => {
        abortAllRequests();
        commit({ type: 'RESET' }, { kind: 'reset' });
      },

      restore: (snapshot) => commit({ type: 'SNAPSHOT_RESTORED', snapshot }),

      focusCommand: () => commandRef.current?.querySelector('input')?.focus(),
    }),
    [abortAllRequests, camera, commit, requestRelationships, runSearch],
  );

  const handle = useMemo<GraphExplorerHandle>(
    () => ({
      getState: () => stateRef.current,
      getSnapshot: () => createSnapshot(stateRef.current),
      focusCommand: actions.focusCommand,
      focusNode: actions.focusNode,
      inspectNode: actions.inspectNode,
      dismissPreview: actions.dismissPreview,
      expandNode: actions.expandNode,
      showMore: actions.showMore,
      collapseNode: actions.collapseNode,
      setCamera: (next, reason) => actions.setCamera(next, reason),
      setView: actions.setView,
      openDetail: (nodeId) => actions.openDetail(nodeId),
      back: actions.back,
      reset: actions.reset,
      restore: actions.restore,
    }),
    [actions],
  );

  const announcements = useMemo(() => {
    const copy = messagesRef.current;
    let polite = '';
    let assertive = '';

    if (state.search.status === 'ready') {
      polite = copy.resultCount(state.search.items.length);
    }

    if (state.search.status === 'error' && state.search.error != null) {
      assertive = copy.errorAnnouncement(state.search.error.message);
    }

    const failure = Object.values(state.expansions).find((entry) => entry.status === 'failed');

    if (failure?.error != null) {
      assertive = copy.errorAnnouncement(failure.error.message);
    }

    if (state.inspectedId != null) {
      const inspected = state.nodes[state.inspectedId];

      if (inspected != null) {
        polite = copy.previewAnnouncement(inspected.node.title);
      }
    }

    if (state.history.length > 0) {
      const root = state.rootId == null ? null : state.nodes[state.rootId];

      if (root != null && state.phase === 'root') {
        polite = copy.rootAnnouncement(root.node.title);
      }
    }

    return { polite, assertive };
  }, [state]);

  useEffect(() => {
    const isInitialQueryEmpty = initialQuery.trim().length === 0;

    if (isInitialQueryEmpty) {
      return;
    }

    const requestId = ++searchRequestRef.current;
    const controller = new AbortController();

    searchAbortRef.current = controller;
    commit({ type: 'SEARCH_STARTED', requestId }, { kind: 'search-started' });
    void runSearch(initialQuery, requestId, controller.signal);
  }, [commit, initialQuery, runSearch]);

  useEffect(
    () => () => {
      searchAbortRef.current?.abort();

      for (const controller of expansionAbortRef.current.values()) {
        controller.abort();
      }
    },
    [],
  );

  return { state, actions, handle, announcements, commandRef };
}

export { useGraphExplorer };
export type { GraphExplorerHandle, UseGraphExplorerOptions, UseGraphExplorerResult };
