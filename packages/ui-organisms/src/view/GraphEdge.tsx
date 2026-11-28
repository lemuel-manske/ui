import type { GraphEdge as GraphEdgeEntity, Point } from '../domain';

import type { GraphEdgeAccent } from './options';

import styles from './GraphExplorer.module.css';

interface GraphEdgeProps {
  /** Relationship to render. */
  edge: GraphEdgeEntity;

  /** Source position in graph units. */
  source: Point;

  /** Target position in graph units. */
  target: Point;

  /** Accent assigned to the relationship. */
  accent: GraphEdgeAccent;

  /** Whether the relationship label should be rendered. */
  showLabel: boolean;
}

function getAccentClass(accent: GraphEdgeAccent): string {
  switch (accent) {
    case 'primary':
      return styles.edgePrimary;

    case 'secondary':
      return styles.edgeSecondary;

    default:
      return styles.edgeTertiary;
  }
}

function GraphEdge(props: GraphEdgeProps) {
  const { accent, edge, showLabel, source, target } = props;
  const midX = (source.x + target.x) / 2;
  const path =
    `M ${source.x} ${source.y} C ${midX} ${source.y}, ` +
    `${midX} ${target.y}, ${target.x} ${target.y}`;

  return (
    <svg
      className={`${styles.edge} ${getAccentClass(accent)}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />

      {showLabel && (
        <text
          className={styles.edgeLabel}
          x={(source.x + target.x) / 2}
          y={(source.y + target.y) / 2 - 8}
          textAnchor="middle"
        >
          {edge.relation}
        </text>
      )}
    </svg>
  );
}

export { GraphEdge };
export type { GraphEdgeProps };
