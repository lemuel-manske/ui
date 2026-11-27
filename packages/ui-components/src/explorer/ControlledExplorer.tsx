import { useState } from 'react';

import { Explorer } from './Explorer';

import type { ExplorerItem } from './types';

const messages = {
  searchLabel: 'Search',
  searchPlaceholder: 'Search…',
  clearSearchLabel: 'Clear search',
  resultsLabel: 'Search results',
  loadingMessage: 'Searching…',
  emptyMessage: 'No results found.',
};

const results: ExplorerItem[] = [
  { id: 'first', label: 'First result', description: 'First description', group: 'Pages' },
  { id: 'second', label: 'Second result', group: 'Pages' },
];

function ControlledExplorer({ onSelect }: { onSelect?: (item: ExplorerItem) => void }) {
  const [query, setQuery] = useState('');

  return (
    <Explorer
      query={query}
      results={results}
      messages={messages}
      onQueryChange={setQuery}
      onSelect={onSelect}
    />
  );
}

export { ControlledExplorer };
