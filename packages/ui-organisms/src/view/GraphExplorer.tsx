import { useId, useImperativeHandle, useRef, useEffect } from 'react';

import type { ReactElement, Ref } from 'react';

import type { DetailRequest, GraphSessionSnapshot } from '../domain';
import { getNodeOrder } from '../domain';
import { useGraphExplorer } from '../controller';
import type { GraphExplorerHandle } from '../controller';
import type { GraphChange, GraphExplorerState, GraphLimits, GraphMotionConfig } from '../domain';
import type { GraphExplorerAdapter, GraphExplorerMessages, GraphResultItem } from '../ports';

import { GraphCanvas } from './GraphCanvas';
import { GraphDetail } from './GraphDetail';
import { NodePreview } from './NodePreview';
import { RelatedItemsList } from './RelatedItemsList';
import { toExplorerItem, toExplorerMessages } from './explorer/GraphCommandAdapter';
import { Button, Explorer } from './primitives';
import styles from './GraphExplorer.module.css';

type DetailNavigation =
  | { mode: 'route'; onOpen: (request: DetailRequest) => void }
  | {
      mode: 'inline';

      render: (request: DetailRequest, actions: { close: () => void }) => ReactElement;
    }
  | { mode: 'disabled' };

interface GraphExplorerProps {
  /**
   * Application-owned source of search results and relationships.
   * @remarks Type `GraphExplorerAdapter`. Must supply stable IDs and honor `AbortSignal`.
   * @default required
   */
  adapter: GraphExplorerAdapter;

  /**
   * All user-facing copy, including fields required by Explorer.
   * @remarks Type `GraphExplorerMessages`. Inherited Explorer messages pass through untouched.
   * @default required
   */
  messages: GraphExplorerMessages;

  /**
   * Query used on first mount.
   * @remarks Type `string`.
   * @default ''
   */
  initialQuery?: string;

  /**
   * Restored session from a detail round trip.
   * @remarks Type `GraphSessionSnapshot`. Invalid snapshots are ignored.
   * @default undefined
   */
  initialState?: GraphSessionSnapshot;

  /**
   * How full detail is presented.
   * @remarks Type `DetailNavigation`.
   * @default { mode: 'disabled' }
   */
  detail?: DetailNavigation;

  /**
   * Overrides for bounded disclosure limits.
   * @remarks Type `Partial<GraphLimits>`.
   * @default DEFAULT_GRAPH_LIMITS
   */
  limits?: Partial<GraphLimits>;

  /**
   * Overrides for motion duration and easing.
   * @remarks Type `Partial<GraphMotionConfig>`.
   * @default DEFAULT_GRAPH_MOTION
   */
  motion?: Partial<GraphMotionConfig>;

  /**
   * Notified after every committed state transition.
   * @remarks Type `(state, change) => void`. Aborted requests are never reported.
   * @default undefined
   */
  onStateChange?: (state: GraphExplorerState, change: GraphChange) => void;

  /**
   * Imperative handle for hosts and tests.
   * @remarks Type `Ref<GraphExplorerHandle>`.
   * @default undefined
   */
  graphRef?: Ref<GraphExplorerHandle>;
}

function GraphExplorer(props: GraphExplorerProps) {
  const {
    adapter,
    detail = { mode: 'disabled' },
    graphRef,
    initialQuery,
    initialState,
    limits,
    messages,
    motion,
    onStateChange,
  } = props;
  const { actions, announcements, commandRef, handle, state } = useGraphExplorer({
    adapter,
    initialQuery,
    initialState,
    limits,
    messages,
    motion,
    onStateChange,
  });

  useImperativeHandle(graphRef, () => handle, [handle]);

  const hintId = useId();
  const detailRef = useRef(detail);

  detailRef.current = detail;

  const nodeIds = getNodeOrder(state);
  const results = state.search.items.map(toExplorerItem);

  useEffect(() => {
    const request = state.detail;
    const navigation = detailRef.current;

    if (request != null && navigation.mode === 'route') {
      navigation.onOpen(request);
    }
  }, [state.detail]);

  const detailEnabled = detail.mode !== 'disabled';

  return (
    <div className={styles.explorer} data-atlas-explorer>
      <div
        ref={commandRef}
        className={`${styles.command} ${state.rootId == null ? styles.commandCentered : ''}`}
        data-atlas-command
        data-atlas-root={state.rootId != null ? 'true' : 'false'}
      >
        <Explorer
          query={state.query}
          results={results}
          messages={toExplorerMessages(messages)}
          loading={state.search.status === 'loading'}
          onQueryChange={actions.setQuery}
          onSelect={(item: GraphResultItem) => actions.selectResult(item)}
        />
      </div>

      {state.rootId != null && (
        <div className={styles.toolbar} data-atlas-toolbar>
          <Button
            variant="secondary"
            aria-pressed={state.view === 'list'}
            onClick={() => actions.setView(state.view === 'canvas' ? 'list' : 'canvas')}
          >
            {state.view === 'canvas' ? messages.listViewLabel : messages.canvasViewLabel}
          </Button>

          <Button variant="secondary" onClick={actions.back}>
            {messages.backActionLabel}
          </Button>

          <Button variant="secondary" onClick={actions.reset}>
            {messages.resetActionLabel}
          </Button>
        </div>
      )}

      <div className={styles.live} role="status">
        {announcements.polite}
      </div>

      <div className={styles.live} role="alert">
        {announcements.assertive}
      </div>

      {state.view === 'canvas' ? (
        <GraphCanvas
          actions={actions}
          hintId={hintId}
          messages={messages}
          nodeIds={nodeIds}
          state={state}
        />
      ) : (
        <RelatedItemsList
          actions={actions}
          detailEnabled={detailEnabled}
          messages={messages}
          nodeIds={nodeIds}
          state={state}
        />
      )}

      {state.view === 'canvas' &&
        state.inspectedId != null &&
        (() => {
          const node = state.nodes[state.inspectedId];

          return node == null ? null : (
            <NodePreview
              actions={actions}
              detailEnabled={detailEnabled}
              expansion={state.expansions[node.node.id]}
              messages={messages}
              node={node.node}
            />
          );
        })()}

      {state.detail != null && detail.mode === 'inline' && (
        <GraphDetail
          actions={actions}
          messages={messages}
          render={detail.render}
          request={state.detail}
        />
      )}
    </div>
  );
}

export { GraphExplorer };
export type { DetailNavigation, GraphExplorerProps };
