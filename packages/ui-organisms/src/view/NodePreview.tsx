import type { ExpansionState, GraphNode } from '../domain';
import type { GraphActions } from '../controller';
import type { GraphExplorerMessages } from '../ports';

import { getActionAccessibleName } from './a11y';
import { Button, Text } from './primitives';
import styles from './GraphExplorer.module.css';

interface NodePreviewProps {
  /** Node shown in the preview. */
  node: GraphNode;

  /** Expansion lifecycle for the node. */
  expansion?: ExpansionState;

  /** Whether a richer detail surface is available. */
  detailEnabled: boolean;

  /** All user-facing copy. */
  messages: GraphExplorerMessages;

  /** Bound graph commands. */
  actions: GraphActions;
}

function NodePreview(props: NodePreviewProps) {
  const { actions, detailEnabled, expansion, messages, node } = props;

  return (
    <section className={styles.preview} role="group" aria-label={messages.previewLabel}>
      <h2 className={styles.previewTitle}>
        <Text as="span" size="medium">
          {node.title}
        </Text>
      </h2>

      <Text as="p" size="small">
        {node.type}
      </Text>

      {node.description != null && (
        <Text as="p" size="small">
          {node.description}
        </Text>
      )}

      <Text as="p" size="small">
        {expansion?.status === 'expanded' && expansion.loadedCount === 0
          ? messages.emptyRelationshipsMessage
          : messages.relationshipCount(expansion?.loadedCount ?? 0, node.title)}
      </Text>

      {expansion?.hasMore === true && (
        <Button
          variant="secondary"
          onClick={() => actions.showMore(node.id)}
          aria-label={getActionAccessibleName(messages.showMoreActionLabel, node.title)}
        >
          {messages.showMoreActionLabel}
        </Button>
      )}

      {detailEnabled && (
        <Button
          variant="secondary"
          onClick={() => actions.openDetail(node.id, 'preview-action')}
          aria-label={getActionAccessibleName(messages.detailActionLabel, node.title)}
        >
          {messages.detailActionLabel}
        </Button>
      )}
    </section>
  );
}

export { NodePreview };
export type { NodePreviewProps };
