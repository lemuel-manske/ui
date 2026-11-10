import { test } from '@playwright/test';

import { expect, type Page } from '../../index';

async function renderPage(page: Page, content: string) {
  await page.setContent(`
    <!doctype html>
    <html lang="en">
      <head>
        <title>Accessibility matcher test</title>
        <style>body { background: #fff; color: #000; }</style>
      </head>
      <body>
        <main>
          <h1>Accessibility matcher test</h1>
          ${content}
        </main>
      </body>
    </html>
  `);
}

test('accepts an accessible page', async ({ page }) => {
  await renderPage(page, '<button type="button">Save changes</button>');

  await expect(page).noAccessibilityViolations();
});

for (const { content, rule, selector } of [
  {
    content:
      '<img id="logo" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">',
    rule: 'image-alt',
    selector: '#logo',
  },
  {
    content: '<button id="save" type="button"></button>',
    rule: 'button-name',
    selector: '#save',
  },
]) {
  test(`reports ${rule} violations with the affected element`, async ({ page }) => {
    await renderPage(page, content);

    const assertion = expect(page).noAccessibilityViolations();

    await expect(assertion).rejects.toThrow('Expected no accessibility violations.');
    await expect(assertion).rejects.toThrow(`"id": "${rule}"`);
    await expect(assertion).rejects.toThrow(selector);
    await expect(assertion).rejects.toThrow('"html":');
  });
}

test('reports multiple violations from the same page', async ({ page }) => {
  await renderPage(page, '<button type="button"></button><input type="text">');

  const assertion = expect(page).noAccessibilityViolations();

  await expect(assertion).rejects.toThrow('"id": "button-name"');
  await expect(assertion).rejects.toThrow('"id": "label"');
});

test('supports negated assertions on an inaccessible page', async ({ page }) => {
  await renderPage(page, '<button type="button"></button>');

  await expect(page).not.noAccessibilityViolations();
});

test('rejects negated assertions on an accessible page', async ({ page }) => {
  await renderPage(page, '<button type="button">Save changes</button>');

  await expect(expect(page).not.noAccessibilityViolations()).rejects.toThrow();
});

test('propagates scan errors when the page is closed', async ({ page }) => {
  await page.close();

  await expect(expect(page).noAccessibilityViolations()).rejects.toThrow(/closed/i);
});
