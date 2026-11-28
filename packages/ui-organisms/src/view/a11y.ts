import type { GraphNode } from '../domain';

function getNodeAccessibleName(node: GraphNode) {
  return `${node.title}, ${node.type}`;
}

function getActionAccessibleName(label: string, title: string) {
  return `${label} ${title}`;
}

export { getActionAccessibleName, getNodeAccessibleName };
