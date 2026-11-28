import type { KeyboardEvent } from 'react';

import type { GraphNodeId } from '../domain';

import type { GraphActions } from './graphActions';

interface GraphKeyboardContext {
  /** Stable reading order for visible nodes. */
  nodeIds: GraphNodeId[];

  /** Currently focused node. */
  focusedId: GraphNodeId | null;

  /** Root of the current session. */
  rootId: GraphNodeId | null;

  /** Whether an inline detail surface is open. */
  detailOpen: boolean;

  /** Whether the preview surface is open. */
  previewOpen: boolean;
}

function moveFocus(
  actions: GraphActions,
  nodeIds: GraphNodeId[],
  focusedId: GraphNodeId | null,
  offset: number,
) {
  if (nodeIds.length === 0) {
    return;
  }

  const current = focusedId == null ? -1 : nodeIds.indexOf(focusedId);
  const next = (current + offset + nodeIds.length) % nodeIds.length;
  const target = nodeIds[next];

  if (target != null) {
    actions.focusNode(target);
  }
}

function handleGraphKeyDown(
  event: KeyboardEvent<HTMLElement>,
  actions: GraphActions,
  context: GraphKeyboardContext,
) {
  const { detailOpen, focusedId, nodeIds, previewOpen, rootId } = context;

  if (event.key === 'Escape') {
    event.preventDefault();

    if (detailOpen) {
      actions.closeDetail();
    } else if (previewOpen) {
      actions.dismissPreview();
    } else {
      actions.focusCommand();
    }

    return;
  }

  if (focusedId == null) {
    return;
  }

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault();
      moveFocus(actions, nodeIds, focusedId, -1);
      return;

    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault();
      moveFocus(actions, nodeIds, focusedId, 1);
      return;

    case 'Home': {
      event.preventDefault();
      const target = nodeIds[0];

      if (target != null) {
        actions.focusNode(target);
      }

      return;
    }

    case 'End': {
      event.preventDefault();
      const target = nodeIds[nodeIds.length - 1];

      if (target != null) {
        actions.focusNode(target);
      }

      return;
    }

    case 'Enter':
    case ' ':
      event.preventDefault();
      actions.inspectNode(focusedId);
      return;

    case 'e':
      event.preventDefault();
      actions.expandNode(focusedId);
      return;

    case 'c':
      event.preventDefault();
      actions.collapseNode(focusedId);
      return;

    case 'd':
      event.preventDefault();
      actions.openDetail(focusedId, 'keyboard');
      return;

    case '+':
      event.preventDefault();
      actions.zoomTo(1.2);
      return;

    case '-':
      event.preventDefault();
      actions.zoomTo(0.8);
      return;

    case '0':
      event.preventDefault();

      if (rootId != null) {
        actions.focusOn(rootId);
      }

      return;
  }
}

export { handleGraphKeyDown };
export type { GraphKeyboardContext };
