import type { ReactElement } from 'react';

import type { DetailRequest } from '../domain';
import type { GraphActions } from '../controller';
import type { GraphExplorerMessages } from '../ports';

import { Button } from './primitives';
import styles from './GraphExplorer.module.css';

interface GraphDetailProps {
  /** Detail request containing the return snapshot. */
  request: DetailRequest;

  /** Host renderer for the inline detail surface. */
  render: (request: DetailRequest, actions: { close: () => void }) => ReactElement;

  /** All user-facing copy. */
  messages: GraphExplorerMessages;

  /** Bound graph commands. */
  actions: GraphActions;
}

function GraphDetail(props: GraphDetailProps) {
  const { actions, messages, render, request } = props;

  return (
    <section
      className={styles.detail}
      role="region"
      aria-label={`${messages.detailReturnLabel} ${request.nodeId}`}
    >
      <Button variant="secondary" onClick={actions.back}>
        {messages.detailReturnLabel}
      </Button>

      {render(request, { close: () => actions.closeDetail() })}
    </section>
  );
}

export { GraphDetail };
export type { GraphDetailProps };
