import { expect, test } from '@lemuel-manske/config-playwright';

import { archiveTheme, libraryTheme } from '@lemuel-manske/design-tokens';

import { Link } from '../link/Link';
import { Theme } from '../theme/Theme';

import { List, ListItem } from './List';

test('List defaults to an unordered list with bullets and an accessible name', async ({
  render,
}) => {
  const list = await render(
    <List aria-label="Features">
      <List.Item>Reusable components</List.Item>

      <ListItem>Shared design tokens</ListItem>
    </List>,
  );

  await expect(list).toHaveRole('list');

  await expect(list).toHaveAccessibleName('Features');

  expect(await list.evaluate((element) => element.tagName)).toBe('UL');

  await expect(list.getByRole('listitem')).toHaveText([
    'Reusable components',
    'Shared design tokens',
  ]);

  await expect(list).toHaveCSS('list-style-type', 'disc');

  await expect(list).toHaveCSS('padding-inline-start', '24px');
});

test('Ordered List supports starting, reversed, and individual item numbers', async ({
  render,
}) => {
  const list = await render(
    <List as="ol" start={5} reversed aria-label="Rankings">
      <List.Item>Fifth place</List.Item>

      <List.Item>Fourth place</List.Item>

      <List.Item value={2}>Second place</List.Item>
    </List>,
  );

  expect(await list.evaluate((element) => element.tagName)).toBe('OL');

  await expect(list).toHaveCSS('list-style-type', 'decimal');

  await expect(list).toHaveAttribute('start', '5');

  await expect(list).toHaveAttribute('reversed', '');

  await expect(list.getByRole('listitem').nth(2)).toHaveAttribute('value', '2');
});

test('List preserves nested list semantics and rich item content', async ({ render }) => {
  const root = await render(
    <div>
      <h2 id="tasks-title">Tasks</h2>

      <List aria-labelledby="tasks-title">
        <List.Item>
          Release process
          <List as="ol" aria-label="Release steps">
            <List.Item>Build</List.Item>

            <List.Item>Test</List.Item>
          </List>
        </List.Item>

        <List.Item>
          <Link href="#docs">Documentation</Link>
        </List.Item>
      </List>
    </div>,
  );

  const outer = root.getByRole('list', { name: 'Tasks', exact: true });

  const inner = outer.getByRole('list', { name: 'Release steps' });

  await expect(outer.locator(':scope > li')).toHaveCount(2);

  await expect(inner.getByRole('listitem')).toHaveText(['Build', 'Test']);

  await expect(outer.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '#docs');
});

for (const as of ['ul', 'ol'] as const) {
  test(`${as} List retains list semantics when its markers and indentation are removed`, async ({
    render,
  }) => {
    const list = await render(
      <List as={as} marker="none" aria-label="Features">
        <List.Item>Reusable components</List.Item>

        <List.Item>Shared design tokens</List.Item>
      </List>,
    );

    await expect(list).toHaveRole('list');

    await expect(list).toHaveAttribute('role', 'list');

    await expect(list).toHaveCSS('list-style-type', 'none');

    await expect(list).toHaveCSS('padding-inline-start', '0px');

    await expect(list.getByRole('listitem')).toHaveCount(2);
  });

  for (const [name, theme] of Object.entries({ archive: archiveTheme, library: libraryTheme })) {
    test(`${as} List has no accessibility violations in the ${name} theme`, async ({
      render,
      page,
    }) => {
      await render(
        <Theme theme={theme}>
          <List as={as} aria-label="Features">
            <List.Item>Reusable components</List.Item>

            <List.Item>Shared design tokens</List.Item>
          </List>

          <List as={as} marker="none" aria-label="Resources">
            <List.Item>
              <Link href="#docs">Documentation</Link>
            </List.Item>
          </List>
        </Theme>,
      );

      await expect(page).noAccessibilityViolations();
    });
  }
}

test('List indentation follows right-to-left content', async ({ render }) => {
  const root = await render(
    <div dir="rtl">
      <List aria-label="Features">
        <List.Item>Reusable components</List.Item>
      </List>
    </div>,
  );

  const list = root.getByRole('list');

  await expect(list).toHaveCSS('padding-right', '24px');

  await expect(list).toHaveCSS('padding-left', '0px');
});
