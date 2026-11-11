import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, posix } from 'node:path';

import * as config from './docs-config.js';
import { renderDocTemplate } from './render-doc-template.js';

const {
  ROOT_DIRECTORY,
  COMPONENT_SOURCE_DIRECTORY,
  STORYBOOK_OUTPUT_DIRECTORY,
  COMPONENTS_MANIFEST_PATH,
  DOCS_MANIFEST_PATH,
  RAW_GUIDES_PATH,
  VERSION_METADATA_PATH,
  LLMS_INDEX_FILENAME,
  PACKAGE_GUIDES,
  REQUIRED_COMPONENTS,
  VERSIONED_PACKAGES,
} = config;

const docsOutput = join(STORYBOOK_OUTPUT_DIRECTORY, RAW_GUIDES_PATH);

await mkdir(docsOutput, { recursive: true });

const components = JSON.parse(
  await readFile(join(STORYBOOK_OUTPUT_DIRECTORY, COMPONENTS_MANIFEST_PATH), 'utf8'),
);

const docs = JSON.parse(
  await readFile(join(STORYBOOK_OUTPUT_DIRECTORY, DOCS_MANIFEST_PATH), 'utf8'),
);

for (const name of REQUIRED_COMPONENTS) {
  const component = Object.values(components.components).find((entry) => entry.name === name);

  if (!component || !Object.keys(component.reactDocgenTypescript?.props ?? {}).length) {
    throw new Error(`Missing generated API for ${name}. Check Storybook manifest extraction.`);
  }
}

for (const component of Object.values(components.components)) {
  for (const story of component.stories ?? []) {
    if (story.error || !story.snippet) {
      throw new Error(
        `Missing example for ${component.name}/${story.name}: ${story.error?.message}`,
      );
    }
  }

  for (const part of Object.values(component.subcomponents ?? {})) {
    if (part.error || part.reactDocgenTypescript?.displayName !== part.name) {
      throw new Error(`Incorrect API extraction for ${component.name}/${part.name}.`);
    }
  }
}

if (!Object.keys(docs.docs ?? {}).length) {
  throw new Error('Missing generated MDX documentation. Check the Storybook MDX configuration.');
}

const links = [];

async function exportGuide(target, markdown, sourcePath) {
  const title = markdown.match(/^# (.+)$/m)?.[1];

  if (!title) {
    throw new Error(`Expected a titled Markdown guide in ${sourcePath}.`);
  }

  await mkdir(dirname(join(docsOutput, target)), { recursive: true });

  await writeFile(join(docsOutput, target), `${markdown.trim()}\n`);

  links.push(
    (
      await renderDocTemplate('guide-link', {
        title,
        path: posix.join(RAW_GUIDES_PATH, target.split('\\').join('/')),
      })
    ).trim(),
  );
}

for (const entry of await readdir(COMPONENT_SOURCE_DIRECTORY, { recursive: true })) {
  if (!entry.endsWith('.mdx')) {
    continue;
  }

  const source = await readFile(join(COMPONENT_SOURCE_DIRECTORY, entry), 'utf8');

  // Guides deliberately use only Markdown plus these two Storybook metadata lines.
  const markdown = source
    .replace(/^import \{ Meta \} from '@storybook\/addon-docs\/blocks';\r?\n/m, '')
    .replace(/^<Meta title="[^"]+" \/>\r?\n/m, '');

  if (!source.includes('<Meta title="')) {
    throw new Error(`Expected Storybook metadata in ${entry}.`);
  }

  await exportGuide(entry.replace(/\.mdx$/, '.md'), markdown, entry);
}

for (const [target, source] of Object.entries(PACKAGE_GUIDES)) {
  const markdown = await readFile(join(ROOT_DIRECTORY, source), 'utf8');

  await exportGuide(target, markdown, source);
}

const versions = {};

for (const directory of VERSIONED_PACKAGES) {
  const { name, version } = JSON.parse(
    await readFile(join(ROOT_DIRECTORY, 'packages', directory, 'package.json'), 'utf8'),
  );

  versions[name] = version;
}

let commit = process.env.GITHUB_SHA;

if (!commit) {
  try {
    commit = execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: ROOT_DIRECTORY,
      encoding: 'utf8',
    }).trim();
  } catch {
    commit = null;
  }
}

await writeFile(
  join(STORYBOOK_OUTPUT_DIRECTORY, VERSION_METADATA_PATH),
  `${JSON.stringify({ packages: versions, commit }, null, 2)}\n`,
);

await writeFile(
  join(STORYBOOK_OUTPUT_DIRECTORY, LLMS_INDEX_FILENAME),
  await renderDocTemplate('llms', {
    guides: links.sort().join('\n'),
    componentsManifest: COMPONENTS_MANIFEST_PATH,
    docsManifest: DOCS_MANIFEST_PATH,
    versionMetadata: VERSION_METADATA_PATH,
  }),
);

console.log(
  `Exported ${links.length} Markdown guides and llms.txt to ${STORYBOOK_OUTPUT_DIRECTORY}`,
);
