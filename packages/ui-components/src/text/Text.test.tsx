import { archiveTheme, libraryTheme } from '@lemuel-manske/design-tokens';

import { TextExample } from './Text.test-fixture';

import { expect, test } from '@lemuel-manske/config-playwright';

import { Text } from './Text';

test('Text renders its content', async ({ render }) => {
  const content = await render(<Text as="span">Example</Text>);

  await expect(content).toHaveText('Example');
});

test('Text has no accessibility violations', async ({ render, page }) => {
  await render(<Text>Example</Text>);

  await expect(page).noAccessibilityViolations();
});

test('small text preserves inline content', async ({ render, page }) => {
  await render(
    <Text as="span" size="small">
      2026-11-11
    </Text>,
  );

  await expect(page.getByText('2026-11-11')).toBeVisible();
});

test('success text has no accessibility violations', async ({ render, page }) => {
  await render(
    <Text size="small" tone="success">
      Capture complete
    </Text>,
  );

  await expect(page).noAccessibilityViolations();
});

test('danger text has no accessibility violations', async ({ render, page }) => {
  await render(
    <Text size="small" tone="danger">
      Capture failed
    </Text>,
  );

  await expect(page).noAccessibilityViolations();
});

test('italic body text has no accessibility violations', async ({ render, page }) => {
  await render(<Text emphasis="italic">Editorial note</Text>);

  await expect(page).noAccessibilityViolations();
});

test('themed typography reflows with enlarged text at a narrow viewport', async ({
  render,
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });

  const content = await render(<TextExample />);

  await expect
    .poll(() => content.evaluate((element) => element.scrollWidth <= element.clientWidth))
    .toBe(true);
});

test('archive text and heading compositions have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(<TextExample theme={archiveTheme} />);

  await expect(page).noAccessibilityViolations();
});

test('library text and heading compositions have no accessibility violations', async ({
  render,
  page,
}) => {
  await render(<TextExample theme={libraryTheme} />);

  await expect(page).noAccessibilityViolations();
});

test('text and heading compositions have no accessibility violations in forced colors', async ({
  render,
  page,
}) => {
  await page.emulateMedia({ forcedColors: 'active' });

  await render(<TextExample />);

  await expect(page).noAccessibilityViolations();
});
