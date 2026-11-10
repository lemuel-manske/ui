import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import * as config from './docs-config.js';

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
