import { expect, test } from '@lemuel-manske/config-playwright';

import type { GraphExplorerState } from './index';

import { AtlasGraph } from '../preview/AtlasGraph';

import { messages } from './GraphExplorer.test-fixture';

test('GraphExplorer starts with one command input and an empty canvas', async ({ render }) => {
  const graph = await render(<AtlasGraph />);

  await expect(graph.getByRole('combobox', { name: messages.searchLabel })).toBeVisible();
  await expect(graph.getByRole('region', { name: messages.graphLabel })).toBeVisible();
  await expect(graph.getByRole('combobox')).toHaveCount(1);
});

test('GraphExplorer creates exactly one root node when a result is selected', async ({
  render,
}) => {
  const capture = captureState();
  const graph = await render(<AtlasGraph onStateChange={capture.onStateChange} />);

  await graph.getByRole('combobox', { name: messages.searchLabel }).fill('atlas');
  await graph.getByRole('option', { name: /Atlas/ }).click();

  await expect.poll(() => Object.keys(capture.read()?.nodes ?? {})).toEqual(['atlas']);
});

test('GraphExplorer repeated result selection does not duplicate the root', async ({ render }) => {
  const capture = captureState();
  const graph = await render(<AtlasGraph onStateChange={capture.onStateChange} />);

  const input = graph.getByRole('combobox', { name: messages.searchLabel });

  await input.fill('atlas');
  await graph.getByRole('option', { name: /Atlas/ }).click();

  await input.fill('atlas');
  await graph.getByRole('option', { name: /Atlas/ }).click();

  await expect.poll(() => Object.keys(capture.read()?.nodes ?? {})).toEqual(['atlas']);
});

test('GraphExplorer inspecting a node does not change topology', async ({ render }) => {
  const capture = captureState();
  const graph = await render(<AtlasGraph onStateChange={capture.onStateChange} />);

  await graph.getByRole('combobox', { name: messages.searchLabel }).fill('atlas');
  await graph.getByRole('option', { name: /Atlas/ }).click();
  await expect.poll(() => capture.read()?.phase).toBe('root');

  const nodeCount = Object.keys(capture.read()?.nodes ?? {}).length;
  const edgeCount = Object.keys(capture.read()?.edges ?? {}).length;

  await graph.getByRole('button', { name: 'Atlas Concept' }).click();

  await expect(graph.getByRole('group', { name: messages.previewLabel })).toBeVisible();
  await expect.poll(() => Object.keys(capture.read()?.nodes ?? {}).length).toBe(nodeCount);
  await expect.poll(() => Object.keys(capture.read()?.edges ?? {}).length).toBe(edgeCount);
});

test('GraphExplorer expansion reveals only fixture relationships', async ({ render }) => {
  const capture = captureState();
  const graph = await render(<AtlasGraph onStateChange={capture.onStateChange} />);

  await graph.getByRole('combobox', { name: messages.searchLabel }).fill('atlas');
  await graph.getByRole('option', { name: /Atlas/ }).click();
  await expect.poll(() => capture.read()?.phase).toBe('root');

  await graph.getByRole('button', { name: 'Expand Atlas' }).click();

  await expect
    .poll(() => Object.keys(capture.read()?.nodes ?? {}))
    .toEqual(['atlas', 'navigation', 'disclosure']);
  await expect
    .poll(() => Object.keys(capture.read()?.edges ?? {}))
    .toEqual(['atlas-navigation', 'atlas-disclosure']);
});

test('GraphExplorer reset returns to the empty session', async ({ render }) => {
  const capture = captureState();
  const graph = await render(<AtlasGraph onStateChange={capture.onStateChange} />);

  const input = graph.getByRole('combobox', { name: messages.searchLabel });

  await input.fill('atlas');
  await graph.getByRole('option', { name: /Atlas/ }).click();
  await expect.poll(() => capture.read()?.phase).toBe('root');

  await graph.getByRole('button', { name: messages.resetActionLabel }).click();

  await expect(input).toHaveValue('');
  await expect.poll(() => Object.keys(capture.read()?.nodes ?? {})).toEqual([]);
});

test('GraphExplorer expansion preserves existing node positions', async ({ render }) => {
  const capture = captureState();
  const graph = await render(<AtlasGraph onStateChange={capture.onStateChange} />);

  await graph.getByRole('combobox', { name: messages.searchLabel }).fill('atlas');
  await graph.getByRole('option', { name: /Atlas/ }).click();
  await expect.poll(() => capture.read()?.phase).toBe('root');

  const rootPosition = capture.read()?.positions.atlas;

  await graph.getByRole('button', { name: 'Expand Atlas' }).click();

  await expect.poll(() => capture.read()?.positions.atlas).toEqual(rootPosition);
});

test('GraphExplorer list view exposes the same expansion behavior', async ({ render }) => {
  const capture = captureState();
  const graph = await render(<AtlasGraph onStateChange={capture.onStateChange} />);

  await graph.getByRole('combobox', { name: messages.searchLabel }).fill('atlas');
  await graph.getByRole('option', { name: /Atlas/ }).click();
  await expect.poll(() => capture.read()?.phase).toBe('root');

  await graph.getByRole('button', { name: messages.listViewLabel }).click();
  await expect(graph.getByRole('list', { name: messages.nodeListLabel })).toBeVisible();

  await graph.getByRole('button', { name: /Expand Atlas/ }).click();

  await expect.poll(() => Object.keys(capture.read()?.nodes ?? {}).length).toBe(3);
});

test('GraphExplorer announces command result counts', async ({ render }) => {
  const graph = await render(<AtlasGraph />);

  await graph.getByRole('combobox', { name: messages.searchLabel }).fill('atlas');

  await expect(graph.getByText('1 results')).toBeVisible();
});

test('GraphExplorer completes a full flow without accessibility violations', async ({
  render,
  page,
}) => {
  const graph = await render(<AtlasGraph />);

  await graph.getByRole('combobox', { name: messages.searchLabel }).fill('atlas');
  await graph.getByRole('option', { name: /Atlas/ }).click();
  await graph.getByRole('button', { name: 'Atlas Concept' }).click();
  await graph.getByRole('button', { name: 'Expand Atlas' }).click();

  await expect(graph.getByRole('button', { name: 'Collapse Atlas' })).toBeVisible();
  await expect(page).noAccessibilityViolations();
});

function captureState() {
  let state: GraphExplorerState | undefined;

  return {
    onStateChange: (next: GraphExplorerState) => {
      state = next;
    },
    read: () => state,
  };
}
