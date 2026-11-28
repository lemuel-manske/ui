type GraphEdgeAccent = 'primary' | 'secondary' | 'tertiary';

function getGraphEdgeAccent(index: number): GraphEdgeAccent {
  switch (index % 3) {
    case 0:
      return 'primary';

    case 1:
      return 'secondary';

    default:
      return 'tertiary';
  }
}

export { getGraphEdgeAccent };
export type { GraphEdgeAccent };
