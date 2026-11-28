import type { GraphExplorerState, GraphNodeId } from '../domain';
import type { GraphActions } from '../controller';
import type { GraphExplorerMessages } from '../ports';

import { getActionAccessibleName, getNodeAccessibleName } from './a11y';
import { Button, Text } from './primitives';
import styles from './GraphExplorer.module.css';

interface RelatedItemsListProps {
  /** Current graph state. */
  state: GraphExplorerState;

  /** Stable reading order. */
  nodeIds: GraphNodeId[];

  /** Whether a richer detail surface is available. */
  detailEnabled: boolean;

  /** All user-facing copy. */
  messages: GraphExplorerMessages;

  /** Bound graph commands. */
  actions: GraphActions;
}

function RelatedItemsList(props: RelatedItemsListProps) {
  const { actions, detailEnabled, messages, nodeIds, state } = props;

  return (
    <ul role="list" aria-label={messages.nodeListLabel} className={styles.nodeList}>
      {nodeIds.map((nodeId) => {
        const entry = state.nodes[nodeId];

        if (entry == null) {
          return null;
        }

        const node = entry.node;
        const expansion = state.expansions[nodeId];
        const label = getNodeAccessibleName(node);

        return (
          <li key={nodeId} className={styles.nodeListItem}>
            <Button
              variant="tertiary"
              onClick={() => actions.inspectNode(nodeId)}
              aria-label={label}
            >
              {label}
            </Button>

            <Button
              variant="tertiary"
              aria-expanded={expansion?.status === 'expanded'}
              aria-label={getActionAccessibleName(messages.expandActionLabel, label)}
              onClick={() => actions.expandNode(nodeId)}
            >
              {messages.expandActionLabel}
            </Button>

            {expansion?.status === 'expanded' && (
              <Button
                variant="tertiary"
                aria-label={getActionAccessibleName(messages.collapseActionLabel, label)}
                onClick={() => actions.collapseNode(nodeId)}
              >
                {messages.collapseActionLabel}
              </Button>
            )}

            {expansion?.hasMore === true && (
              <Button
                variant="tertiary"
                aria-label={getActionAccessibleName(messages.showMoreActionLabel, label)}
                onClick={() => actions.showMore(nodeId)}
              >
                {messages.showMoreActionLabel}
              </Button>
            )}

            {detailEnabled && (
              <Button
                variant="tertiary"
                aria-label={getActionAccessibleName(messages.detailActionLabel, label)}
                onClick={() => actions.openDetail(nodeId, 'list-view')}
              >
                {messages.detailActionLabel}
              </Button>
            )}

            <Text as="span" size="small">
              {messages.relationshipCount(expansion?.loadedCount ?? 0, node.title)}
            </Text>
          </li>
        );
      })}
    </ul>
  );
}

export { RelatedItemsList };
export type { RelatedItemsListProps };
