import { cp, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import * as config from './docs-config.js';

const {
  LLMS_INDEX_FILENAME,
  NOJEKYLL_FILENAME,
  SITE_OUTPUT_DIRECTORY,
  STORYBOOK_DIRECTORY,
  STORYBOOK_OUTPUT_DIRECTORY,
} = config;

await cp(STORYBOOK_OUTPUT_DIRECTORY, join(SITE_OUTPUT_DIRECTORY, STORYBOOK_DIRECTORY), {
  recursive: true,
});

await writeFile(join(SITE_OUTPUT_DIRECTORY, NOJEKYLL_FILENAME), '');

const llms = await readFile(join(SITE_OUTPUT_DIRECTORY, LLMS_INDEX_FILENAME), 'utf8');

for (const [, path] of llms.matchAll(/\]\(([^)]+)\)/g)) {
  await readFile(join(SITE_OUTPUT_DIRECTORY, path));
}

console.log(`Packaged Docusaurus, Storybook, and agent documentation in ${SITE_OUTPUT_DIRECTORY}`);
