import { expect, test } from '@lemuel-manske/config-playwright';

import { useState } from 'react';

import { Explorer } from './Explorer';

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
      onQueryChange={setQuery}
      onSelect={onSelect}
    />
  );
}

test('Explorer renders a persistent search input', async ({ render }) => {
  const explorer = await render(
    <Explorer query="" onQueryChange={() => {}} />,
  );

  await expect(explorer.getByRole('combobox', { name: 'Search' })).toBeVisible();
});

test('Explorer reports query changes', async ({ render }) => {
  let query = '';

  const explorer = await render(
    <Explorer query={query} onQueryChange={(value) => (query = value)} />,
  );

  await explorer.getByRole('combobox', { name: 'Search' }).fill('example');

  await expect.poll(() => query).toBe('example');
});

test('Explorer displays application-supplied results for a query', async ({ render }) => {
  const explorer = await render(
    <Explorer query="first" results={results} onQueryChange={() => {}} />,
  );

  await expect(explorer.getByRole('option', { name: 'First result First description' })).toBeVisible();
});

test('Explorer selects a result on pointer activation', async ({ render }) => {
  let selectedId = '';

  const explorer = await render(
    <Explorer
      query="first"
      results={results}
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
      onQueryChange={() => {}}
      onSelect={(item) => (selectedId = item.id)}
    />,
  );

  const input = explorer.getByRole('combobox', { name: 'Search' });

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

  const input = explorer.getByRole('combobox', { name: 'Search' });

  await input.fill('first');
  await expect(explorer.getByRole('option')).toHaveCount(2);

  await page.keyboard.press('Escape');

  await expect(explorer.getByRole('option')).toHaveCount(0);

  await input.fill('second');

  await expect(explorer.getByRole('option')).toHaveCount(2);
});

test('Explorer clears the query', async ({ render }) => {
  const explorer = await render(<ControlledExplorer />);

  const input = explorer.getByRole('combobox', { name: 'Search' });

  await input.fill('first');
  await explorer.getByRole('button', { name: 'Clear search' }).click();

  await expect(input).toHaveValue('');
});

test('Explorer exposes loading and empty states', async ({ render }) => {
  const loading = await render(
    <Explorer query="first" loading onQueryChange={() => {}} />,
  );

  await expect(loading.getByRole('status')).toHaveText('Searching...');

  const empty = await render(
    <Explorer query="unknown" results={[]} onQueryChange={() => {}} />,
  );

  await expect(empty.getByText('No results found.')).toBeVisible();
});

test('Explorer has no accessibility violations', async ({ render, page }) => {
  await render(
    <Explorer
      query="first"
      results={results}
      onQueryChange={() => {}}
      aria-label="Explore the archive"
    />,
  );

  await expect(page).noAccessibilityViolations();
});
