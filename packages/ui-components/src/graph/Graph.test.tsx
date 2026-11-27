import { expect, test } from '@lemuel-manske/config-playwright';

import { Graph } from './Graph';

const nodes = [
  { id: 'entry', label: 'Entry point' },
  { id: 'concepts', label: 'Concepts' },
];

const edges = [{ id: 'entry-concepts', source: 'entry', target: 'concepts' }];

test('Graph renders supplied nodes', async ({ render }) => {
  const graph = await render(<Graph nodes={nodes} edges={edges} />);

  await expect(graph.getByRole('button', { name: 'Entry point' })).toBeVisible();
  await expect(graph.getByRole('button', { name: 'Concepts' })).toBeVisible();
});

test('Graph only renders disclosed nodes when visibility is controlled', async ({ render }) => {
  const graph = await render(<Graph nodes={nodes} visibleNodeIds={['entry']} />);

  await expect(graph.getByRole('button', { name: 'Entry point' })).toBeVisible();
  await expect(graph.getByRole('button', { name: 'Concepts' })).toHaveCount(0);
});

test('Graph reports the focused node', async ({ render }) => {
  let focusedNodeId = '';

  const graph = await render(
    <Graph nodes={nodes} onFocusNode={(nodeId) => (focusedNodeId = nodeId)} />,
  );

  await graph.getByRole('button', { name: 'Concepts' }).focus();

  await expect.poll(() => focusedNodeId).toBe('concepts');
});

test('Graph requests expansion when a node is activated', async ({ render }) => {
  let expandedNodeId = '';

  const graph = await render(
    <Graph nodes={nodes} onExpand={(nodeId) => (expandedNodeId = nodeId)} />,
  );

  await graph.getByRole('button', { name: 'Entry point' }).click();

  await expect.poll(() => expandedNodeId).toBe('entry');
});

test('Graph supports keyboard activation', async ({ render, page }) => {
  let expandedNodeId = '';

  const graph = await render(
    <Graph nodes={nodes} onExpand={(nodeId) => (expandedNodeId = nodeId)} />,
  );

  await graph.getByRole('button', { name: 'Entry point' }).focus();
  await page.keyboard.press('Enter');

  await expect.poll(() => expandedNodeId).toBe('entry');
});

test('Graph has no accessibility violations', async ({ render, page }) => {
  await render(<Graph nodes={nodes} edges={edges} aria-label="Knowledge graph" />);

  await expect(page).noAccessibilityViolations();
});
