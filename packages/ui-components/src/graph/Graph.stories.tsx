import type { Meta, StoryObj } from '@storybook/react-vite';

import { Graph } from './Graph';

const nodes = [
  { id: 'entry', label: 'Entry point', description: 'Start here' },
  { id: 'concepts', label: 'Concepts', description: 'Core ideas' },
  { id: 'examples', label: 'Examples', description: 'Applied patterns' },
  { id: 'references', label: 'References', description: 'Related material' },
];

const edges = [
  { id: 'entry-concepts', source: 'entry', target: 'concepts' },
  { id: 'entry-examples', source: 'entry', target: 'examples' },
  { id: 'concepts-references', source: 'concepts', target: 'references' },
];

const meta = {
  title: 'Components/Graph',
  component: Graph,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Knowledge graph',
    nodes,
    edges,
  },
} satisfies Meta<typeof Graph>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FocusedNode: Story = {
  args: { focusedNodeId: 'concepts' },
};

export const DisclosedNeighborhood: Story = {
  args: { visibleNodeIds: ['entry', 'concepts', 'examples'] },
};

export default meta;
