import { expect, test } from '@lemuel-manske/config-playwright';

import { Link } from '../link/Link';
import { ListItem } from '../list/List';

import { Navigation } from './Navigation';

test('Navigation exposes the name supplied by a visible heading', async ({ render }) => {
  const root = await render(
    <div>
      <h2 id="sections-title">Sections</h2>

      <Navigation aria-labelledby="sections-title">
        <Link href="#collection">Collection</Link>
      </Navigation>
    </div>,
  );

  await expect(root.getByRole('navigation')).toHaveAccessibleName('Sections');
});

test('Navigation preserves native keyboard link activation', async ({ render, page }) => {
  const root = await render(
    <div>
      <Navigation aria-label="Sections">
        <Navigation.List>
          <ListItem>
            <Link href="#collection">Collection</Link>
          </ListItem>

          <ListItem>
            <Link href="#new-capture">Archive</Link>
          </ListItem>
        </Navigation.List>
      </Navigation>

      <h2 id="collection">Collection</h2>

      <h2 id="new-capture">Archive</h2>
    </div>,
  );

  await root.getByRole('link', { name: 'Collection' }).focus();

  await page.keyboard.press('Tab');

  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/#new-capture$/);
});

test('vertical navigation exposes the current destination', async ({ render }) => {
  const navigation = await render(
    <Navigation aria-label="Documentation">
      <Navigation.List orientation="vertical">
        <ListItem>
          <Link href="#overview" aria-current="location">
            Overview
          </Link>
        </ListItem>

        <ListItem>
          <Link href="#components">Components</Link>
        </ListItem>
      </Navigation.List>
    </Navigation>,
  );

  await expect(navigation.getByRole('link', { name: 'Overview' })).toHaveAttribute(
    'aria-current',
    'location',
  );
});

test('Navigation forwards native language attributes', async ({ render }) => {
  const navigation = await render(
    <Navigation aria-label="Documentation" lang="pt-BR">
      <Link href="#docs">Documentação</Link>
    </Navigation>,
  );

  await expect(navigation).toHaveAttribute('lang', 'pt-BR');
});

test('header navigation composed from standalone links and list items has no accessibility violations', async ({
  render,
  page,
}) => {
  await render(
    <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--ui-space-24)' }}>
      <Link href="#home">OpenArquive</Link>

      <Navigation aria-label="Main">
        <Navigation.List>
          <ListItem>
            <Link href="#collection">Collection</Link>
          </ListItem>

          <ListItem>
            <Link href="#archive">Archive</Link>
          </ListItem>
        </Navigation.List>
      </Navigation>
    </header>,
  );

  await expect(page).noAccessibilityViolations();
});

test('vertical navigation has no accessibility violations', async ({ render, page }) => {
  await render(
    <Navigation aria-label="Documentation">
      <Navigation.List orientation="vertical">
        <ListItem>
          <Link href="#overview" aria-current="page">
            Overview
          </Link>
        </ListItem>

        <ListItem>
          <Link href="#components">Components</Link>
        </ListItem>
      </Navigation.List>
    </Navigation>,
  );

  await expect(page).noAccessibilityViolations();
});
