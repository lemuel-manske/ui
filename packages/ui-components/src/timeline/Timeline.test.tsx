import { expect, test } from '@lemuel-manske/config-playwright';

import { archiveTheme, libraryTheme } from '@lemuel-manske/design-tokens';

import { Link } from '../link/Link';
import { Text } from '../text/Text';
import { Theme } from '../theme/Theme';

import { Timeline, TimelineItem } from './Timeline';

test('Timeline preserves the supplied reading order', async ({ render }) => {
  const timeline = await render(
    <Timeline aria-label="Version history">
      <Timeline.Item label="v1.0.0">Initial release.</Timeline.Item>

      <TimelineItem label="v1.1.0" current>
        Added dark mode.
      </TimelineItem>

      <Timeline.Item label="v2.0.0">Upcoming release.</Timeline.Item>
    </Timeline>,
  );

  await expect(timeline.getByRole('listitem')).toHaveText([
    'v1.0.0Initial release.',
    'v1.1.0Added dark mode.',
    'v2.0.0Upcoming release.',
  ]);
});

test('Timeline identifies the current item', async ({ render }) => {
  const timeline = await render(
    <Timeline aria-label="Version history">
      <Timeline.Item label="v2.0.0" current />
    </Timeline>,
  );

  await expect(timeline.getByRole('listitem')).toHaveAttribute('aria-current', 'true');
});

test('Timeline exposes its accessible name', async ({ render }) => {
  const timeline = await render(
    <Timeline aria-label="Version history">
      <Timeline.Item label="v1.0.0" />
    </Timeline>,
  );

  await expect(timeline).toHaveAccessibleName('Version history');
});

test('Timeline supports an item without body content', async ({ render }) => {
  const timeline = await render(
    <Timeline aria-label="Version history">
      <Timeline.Item label="v1.0.0" />
    </Timeline>,
  );

  await expect(timeline.getByRole('listitem')).toHaveText('v1.0.0');
});

test('links in Timeline item labels can receive keyboard focus', async ({ render, page }) => {
  const timeline = await render(
    <Timeline aria-label="Version history">
      <Timeline.Item label={<Link href="#v2">v2.0.0</Link>} current />
    </Timeline>,
  );

  await page.keyboard.press('Tab');

  await expect(timeline.getByRole('link', { name: 'v2.0.0' })).toBeFocused();
});

test('horizontal Timeline links remain keyboard accessible in a narrow right-to-left context', async ({
  render,
  page,
}) => {
  const root = await render(
    <div dir="rtl" style={{ width: 280 }}>
      <Timeline aria-label="Version history" orientation="horizontal">
        <Timeline.Item label={<Link href="#v2">v2.0.0</Link>} current />

        <Timeline.Item label={<Link href="#v1">v1.0.0</Link>} />
      </Timeline>
    </div>,
  );

  await page.keyboard.press('Tab');

  await page.keyboard.press('Tab');

  await expect(root.getByRole('link', { name: 'v1.0.0' })).toBeFocused();
});

test('archive vertical Timeline has no accessibility violations', async ({ render, page }) => {
  await render(
    <Theme theme={archiveTheme}>
      <Timeline aria-label="Version history" orientation="vertical">
        <Timeline.Item label="v2.0.0" current>
          <Text>New navigation.</Text>
        </Timeline.Item>

        <Timeline.Item label="v1.0.0">
          <Link href="#v1">Initial release notes</Link>
        </Timeline.Item>
      </Timeline>
    </Theme>,
  );

  await expect(page).noAccessibilityViolations();
});

test('archive horizontal Timeline has no accessibility violations', async ({ render, page }) => {
  await render(
    <Theme theme={archiveTheme}>
      <Timeline aria-label="Version history" orientation="horizontal">
        <Timeline.Item label="v2.0.0" current>
          <Text>New navigation.</Text>
        </Timeline.Item>

        <Timeline.Item label="v1.0.0">
          <Link href="#v1">Initial release notes</Link>
        </Timeline.Item>
      </Timeline>
    </Theme>,
  );

  await expect(page).noAccessibilityViolations();
});

test('library vertical Timeline has no accessibility violations', async ({ render, page }) => {
  await render(
    <Theme theme={libraryTheme}>
      <Timeline aria-label="Version history" orientation="vertical">
        <Timeline.Item label="v2.0.0" current>
          <Text>New navigation.</Text>
        </Timeline.Item>

        <Timeline.Item label="v1.0.0">
          <Link href="#v1">Initial release notes</Link>
        </Timeline.Item>
      </Timeline>
    </Theme>,
  );

  await expect(page).noAccessibilityViolations();
});

test('library horizontal Timeline has no accessibility violations', async ({ render, page }) => {
  await render(
    <Theme theme={libraryTheme}>
      <Timeline aria-label="Version history" orientation="horizontal">
        <Timeline.Item label="v2.0.0" current>
          <Text>New navigation.</Text>
        </Timeline.Item>

        <Timeline.Item label="v1.0.0">
          <Link href="#v1">Initial release notes</Link>
        </Timeline.Item>
      </Timeline>
    </Theme>,
  );

  await expect(page).noAccessibilityViolations();
});

test('Timeline has no accessibility violations with forced colors enabled', async ({
  render,
  page,
}) => {
  await page.emulateMedia({ forcedColors: 'active' });

  await render(
    <Timeline aria-label="Version history">
      <Timeline.Item label="v2.0.0" current />

      <Timeline.Item label="v1.0.0" />
    </Timeline>,
  );

  await expect(page).noAccessibilityViolations();
});
