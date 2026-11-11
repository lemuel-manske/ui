import { expect, test } from '@lemuel-manske/config-playwright';

import { archiveTheme, libraryTheme } from '@lemuel-manske/design-tokens';

import { Link } from '../link/Link';
import { Theme } from '../theme/Theme';

import { List, ListItem } from './List';

test('List preserves the supplied item order', async ({ render }) => {
  const list = await render(
    <List aria-label="Features">
      <List.Item>Reusable components</List.Item>

      <ListItem>Shared design tokens</ListItem>
    </List>,
  );

  await expect(list.getByRole('listitem')).toHaveText([
    'Reusable components',
    'Shared design tokens',
  ]);
});

test('List exposes its accessible name', async ({ render }) => {
  const list = await render(
    <List aria-label="Features">
      <List.Item>Reusable components</List.Item>
    </List>,
  );

  await expect(list).toHaveAccessibleName('Features');
});

test('an ordered List accepts a starting number', async ({ render }) => {
  const list = await render(
    <List as="ol" start={5} aria-label="Rankings">
      <List.Item>Fifth place</List.Item>
    </List>,
  );

  await expect(list).toHaveAttribute('start', '5');
});

test('an ordered List accepts reversed numbering', async ({ render }) => {
  const list = await render(
    <List as="ol" reversed aria-label="Rankings">
      <List.Item>Last place</List.Item>
    </List>,
  );

  await expect(list).toHaveAttribute('reversed', '');
});

test('ListItem accepts an explicit ordered value', async ({ render }) => {
  const list = await render(
    <List as="ol" aria-label="Rankings">
      <ListItem value={2}>Second place</ListItem>
    </List>,
  );

  await expect(list.getByRole('listitem')).toHaveAttribute('value', '2');
});

test('nested lists preserve their own accessible content', async ({ render }) => {
  const root = await render(
    <List aria-label="Tasks">
      <List.Item>
        Release process
        <List as="ol" aria-label="Release steps">
          <List.Item>Build</List.Item>

          <List.Item>Test</List.Item>
        </List>
      </List.Item>
    </List>,
  );

  await expect(root.getByRole('list', { name: 'Release steps' }).getByRole('listitem')).toHaveText([
    'Build',
    'Test',
  ]);
});

test('an unmarked unordered List preserves list semantics', async ({ render }) => {
  const list = await render(
    <List marker="none" aria-label="Features">
      <List.Item>Components</List.Item>
    </List>,
  );

  await expect(list).toHaveRole('list');
});

test('an unmarked ordered List preserves list semantics', async ({ render }) => {
  const list = await render(
    <List as="ol" marker="none" aria-label="Steps">
      <List.Item>Build</List.Item>
    </List>,
  );

  await expect(list).toHaveRole('list');
});

test('List content remains in reading order in a right-to-left context', async ({ render }) => {
  const root = await render(
    <div dir="rtl">
      <List aria-label="Features">
        <List.Item>First</List.Item>

        <List.Item>Second</List.Item>
      </List>
    </div>,
  );

  await expect(root.getByRole('listitem')).toHaveText(['First', 'Second']);
});

test('archive ul lists composed with links have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(
    <Theme theme={archiveTheme}>
      <List as="ul" aria-label="Features">
        <List.Item>Reusable components</List.Item>

        <List.Item>Shared tokens</List.Item>
      </List>

      <List as="ul" marker="none" aria-label="Resources">
        <List.Item>
          <Link href="#docs">Documentation</Link>
        </List.Item>
      </List>
    </Theme>,
  );

  await expect(page).noAccessibilityViolations();
});

test('archive ol lists composed with links have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(
    <Theme theme={archiveTheme}>
      <List as="ol" aria-label="Features">
        <List.Item>Reusable components</List.Item>

        <List.Item>Shared tokens</List.Item>
      </List>

      <List as="ol" marker="none" aria-label="Resources">
        <List.Item>
          <Link href="#docs">Documentation</Link>
        </List.Item>
      </List>
    </Theme>,
  );

  await expect(page).noAccessibilityViolations();
});

test('library ul lists composed with links have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(
    <Theme theme={libraryTheme}>
      <List as="ul" aria-label="Features">
        <List.Item>Reusable components</List.Item>

        <List.Item>Shared tokens</List.Item>
      </List>

      <List as="ul" marker="none" aria-label="Resources">
        <List.Item>
          <Link href="#docs">Documentation</Link>
        </List.Item>
      </List>
    </Theme>,
  );

  await expect(page).noAccessibilityViolations();
});

test('library ol lists composed with links have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(
    <Theme theme={libraryTheme}>
      <List as="ol" aria-label="Features">
        <List.Item>Reusable components</List.Item>

        <List.Item>Shared tokens</List.Item>
      </List>

      <List as="ol" marker="none" aria-label="Resources">
        <List.Item>
          <Link href="#docs">Documentation</Link>
        </List.Item>
      </List>
    </Theme>,
  );

  await expect(page).noAccessibilityViolations();
});
