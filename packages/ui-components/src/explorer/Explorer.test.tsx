import { expect, test } from '@lemuel-manske/config-playwright';

import { useState } from 'react';

import { Explorer } from './Explorer';
import { useExplorer } from './useExplorer';

const messages = {
  searchLabel: 'Search',
  searchPlaceholder: 'Search…',
  clearSearchLabel: 'Clear search',
  resultsLabel: 'Search results',
  loadingMessage: 'Searching…',
  emptyMessage: 'No results found.',
};

const results = [
  { id: 'first', label: 'First result', description: 'First description', group: 'Pages' },
  { id: 'second', label: 'Second result', group: 'Pages' },
];

function ControlledExplorer({
  onSelect,
}: {
  onSelect?: (item: (typeof results)[number]) => void;
}) {
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

test('Explorer renders a persistent search input with application-provided messages', async ({ render }) => {
  const explorer = await render(
    <Explorer query="" messages={messages} onQueryChange={() => {}} />,
  );

  await expect(explorer.getByRole('combobox', { name: messages.searchLabel })).toHaveAttribute(
    'placeholder',
    messages.searchPlaceholder,
  );
});

test('Explorer reports query changes', async ({ render }) => {
  let query = '';

  const explorer = await render(
    <Explorer query={query} messages={messages} onQueryChange={(value) => (query = value)} />,
  );

  await explorer.getByRole('combobox', { name: messages.searchLabel }).fill('example');

  await expect.poll(() => query).toBe('example');
});

test('Explorer displays application-supplied results for a query', async ({ render }) => {
  const explorer = await render(
    <Explorer query="first" results={results} messages={messages} onQueryChange={() => {}} />,
  );

  await expect(explorer.getByRole('listbox', { name: messages.resultsLabel })).toBeVisible();
  await expect(explorer.getByRole('option', { name: 'First result First description' })).toBeVisible();
});

test('Explorer selects a result on pointer activation', async ({ render }) => {
  let selectedId = '';

  const explorer = await render(
    <Explorer
      query="first"
      results={results}
      messages={messages}
      onQueryChange={() => {}}
      onSelect={(item) => (selectedId = item.id)}
    />,
  );

  await explorer.getByRole('option', { name: 'First result First description' }).click();

  await expect.poll(() => selectedId).toBe('first');
});

test('Explorer supports arrow-key navigation and Enter selection', async ({ render, page }) => {
  let selectedId = '';

  const explorer = await render(
    <Explorer
      query="results"
      results={results}
      messages={messages}
      onQueryChange={() => {}}
      onSelect={(item) => (selectedId = item.id)}
    />,
  );

  const input = explorer.getByRole('combobox', { name: messages.searchLabel });

  await input.focus();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  await expect.poll(() => selectedId).toBe('second');
});

test('Explorer dismisses results with Escape and restores them when the query changes', async ({
  render,
  page,
}) => {
  const explorer = await render(<ControlledExplorer />);

  const input = explorer.getByRole('combobox', { name: messages.searchLabel });

  await input.fill('first');
  await expect(explorer.getByRole('option')).toHaveCount(2);

  await page.keyboard.press('Escape');

  await expect(explorer.getByRole('option')).toHaveCount(0);

  await input.fill('second');

  await expect(explorer.getByRole('option')).toHaveCount(2);
});

test('Explorer clears the query using the localized action label', async ({ render }) => {
  const explorer = await render(<ControlledExplorer />);

  const input = explorer.getByRole('combobox', { name: messages.searchLabel });

  await input.fill('first');
  await explorer.getByRole('button', { name: messages.clearSearchLabel }).click();

  await expect(input).toHaveValue('');
});

test('Explorer exposes localized loading and empty states', async ({ render }) => {
  const loading = await render(
    <Explorer query="first" loading messages={messages} onQueryChange={() => {}} />,
  );

  await expect(loading.getByRole('status')).toHaveText(messages.loadingMessage);

  const empty = await render(
    <Explorer query="unknown" results={[]} messages={messages} onQueryChange={() => {}} />,
  );

  await expect(empty.getByText(messages.emptyMessage)).toBeVisible();
});

test('useExplorer exposes interaction state and actions independently of the UI', async ({ render }) => {
  function Harness() {
    const [query, setQuery] = useState('first');
    const state = useExplorer({
      query,
      results,
      onQueryChange: setQuery,
    });

    return (
      <>
        <input aria-label="Hook query" value={query} onChange={(event) => setQuery(event.target.value)} />
        <button type="button" onClick={() => state.handleQueryChange('second')}>Change query</button>
        <button type="button" onClick={() => state.setActiveIndex(1)}>Activate second</button>
        <output>{state.activeItem?.id}</output>
        <output>{String(state.isOpen)}</output>
      </>
    );
  }

  const harness = await render(<Harness />);

  await expect(harness.getByText('first')).toBeVisible();
  await harness.getByRole('button', { name: 'Activate second' }).click();
  await expect(harness.getByText('second')).toBeVisible();

  await harness.getByRole('button', { name: 'Change query' }).click();
  await expect(harness.getByRole('textbox', { name: 'Hook query' })).toHaveValue('second');
  await expect(harness.getByText('true')).toBeVisible();
});

test('Explorer has no accessibility violations', async ({ render, page }) => {
  await render(
    <Explorer
      query="first"
      results={results}
      messages={messages}
      onQueryChange={() => {}}
    />,
  );

  await expect(page).noAccessibilityViolations();
});
