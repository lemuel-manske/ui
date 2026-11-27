import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { Explorer } from './Explorer';

const messages = {
  searchLabel: 'Search',
  searchPlaceholder: 'Search…',
  clearSearchLabel: 'Clear search',
  resultsLabel: 'Search results',
  loadingMessage: 'Searching…',
  emptyMessage: 'No results found.',
};

const results = [
  {
    id: 'website',
    label: 'example.org',
    description: 'Website',
    group: 'Websites',
  },
  {
    id: 'documents',
    label: '/documents',
    description: 'A page on example.org',
    group: 'Pages',
  },
  {
    id: 'about',
    label: '/about',
    description: 'A page on example.org',
    group: 'Pages',
  },
];

const meta = {
  title: 'Components/Explorer',
  component: Explorer,
  tags: ['autodocs'],
  args: {
    query: '',
    messages,
    onQueryChange: () => {},
    results,
  },
} satisfies Meta<typeof Explorer>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithResults: Story = {
  args: { query: 'example' },
};

export const Loading: Story = {
  args: { query: 'example', loading: true },
};

export const Empty: Story = {
  args: { query: 'unknown', results: [] },
};

function InteractiveExample() {
  const [query, setQuery] = useState('');

  const filteredResults = results.filter((item) =>
    `${item.label} ${item.description ?? ''}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Explorer
      query={query}
      results={filteredResults}
      messages={messages}
      onQueryChange={setQuery}
      onSelect={(item) => setQuery(item.label)}
    />
  );
}

export const Interactive: Story = { render: () => <InteractiveExample /> };

export default meta;
