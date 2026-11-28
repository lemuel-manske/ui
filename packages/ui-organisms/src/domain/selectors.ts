import type { GraphEdge, GraphNode, GraphNodeId } from './entities';
import type { GraphNodeAppearance, GraphView, GraphZoomBand } from './options';
import type { GraphExplorerState } from './state';

function getZoomBand(state: GraphExplorerState): GraphZoomBand {
  if (state.camera.zoom < 0.45) {
    return 'far';
  }

  if (state.camera.zoom >= 1.35) {
    return 'close';
  }

  return 'mid';
}

function getNodeAppearance(state: GraphExplorerState, nodeId: GraphNodeId): GraphNodeAppearance {
  if (state.focusedId === nodeId) {
    return 'focused';
  }

  if (state.selectedId === nodeId) {
    return 'selected';
  }

  if (state.expansions[nodeId]?.status === 'expanded') {
    return 'expanded';
  }

  if (state.rootId === nodeId || state.view === ('list' as GraphView)) {
    return 'contextual';
  }

  return 'available';
}

function getNodeOrder(state: GraphExplorerState): GraphNodeId[] {
  if (state.rootId == null || state.nodes[state.rootId] == null) {
    return Object.keys(state.nodes);
  }

  const ordered: GraphNodeId[] = [state.rootId];
  const visited = new Set(ordered);
  const queue = [state.rootId];

  while (queue.length > 0) {
    const current = queue.shift();

    if (current == null) {
      break;
    }

    for (const edge of Object.values(state.edges)) {
      const next =
        edge.edge.sourceId === current
          ? edge.edge.targetId
          : edge.edge.targetId === current
            ? edge.edge.sourceId
            : null;

      if (next == null || visited.has(next) || state.nodes[next] == null) {
        continue;
      }

      visited.add(next);
      ordered.push(next);
      queue.push(next);
    }
  }

  for (const nodeId of Object.keys(state.nodes)) {
    if (!visited.has(nodeId)) {
      ordered.push(nodeId);
    }
  }

  return ordered;
}

function getVisibleNodes(state: GraphExplorerState): GraphNode[] {
  return getNodeOrder(state).flatMap((nodeId) => {
    const entry = state.nodes[nodeId];

    return entry == null ? [] : [entry.node];
  });
}

function getVisibleEdges(state: GraphExplorerState): GraphEdge[] {
  return Object.values(state.edges).flatMap((entry) => {
    const source = state.nodes[entry.edge.sourceId];
    const target = state.nodes[entry.edge.targetId];

    return source != null && target != null ? [entry.edge] : [];
  });
}

export { getNodeAppearance, getNodeOrder, getVisibleEdges, getVisibleNodes, getZoomBand };
