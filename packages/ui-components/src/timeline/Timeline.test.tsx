import { expect, test } from '@lemuel-manske/config-playwright';

import { archiveTheme, libraryTheme } from '@lemuel-manske/design-tokens';

import { Link } from '../link/Link';
import { Text } from '../text/Text';
import { Theme } from '../theme/Theme';

import { Timeline, TimelineItem } from './Timeline';

test('Timeline preserves the supplied order and identifies the current version', async ({
  render,
}) => {
  const timeline = await render(
    <Timeline aria-label="Version history">
      <Timeline.Item label="v1.0.0">Initial release.</Timeline.Item>

      <>
        <TimelineItem label="v1.1.0" current>
          Added dark mode.
        </TimelineItem>

        <Timeline.Item label="v2.0.0">Upcoming release.</Timeline.Item>
      </>
    </Timeline>,
  );

  await expect(timeline).toHaveRole('list');

  await expect(timeline).toHaveAccessibleName('Version history');

  const items = timeline.getByRole('listitem');

  await expect(items).toHaveText([
    'v1.0.0Initial release.',
    'v1.1.0Added dark mode.',
    'v2.0.0Upcoming release.',
  ]);

  await expect(items.nth(1)).toHaveAttribute('aria-current', 'true');

  await expect(timeline.locator('[aria-current]')).toHaveCount(1);
});

test('Timeline supports a single label without body content', async ({ render }) => {
  const timeline = await render(
    <Timeline aria-label="Version history">
      <Timeline.Item label="v1.0.0" />
    </Timeline>,
  );

  await expect(timeline.getByRole('listitem')).toHaveText('v1.0.0');

  await expect(timeline.locator('[aria-current]')).toHaveCount(0);
});

test('Timeline content remains keyboard accessible without focusable decorative dots', async ({
  render,
  page,
}) => {
  const timeline = await render(
    <Timeline aria-label="Version history">
      <Timeline.Item label={<Link href="#v2">v2.0.0</Link>} current>
        <Text>New navigation.</Text>
      </Timeline.Item>

      <Timeline.Item label="v1.0.0">
        <Link href="#v1">Initial release notes</Link>
      </Timeline.Item>
    </Timeline>,
  );

  await page.keyboard.press('Tab');

  await expect(timeline.getByRole('link', { name: 'v2.0.0' })).toBeFocused();

  await page.keyboard.press('Tab');

  await expect(timeline.getByRole('link', { name: 'Initial release notes' })).toBeFocused();
});

for (const orientation of ['vertical', 'horizontal'] as const) {
  test(`Timeline connects ${orientation} items in their visual order`, async ({ render }) => {
    const timeline = await render(
      <Timeline aria-label="Version history" orientation={orientation}>
        <Timeline.Item label="v2.0.0" current>
          New navigation.
        </Timeline.Item>

        <Timeline.Item label="v1.0.0">Initial release.</Timeline.Item>
      </Timeline>,
    );

    const items = timeline.getByRole('listitem');

    const first = await items.nth(0).boundingBox();

    const second = await items.nth(1).boundingBox();

    expect(first).not.toBeNull();

    expect(second).not.toBeNull();

    if (orientation === 'vertical') {
      expect(second!.y).toBeGreaterThan(first!.y);

      expect(second!.x).toBe(first!.x);
    } else {
      expect(second!.x).toBeGreaterThan(first!.x);

      expect(second!.y).toBe(first!.y);
    }

    const connector = await items.nth(0).evaluate((item, orientation) => {
      const line = getComputedStyle(item, '::before');

      const marker = item.querySelector('[aria-hidden="true"]')!.getBoundingClientRect();

      const nextMarker = item
        .nextElementSibling!.querySelector('[aria-hidden="true"]')!
        .getBoundingClientRect();

      return {
        length: parseFloat(orientation === 'vertical' ? line.height : line.width),
        distance: orientation === 'vertical' ? nextMarker.y - marker.y : nextMarker.x - marker.x,
      };
    }, orientation);

    expect(connector.length).toBeCloseTo(connector.distance, 0);

    const lastConnector = await items
      .nth(1)
      .evaluate((item) => getComputedStyle(item, '::before').content);

    expect(lastConnector).toBe('none');
  });

  for (const [name, theme] of Object.entries({ archive: archiveTheme, library: libraryTheme })) {
    test(`${orientation} Timeline has no accessibility violations in the ${name} theme`, async ({
      render,
      page,
    }) => {
      await render(
        <Theme theme={theme}>
          <Timeline aria-label="Version history" orientation={orientation}>
            <Timeline.Item label="v2.0.0" current>
              <Text>New navigation.</Text>
            </Timeline.Item>

            <Timeline.Item label="v1.0.0">
              <Text>Initial release.</Text>
            </Timeline.Item>
          </Timeline>
        </Theme>,
      );

      await expect(page).noAccessibilityViolations();
    });
  }
}

test('Horizontal Timeline scrolls within a narrow container and follows right-to-left order', async ({
  render,
}) => {
  const root = await render(
    <div dir="rtl" style={{ width: 280 }}>
      <Timeline aria-label="Version history" orientation="horizontal">
        <Timeline.Item label="v2.0.0" current />

        <Timeline.Item label="v1.1.0" />

        <Timeline.Item label="v1.0.0" />
      </Timeline>
    </div>,
  );

  const timeline = root.getByRole('list');

  const dimensions = await timeline.evaluate((element) => ({
    visible: element.clientWidth,
    total: element.scrollWidth,
  }));

  expect(dimensions.visible).toBeLessThanOrEqual(280);

  expect(dimensions.total).toBeGreaterThan(dimensions.visible);

  const items = timeline.getByRole('listitem');

  const first = await items.nth(0).boundingBox();

  const last = await items.nth(2).boundingBox();

  expect(first!.x).toBeGreaterThan(last!.x);

  await items.nth(2).scrollIntoViewIfNeeded();

  await expect(items.nth(2)).toBeInViewport();
});

test('Timeline retains its current marker and connectors in forced colors', async ({
  render,
  page,
}) => {
  await page.emulateMedia({ forcedColors: 'active' });

  const timeline = await render(
    <Timeline aria-label="Version history">
      <Timeline.Item label="v2.0.0" current />

      <Timeline.Item label="v1.0.0" />
    </Timeline>,
  );

  const colors = await timeline
    .getByRole('listitem')
    .first()
    .evaluate((item) => ({
      line: getComputedStyle(item, '::before').backgroundColor,
      marker: getComputedStyle(item.querySelector('[aria-hidden="true"]')!).backgroundColor,
      outline: getComputedStyle(item.querySelector('[aria-hidden="true"]')!).outlineStyle,
      background: getComputedStyle(document.body).backgroundColor,
    }));

  expect(colors.line).toBe(colors.marker);

  expect(colors.line).not.toBe(colors.background);

  expect(colors.outline).toBe('solid');
});
