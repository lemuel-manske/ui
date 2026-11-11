import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import * as config from './docs-config.js';

/**
 * Renders a documentation template with the provided values.
 *
 * @param {string} name - The name of the template to render.
 * @param {Record<string, string>} values - The values to replace in the template.
 * @returns {Promise<string>} The rendered template.
 */

const templates = new Map();

async function renderDocTemplate(name, values) {
  if (!templates.has(name)) {
    templates.set(name, await readFile(join(config.TEMPLATES_DIRECTORY, `${name}.md.tpl`), 'utf8'));
  }

  return templates.get(name).replace(/\{\{(\w+)\}\}/g, (_placeholder, key) => {
    if (!Object.hasOwn(values, key)) {
      throw new Error(`Missing placeholder "${key}" in documentation template "${name}".`);
    }

    return String(values[key]);
  });
}

export { renderDocTemplate };
