import type { KeyboardEvent } from 'react';

import type {
  ExpansionState,
  GraphNode as GraphNodeEntity,
  GraphNodeId,
  NodePosition,
} from '../domain';
import { handleGraphKeyDown, type GraphActions } from '../controller';
import type { GraphExplorerMessages } from '../ports';

import { getActionAccessibleName } from './a11y';
import styles from './GraphExplorer.module.css';

interface GraphNodeProps {
  /** Node display data. */
  node: GraphNodeEntity;

  /** Stored graph-space position. */
  position: NodePosition;

  /** Expansion lifecycle for this node. */
  expansion?: ExpansionState;

  /** Whether this node owns the roving tab stop. */
  isTabStop: boolean;

  /** Whether this node is selected. */
  selected: boolean;

  /** Focused node supplied to the keyboard policy. */
  focusedId: GraphNodeId | null;

  /** Root node supplied to the keyboard policy. */
  rootId: GraphNodeId | null;

  /** Stable reading order supplied to the keyboard policy. */
  nodeIds: GraphNodeId[];

  /** Whether an inline detail surface is open. */
  detailOpen: boolean;

  /** Whether the preview is open. */
  previewOpen: boolean;

  /** All user-facing copy. */
  messages: GraphExplorerMessages;

  /** Bound graph commands. */
  actions: GraphActions;
}

function GraphNode(props: GraphNodeProps) {
  const {
    actions,
    detailOpen,
    expansion,
    focusedId,
    isTabStop,
    messages,
    node,
    nodeIds,
    position,
    previewOpen,
    rootId,
    selected,
  } = props;
  const state = expansion?.status ?? 'unexpanded';
  const statusText =
    state === 'failed'
      ? messages.relationshipsErrorMessage
      : messages.relationshipCount(expansion?.loadedCount ?? 0, node.title);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    handleGraphKeyDown(event, actions, {
      detailOpen,
      focusedId,
      nodeIds,
      previewOpen,
      rootId,
    });
  }

  return (
    <div
      className={styles.nodeContainer}
      style={{ left: `calc(50% + ${position.x}px)`, top: `calc(50% + ${position.y}px)` }}
    >
      <button
        type="button"
        className={styles.node}
        aria-label={`${node.title} ${node.type}`}
        aria-current={selected ? true : undefined}
        tabIndex={isTabStop ? 0 : -1}
        onFocus={() => actions.focusNode(node.id)}
        onClick={() => actions.inspectNode(node.id)}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.nodeMarker} aria-hidden="true">
          <span />
        </span>
      </button>

      <span className={styles.nodeLabel}>
        <span className={styles.nodeTitle}>{node.title}</span>
        <span className={styles.nodeType}>{node.type}</span>
      </span>

      {state === 'unexpanded' || state === 'failed' ? (
        <button
          type="button"
          className={styles.nodeAction}
          aria-label={getActionAccessibleName(messages.expandActionLabel, node.title)}
          aria-expanded={false}
          onClick={() => actions.expandNode(node.id)}
        >
          {messages.expandActionLabel}
        </button>
      ) : null}

      {state === 'expanded' ? (
        <button
          type="button"
          className={styles.nodeAction}
          aria-label={getActionAccessibleName(messages.collapseActionLabel, node.title)}
          aria-expanded={true}
          onClick={() => actions.collapseNode(node.id)}
        >
          {messages.collapseActionLabel}
        </button>
      ) : null}

      {state === 'loading' ? (
        <span className={styles.nodeStatus} role="status">
          {messages.loadingRelationshipsMessage}
        </span>
      ) : null}

      {state === 'failed' ? (
        <button
          type="button"
          className={styles.nodeAction}
          onClick={() => actions.expandNode(node.id)}
        >
          {messages.retryLabel}
        </button>
      ) : null}

      <span className={styles.visuallyHidden}>{statusText}</span>
    </div>
  );
}

export { GraphNode };
export type { GraphNodeProps };
