import type { GraphExplorerState, GraphNodeId } from '../domain';
import { getVisibleEdges, getZoomBand } from '../domain';
import type { GraphActions } from '../controller';
import type { GraphExplorerMessages } from '../ports';

import { GraphEdge } from './GraphEdge';
import { GraphNode } from './GraphNode';
import { getGraphEdgeAccent } from './options';
import styles from './GraphExplorer.module.css';

interface GraphCanvasProps {
  /** Current graph state. */
  state: GraphExplorerState;

  /** Stable reading order. */
  nodeIds: GraphNodeId[];

  /** ID of the visually hidden graph hint. */
  hintId: string;

  /** All user-facing copy. */
  messages: GraphExplorerMessages;

  /** Bound graph commands. */
  actions: GraphActions;
}

function GraphCanvas(props: GraphCanvasProps) {
  const { actions, hintId, messages, nodeIds, state } = props;
  const edges = getVisibleEdges(state);
  const zoomBand = getZoomBand(state);
  const defaultTabStop = nodeIds[0] ?? null;

  return (
    <div
      className={styles.canvas}
      role="region"
      aria-label={messages.graphLabel}
      aria-describedby={hintId}
    >
      <p id={hintId} className={styles.visuallyHidden}>
        {messages.graphHint}
      </p>

      <div
        className={styles.surface}
        style={{
          transform: `translate(${-state.camera.center.x}px, ${-state.camera.center.y}px) scale(${state.camera.zoom})`,
        }}
      >
        {edges.map((edge, index) => {
          const source = state.positions[edge.sourceId];
          const target = state.positions[edge.targetId];

          if (source == null || target == null) {
            return null;
          }

          return (
            <GraphEdge
              key={edge.id}
              accent={getGraphEdgeAccent(index)}
              edge={edge}
              source={source}
              target={target}
              showLabel={zoomBand === 'close'}
            />
          );
        })}

        {nodeIds.map((nodeId) => {
          const entry = state.nodes[nodeId];

          if (entry == null) {
            return null;
          }

          const position = state.positions[nodeId] ?? { x: 0, y: 0, pinning: 'layout' };
          const isTabStop =
            state.focusedId === nodeId || (state.focusedId == null && nodeId === defaultTabStop);

          return (
            <GraphNode
              key={nodeId}
              node={entry.node}
              position={position}
              expansion={state.expansions[nodeId]}
              focusedId={state.focusedId}
              isTabStop={isTabStop}
              selected={state.selectedId === nodeId}
              rootId={state.rootId}
              nodeIds={nodeIds}
              detailOpen={state.detail != null}
              previewOpen={state.inspectedId != null}
              messages={messages}
              actions={actions}
            />
          );
        })}
      </div>
    </div>
  );
}

export { GraphCanvas };
export type { GraphCanvasProps };
