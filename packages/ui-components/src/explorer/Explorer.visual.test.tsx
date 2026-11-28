import { expect, visualTest as test } from '@lemuel-manske/config-playwright';

import { Explorer } from './Explorer';

import { ControlledExplorer } from './ControlledExplorer';

import { CompletionExplorer, ExplorerSurface } from './Explorer.visual.test-fixture';

import type { ExplorerMessages } from './types';

const messages: ExplorerMessages = {
  searchLabel: 'Search',

  searchPlaceholder: 'Search…',

  clearSearchLabel: 'Clear search',

  resultsLabel: 'Search results',

  loadingMessage: 'Searching…',

  emptyMessage: 'No results found.',
};

test('Explorer initial state is stable', async ({ render }) => {
  const explorer = await render(
    <ExplorerSurface>
      <ControlledExplorer />
    </ExplorerSurface>,
  );

  await expect(explorer).toHaveScreenshot('initial-state.png');
});

test('Explorer focused state is stable', async ({ render }) => {
  const explorer = await render(
    <ExplorerSurface>
      <ControlledExplorer />
    </ExplorerSurface>,
  );

  await explorer.getByRole('combobox', { name: messages.searchLabel }).focus();

  await expect(explorer).toHaveScreenshot('focused-state.png');
});

test('Explorer typing state is stable', async ({ render }) => {
  const explorer = await render(
    <ExplorerSurface>
      <ControlledExplorer />
    </ExplorerSurface>,
  );

  await explorer.getByRole('combobox', { name: messages.searchLabel }).fill('fir');

  await expect(explorer.getByRole('listbox', { name: messages.resultsLabel })).toBeVisible();

  await expect(explorer).toHaveScreenshot('typing-state.png');
});

test('Explorer pointer active option state is stable', async ({ render }) => {
  const explorer = await render(
    <ExplorerSurface>
      <ControlledExplorer />
    </ExplorerSurface>,
  );

  await explorer.getByRole('combobox', { name: messages.searchLabel }).fill('results');

  await explorer.getByRole('option', { name: 'Second result' }).hover();

  await expect(explorer).toHaveScreenshot('pointer-active-option-state.png');
});

test('Explorer keyboard active option state is stable', async ({ render, page }) => {
  const explorer = await render(
    <ExplorerSurface>
      <ControlledExplorer />
    </ExplorerSurface>,
  );

  await explorer.getByRole('combobox', { name: messages.searchLabel }).fill('results');

  await page.keyboard.press('ArrowDown');

  await expect(explorer).toHaveScreenshot('keyboard-active-option-state.png');
});

test('Explorer pointer selection completion state is stable', async ({ render, page }) => {
  const explorer = await render(<CompletionExplorer />);

  await explorer.getByRole('combobox', { name: messages.searchLabel }).fill('first');

  await explorer.getByRole('option', { name: 'First result First description' }).click();

  await page.keyboard.press('Escape');

  await expect(explorer).toHaveScreenshot('pointer-selection-completion-state.png');
});

test('Explorer keyboard selection completion state is stable', async ({ render, page }) => {
  const explorer = await render(<CompletionExplorer />);

  await explorer.getByRole('combobox', { name: messages.searchLabel }).fill('results');

  await page.keyboard.press('ArrowDown');

  await page.keyboard.press('Enter');

  await page.keyboard.press('Escape');

  await expect(explorer).toHaveScreenshot('keyboard-selection-completion-state.png');
});

test('Explorer dismissed results state is stable', async ({ render, page }) => {
  const explorer = await render(
    <ExplorerSurface>
      <ControlledExplorer />
    </ExplorerSurface>,
  );

  await explorer.getByRole('combobox', { name: messages.searchLabel }).fill('first');

  await page.keyboard.press('Escape');

  await expect(explorer).toHaveScreenshot('dismissed-results-state.png');
});

test('Explorer cleared state is stable', async ({ render }) => {
  const explorer = await render(
    <ExplorerSurface>
      <ControlledExplorer />
    </ExplorerSurface>,
  );

  await explorer.getByRole('combobox', { name: messages.searchLabel }).fill('first');

  await explorer.getByRole('button', { name: messages.clearSearchLabel }).click();

  await expect(explorer).toHaveScreenshot('cleared-state.png');
});

test('Explorer loading state is stable', async ({ render }) => {
  const explorer = await render(
    <ExplorerSurface>
      <Explorer query="first" loading messages={messages} onQueryChange={() => {}} />
    </ExplorerSurface>,
  );

  await expect(explorer.getByRole('status')).toBeVisible();

  await expect(explorer).toHaveScreenshot('loading-state.png');
});

test('Explorer empty results state is stable', async ({ render }) => {
  const explorer = await render(
    <ExplorerSurface>
      <Explorer query="unknown" results={[]} messages={messages} onQueryChange={() => {}} />
    </ExplorerSurface>,
  );

  await expect(explorer.getByText(messages.emptyMessage)).toBeVisible();

  await expect(explorer).toHaveScreenshot('empty-results-state.png');
});
