import { expect, test } from '@lemuel-manske/config-playwright';

import { Link } from '../link/Link';

import { Navigation } from './Navigation';

test('Navigation preserves landmark semantics and native keyboard navigation', async ({
  render,
  page,
}) => {
  const root = await render(
    <div>
      <h1 id="sections-title">Sections</h1>

      <Navigation aria-labelledby="sections-title">
        <Navigation.List>
          <Navigation.Item>
            <Link href="#collection">Coleção</Link>
          </Navigation.Item>

          <Navigation.Item>
            <a href="#new-capture">Arquivar</a>
          </Navigation.Item>
        </Navigation.List>
      </Navigation>

      <h2 id="collection">Coleção</h2>

      <h2 id="new-capture">Arquivar</h2>
    </div>,
  );

  const list = root.getByRole('navigation', { name: 'Sections' }).getByRole('list');

  await expect(list.getByRole('listitem')).toHaveCount(2);

  await expect(list).toHaveCSS('flex-flow', 'row wrap');

  await page.keyboard.press('Tab');

  await expect(list.getByRole('link', { name: 'Coleção' })).toBeFocused();

  await page.keyboard.press('Tab');

  await expect(list.getByRole('link', { name: 'Arquivar' })).toBeFocused();

  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/#new-capture$/);

  await expect(page).noAccessibilityViolations();
});

test('Navigation supports vertical lists and styles the current destination', async ({
  render,
}) => {
  const navigation = await render(
    <Navigation aria-label="Documentation">
      <Navigation.List orientation="vertical">
        <Navigation.Item>
          <Link href="#overview" aria-current="location">
            Overview
          </Link>
        </Navigation.Item>

        <Navigation.Item>
          <a href="#components" aria-current="false">
            Components
          </a>
        </Navigation.Item>
      </Navigation.List>
    </Navigation>,
  );

  await expect(navigation.getByRole('list')).toHaveCSS('flex-direction', 'column');

  const currentLink = navigation.getByRole('link', { name: 'Overview' });

  await expect(currentLink).toHaveAttribute('aria-current', 'location');

  await expect(currentLink).toHaveCSS('font-weight', '600');

  await expect(navigation.getByRole('link', { name: 'Components' })).toHaveCSS(
    'font-weight',
    '400',
  );
});
