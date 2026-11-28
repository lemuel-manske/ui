import type {
  GraphEdge,
  GraphExplorerAdapter,
  GraphExplorerMessages,
  GraphNode,
  GraphNodeEntry,
  GraphRelationship,
  GraphSessionSnapshot,
} from '../src/index';

const site: GraphNode = {
  id: 'site-n3wth',
  title: 'n3wth.com',
  type: 'site',
  description: 'A captured website and its evolving paths',
  metadata: { captured: '2026-11-24', captures: '24' },
};

const about: GraphNode = {
  id: 'path-about',
  title: '/about',
  type: 'path',
  description: 'The people and ideas behind the site',
  metadata: { captures: '4' },
};

const work: GraphNode = {
  id: 'path-work',
  title: '/work',
  type: 'path',
  description: 'Projects captured over time',
  metadata: { captures: '7' },
};

const thinking: GraphNode = {
  id: 'path-thinking',
  title: '/thinking',
  type: 'path',
  description: 'Notes, experiments, and essays',
  metadata: { captures: '5' },
};

const projects: GraphNode = {
  id: 'path-work-projects',
  title: '/work/projects',
  type: 'path',
  description: 'A deeper branch of the work archive',
  metadata: { captures: '3' },
};

const notes: GraphNode = {
  id: 'path-thinking-notes',
  title: '/thinking/notes',
  type: 'path',
  description: 'A deeper branch of the thinking archive',
  metadata: { captures: '6' },
};

const relationship = (
  id: string,
  sourceId: string,
  targetId: string,
  relation: string,
  relatedNode: GraphNode,
): GraphRelationship => ({
  edge: { id, sourceId, targetId, relation },
  relatedEndpoint: 'target',
  relatedNode,
});

const siteRelationships = [
  relationship('site-about', site.id, about.id, 'contains', about),
  relationship('site-work', site.id, work.id, 'contains', work),
  relationship('site-thinking', site.id, thinking.id, 'contains', thinking),
];

const pathRelationships: Record<string, GraphRelationship[]> = {
  [about.id]: [],
  [work.id]: [relationship('work-projects', work.id, projects.id, 'continues', projects)],
  [thinking.id]: [relationship('thinking-notes', thinking.id, notes.id, 'continues', notes)],
};

function nodeEntry(node: GraphNode, origins: GraphNodeEntry['origins']): GraphNodeEntry {
  return { node, origins };
}

function relationshipEntry(item: GraphRelationship): {
  edge: GraphEdge;
  entry: GraphNodeEntry;
} {
  const origin = {
    kind: 'relationship' as const,
    viaNodeId: item.edge.sourceId,
    viaEdgeId: item.edge.id,
    seq: 1,
  };

  return {
    edge: item.edge,
    entry: nodeEntry(item.relatedNode, [origin]),
  };
}

const initialState: GraphSessionSnapshot = {
  version: 1,
  query: '',
  rootId: site.id,
  focusedId: site.id,
  selectedId: site.id,
  inspectedId: null,
  nodes: {
    [site.id]: nodeEntry(site, [{ kind: 'root', seq: 0 }]),
    [about.id]: relationshipEntry(siteRelationships[0]).entry,
    [work.id]: relationshipEntry(siteRelationships[1]).entry,
    [thinking.id]: relationshipEntry(siteRelationships[2]).entry,
  },
  edges: Object.fromEntries(
    siteRelationships.map((item) => [
      item.edge.id,
      {
        edge: item.edge,
        origins: [
          {
            kind: 'relationship' as const,
            viaNodeId: site.id,
            viaEdgeId: item.edge.id,
            seq: 1,
          },
        ],
      },
    ]),
  ),
  positions: {
    [site.id]: { x: -180, y: 0, pinning: 'layout' },
    [about.id]: { x: 80, y: -170, pinning: 'layout' },
    [work.id]: { x: 80, y: 0, pinning: 'layout' },
    [thinking.id]: { x: 80, y: 170, pinning: 'layout' },
  },
  expansions: {
    [site.id]: { nodeId: site.id, status: 'expanded', hasMore: false, loadedCount: 3 },
  },
  camera: { center: { x: 0, y: 0 }, zoom: 1 },
  view: 'canvas',
  layoutSeed: 1,
  history: [],
};

const messages: GraphExplorerMessages = {
  searchLabel: 'Search archive',
  searchPlaceholder: 'Search site, path, or capture',
  clearSearchLabel: 'Clear search',
  resultsLabel: 'Archive results',
  loadingMessage: 'Searching archive',
  emptyMessage: 'No archive results',
  graphLabel: 'Archive graph',
  graphHint: 'Use arrow keys to move between archive nodes. Press e to expand a branch.',
  nodeListLabel: 'Archive nodes',
  listViewLabel: 'List view',
  canvasViewLabel: 'Graph view',
  inspectActionLabel: 'Inspect',
  expandActionLabel: 'Expand',
  collapseActionLabel: 'Collapse',
  showMoreActionLabel: 'Show more',
  detailActionLabel: 'Open capture',
  backActionLabel: 'Back',
  resetActionLabel: 'Reset',
  rootLabel: 'Root',
  relationshipLabel: 'Branch',
  previewLabel: 'Archive preview',
  loadingRelationshipsMessage: 'Loading branches',
  emptyRelationshipsMessage: 'No deeper branches',
  relationshipsErrorMessage: 'Branches failed to load',
  retryLabel: 'Retry',
  detailReturnLabel: 'Return to graph',
  resultCount: (count) => `${count} results`,
  truncatedResultCount: (shown, total) => `Showing ${shown} of ${total} results`,
  relationshipCount: (count, title) => `${count} branches from ${title}`,
  rootAnnouncement: (title) => `${title} is now the root`,
  expansionAnnouncement: (title, count) => `${count} branches revealed from ${title}`,
  previewAnnouncement: (title) => `Previewing ${title}`,
  errorAnnouncement: (message) => `Archive error: ${message}`,
};

const adapter: GraphExplorerAdapter = {
  async search(query, options) {
    if (options.signal.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    const candidates = [site, about, work, thinking, projects, notes];
    const normalizedQuery = query.toLowerCase();
    const items = candidates.filter((node) =>
      `${node.title} ${node.description ?? ''}`.toLowerCase().includes(normalizedQuery),
    );

    return { items: items.slice(0, options.limit), hasMore: false };
  },

  async getRelationships(nodeId, options) {
    if (options.signal.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    return {
      items: (nodeId === site.id ? siteRelationships : (pathRelationships[nodeId] ?? [])).slice(
        0,
        options.limit,
      ),
      hasMore: false,
    };
  },
};

export { adapter, initialState, messages };
