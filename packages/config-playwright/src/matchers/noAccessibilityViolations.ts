import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

async function noAccessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .analyze();

  return {
    pass: results.violations.length === 0,

    message: () =>
      `Expected no accessibility violations.\n${JSON.stringify(results.violations, null, 2)}`,
  };
}

export { noAccessibilityViolations };
