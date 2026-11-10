import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

const componentRoot = join(root, 'packages/ui-components');

const output = join(componentRoot, 'storybook-static');

const docsOutput = join(output, 'docs');

await mkdir(docsOutput, { recursive: true });

const components = JSON.parse(await readFile(join(output, 'manifests/components.json'), 'utf8'));

const docs = JSON.parse(await readFile(join(output, 'manifests/docs.json'), 'utf8'));

for (const name of ['Button', 'Field', 'Form']) {
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

for (const entry of await readdir(join(componentRoot, 'src'), { recursive: true })) {
  if (!entry.endsWith('.mdx')) {
    continue;
  }

  const source = await readFile(join(componentRoot, 'src', entry), 'utf8');

  // Guides deliberately use only Markdown plus these two Storybook metadata lines.
  const markdown = source
    .replace(/^import \{ Meta \} from '@storybook\/addon-docs\/blocks';\r?\n/m, '')
    .replace(/^<Meta title="[^"]+" \/>\r?\n/m, '')
    .trim();

  const title = markdown.match(/^# (.+)$/m)?.[1];

  if (!title || !source.includes('<Meta title="')) {
    throw new Error(`Expected a titled Markdown guide in ${entry}.`);
  }

  const target = entry.replace(/\.mdx$/, '.md');

  await mkdir(dirname(join(docsOutput, target)), { recursive: true });

  await writeFile(join(docsOutput, target), `${markdown}\n`);

  links.push(`- [${title}](docs/${target.split('\\').join('/')})`);
}

const versions = {};

for (const directory of ['ui-components', 'ui-design-tokens', 'ui-utils']) {
  const { name, version } = JSON.parse(
    await readFile(join(root, 'packages', directory, 'package.json'), 'utf8'),
  );

  versions[name] = version;
}

let commit = process.env.GITHUB_SHA;

if (!commit) {
  try {
    commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    commit = null;
  }
}

await writeFile(
  join(docsOutput, 'version.json'),
  `${JSON.stringify({ packages: versions, commit }, null, 2)}\n`,
);

await writeFile(
  join(output, 'llms.txt'),
  [
    '# @lemuel-manske UI',
    '',
    '> React design system: public APIs, accessible compositions, and semantic themes.',
    '',
    'Read Getting started before composing UI. Match these docs to the installed package version.',
    'Use public package imports; verify props against the generated API and examples.',
    '',
    '## Guides',
    '',
    ...links.sort(),
    '',
    '## Generated reference',
    '',
    '- [Component APIs and story examples](manifests/components.json)',
    '- [MDX documentation manifest](manifests/docs.json)',
    '- [Package versions and source commit](docs/version.json)',
    '',
    'MCP is available at /mcp on the running Storybook dev server, not on this static build.',
    '',
  ].join('\n'),
);

console.log(`Exported ${links.length} Markdown guides and llms.txt to ${output}`);
