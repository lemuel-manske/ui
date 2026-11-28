import type { GraphNode, GraphExplorerState } from '../../domain';
import type { GraphExplorerMessages, GraphResultItem } from '../../ports';
import type { ExplorerItem, ExplorerMessages } from '../primitives';

function toExplorerItem(node: GraphNode): GraphResultItem {
  return {
    id: node.id,
    label: node.title,
    description: node.description,
    group: node.type,
  };
}

function toExplorerMessages(messages: GraphExplorerMessages): ExplorerMessages {
  return {
    searchLabel: messages.searchLabel,
    searchPlaceholder: messages.searchPlaceholder,
    clearSearchLabel: messages.clearSearchLabel,
    resultsLabel: messages.resultsLabel,
    loadingMessage: messages.loadingMessage,
    emptyMessage: messages.emptyMessage,
  };
}

function findResultNode(state: GraphExplorerState, item: ExplorerItem) {
  return state.search.items.find((node) => node.id === item.id);
}

export { findResultNode, toExplorerItem, toExplorerMessages };
