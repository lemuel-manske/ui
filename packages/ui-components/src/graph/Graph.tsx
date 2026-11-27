import type { GraphProps } from './types';

import styles from './Graph.module.css';

/** Spatial presentation of a graph supplied by the consuming application. */
function Graph({
  nodes,
  edges = [],
  visibleNodeIds,
  focusedNodeId,
  'aria-label': ariaLabel = 'Graph',
  onFocusNode,
  onExpand,
  renderNodeContent,
}: GraphProps) {
  const visibleNodes =
    visibleNodeIds == null ? nodes : nodes.filter((node) => visibleNodeIds.includes(node.id));

  const visibleIds = new Set(visibleNodes.map((node) => node.id));
  const columns = Math.max(1, Math.ceil(Math.sqrt(visibleNodes.length)));
  const positions = new Map(
    visibleNodes.map((node, index) => [
      node.id,
      {
        x: (index % columns) * 220 + 110,
        y: Math.floor(index / columns) * 150 + 64,
      },
    ]),
  );

  const visibleEdges = edges.filter(
    (edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target),
  );
  const canvasWidth = columns * 220;
  const canvasHeight = Math.max(1, Math.ceil(visibleNodes.length / columns)) * 150;

  return (
    <section aria-label={ariaLabel} className={styles.graph}>
      <svg
        aria-hidden="true"
        className={styles.edges}
        style={{ width: canvasWidth, height: canvasHeight }}
      >
        {visibleEdges.map((edge) => {
          const source = positions.get(edge.source);
          const target = positions.get(edge.target);

          if (source == null || target == null) {
            return null;
          }

          return (
            <line
              key={edge.id}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              className={styles.edge}
            />
          );
        })}
      </svg>

      <div className={styles.nodes} style={{ width: canvasWidth, height: canvasHeight }}>
        {visibleNodes.map((node) => {
          const position = positions.get(node.id);

          if (position == null) {
            return null;
          }

          return (
            <button
              key={node.id}
              type="button"
              className={styles.node}
              data-focused={focusedNodeId === node.id || undefined}
              data-node-type={node.type}
              style={{ left: position.x, top: position.y }}
              onFocus={() => onFocusNode?.(node.id)}
              onClick={() => onExpand?.(node.id)}
              aria-label={node.description ? `${node.label}: ${node.description}` : node.label}
            >
              <span className={styles.label}>{node.label}</span>

              {node.description != null && (
                <span className={styles.description}>{node.description}</span>
              )}

              {renderNodeContent?.(node)}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export { Graph };
