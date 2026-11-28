import type {
  GraphExplorerAdapter,
  GraphExplorerMessages,
  GraphNode,
  GraphRelationship,
} from '../src/index';

const atlas: GraphNode = {
  id: 'atlas',
  title: 'Atlas',
  type: 'Concept',
  description: 'A living map of related ideas',
};

const navigation: GraphNode = {
  id: 'navigation',
  title: 'Spatial navigation',
  type: 'Concept',
};

const disclosure: GraphNode = {
  id: 'disclosure',
  title: 'Progressive disclosure',
  type: 'Principle',
};

const signal: GraphNode = {
  id: 'signal',
  title: 'Signal',
  type: 'Concept',
};

function rejectIfAborted(signal: AbortSignal) {
  if (signal.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }
}

const adapter: GraphExplorerAdapter = {
  async search(query, options) {
    rejectIfAborted(options.signal);

    const candidates = [atlas, navigation, disclosure, signal];
    const items = candidates.filter((node) =>
      `${node.title} ${node.description ?? ''}`.toLowerCase().includes(query.toLowerCase()),
    );

    return { items: items.slice(0, options.limit), hasMore: false };
  },

  async getRelationships(nodeId, options) {
    rejectIfAborted(options.signal);

    if (nodeId !== atlas.id) {
      return { items: [], hasMore: false };
    }

    const relationships: GraphRelationship[] = [
      {
        edge: {
          id: 'atlas-navigation',
          sourceId: atlas.id,
          targetId: navigation.id,
          relation: 'uses',
        },
        relatedNode: navigation,
        relatedEndpoint: 'target',
      },
      {
        edge: {
          id: 'atlas-disclosure',
          sourceId: atlas.id,
          targetId: disclosure.id,
          relation: 'reveals',
        },
        relatedNode: disclosure,
        relatedEndpoint: 'target',
      },
    ];

    return { items: relationships.slice(0, options.limit), hasMore: false };
  },
};

const messages: GraphExplorerMessages = {
  searchLabel: 'Search ideas',
  searchPlaceholder: 'Search for an idea',
  clearSearchLabel: 'Clear search',
  resultsLabel: 'Search results',
  loadingMessage: 'Searching',
  emptyMessage: 'No results',
  graphLabel: 'Idea map',
  graphHint: 'Use arrow keys to move between ideas. Press e to expand.',
  nodeListLabel: 'Ideas',
  listViewLabel: 'List view',
  canvasViewLabel: 'Map view',
  inspectActionLabel: 'Inspect',
  expandActionLabel: 'Expand',
  collapseActionLabel: 'Collapse',
  showMoreActionLabel: 'Show more',
  detailActionLabel: 'Open detail',
  backActionLabel: 'Back',
  resetActionLabel: 'Reset',
  rootLabel: 'Root',
  relationshipLabel: 'Relationship',
  previewLabel: 'Idea preview',
  loadingRelationshipsMessage: 'Loading relationships',
  emptyRelationshipsMessage: 'No relationships',
  relationshipsErrorMessage: 'Relationships failed to load',
  retryLabel: 'Retry',
  detailReturnLabel: 'Return to map',
  resultCount: (count) => `${count} results`,
  truncatedResultCount: (shown, total) => `Showing ${shown} of ${total} results`,
  relationshipCount: (count, title) => `${count} relationships for ${title}`,
  rootAnnouncement: (title) => `${title} is now the root`,
  expansionAnnouncement: (title, count) => `${count} relationships revealed for ${title}`,
  previewAnnouncement: (title) => `Previewing ${title}`,
  errorAnnouncement: (message) => `Error: ${message}`,
};

export { adapter, messages };
