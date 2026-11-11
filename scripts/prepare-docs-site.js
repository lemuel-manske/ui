import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, posix } from 'node:path';

import * as config from './docs-config.js';
import { renderDocTemplate } from './render-doc-template.js';

const {
  AGENT_DIRECTORY,
  AGENT_GUIDE_TITLE,
  COMPONENT_DOCS_DIRECTORY,
  COMPONENT_SOURCE_URL,
  COMPONENTS_MANIFEST_PATH,
  DOCS_MANIFEST_PATH,
  GENERATED_DIRECTORY,
  GUIDES_DIRECTORY,
  LLMS_INDEX_FILENAME,
  PACKAGE_GUIDES,
  RAW_GUIDES_PATH,
  REPOSITORY_URL,
  SETUP_GUIDE_TITLE,
  SITE_BASE_URL,
  STATIC_DIRECTORY,
  STORYBOOK_DIRECTORY,
  STORYBOOK_OUTPUT_DIRECTORY,
  VERSION_METADATA_PATH,
} = config;

await rm(GENERATED_DIRECTORY, { recursive: true, force: true });

await mkdir(GUIDES_DIRECTORY, { recursive: true });

await mkdir(COMPONENT_DOCS_DIRECTORY, { recursive: true });

await cp(
  join(STORYBOOK_OUTPUT_DIRECTORY, RAW_GUIDES_PATH),
  join(STATIC_DIRECTORY, AGENT_DIRECTORY, RAW_GUIDES_PATH),
  { recursive: true },
);

for (const artifact of [COMPONENTS_MANIFEST_PATH, DOCS_MANIFEST_PATH]) {
  const destination = join(STATIC_DIRECTORY, AGENT_DIRECTORY, artifact);

  await mkdir(dirname(destination), { recursive: true });

  await cp(join(STORYBOOK_OUTPUT_DIRECTORY, artifact), destination);
}

const guideLinks = [];

for (const entry of await readdir(join(STORYBOOK_OUTPUT_DIRECTORY, RAW_GUIDES_PATH), {
  recursive: true,
})) {
  if (!entry.endsWith('.md')) {
    continue;
  }

  const markdown = await readFile(join(STORYBOOK_OUTPUT_DIRECTORY, RAW_GUIDES_PATH, entry), 'utf8');

  const title = markdown.match(/^# (.+)$/m)?.[1];

  const isSetup = title === SETUP_GUIDE_TITLE;

  const slug = isSetup ? '/' : `/guides/${title.toLowerCase().replaceAll(' ', '-')}`;

  const relativePath = entry.split('\\').join('/');
  const packageSource = PACKAGE_GUIDES[relativePath];
  const editUrl = packageSource
    ? `${REPOSITORY_URL}/blob/main/${packageSource}`
    : `${COMPONENT_SOURCE_URL}${relativePath.replace(/\.md$/, '.mdx')}`;

  const path = join(GUIDES_DIRECTORY, entry);

  await mkdir(dirname(path), { recursive: true });

  await writeFile(
    path,
    await renderDocTemplate('guide', {
      title: JSON.stringify(title),
      slug,
      position: isSetup ? 1 : title === AGENT_GUIDE_TITLE ? 2 : 3,
      editUrl: JSON.stringify(editUrl),
      content: markdown.trim(),
    }),
  );

  guideLinks.push(
    (
      await renderDocTemplate('guide-link', {
        title,
        path: posix.join(AGENT_DIRECTORY, RAW_GUIDES_PATH, relativePath),
      })
    ).trim(),
  );
}

await writeFile(
  join(STATIC_DIRECTORY, LLMS_INDEX_FILENAME),
  await renderDocTemplate('llms', {
    guides: guideLinks.sort().join('\n'),
    componentsManifest: posix.join(AGENT_DIRECTORY, COMPONENTS_MANIFEST_PATH),
    docsManifest: posix.join(AGENT_DIRECTORY, DOCS_MANIFEST_PATH),
    versionMetadata: posix.join(AGENT_DIRECTORY, VERSION_METADATA_PATH),
  }),
);

const { components } = JSON.parse(
  await readFile(join(STORYBOOK_OUTPUT_DIRECTORY, COMPONENTS_MANIFEST_PATH), 'utf8'),
);

async function propsMarkdown(props = {}) {
  const sections = await Promise.all(
    Object.entries(props).map(async ([name, prop]) => {
      const type = prop.type?.raw ?? prop.type?.name ?? 'unknown';

      const values = Array.isArray(prop.type?.value)
        ? prop.type.value.map((value) => value.value).join(' | ')
        : undefined;

      return renderDocTemplate('property', {
        name,
        optional: prop.required ? '' : '?',
        type: values || type,
        description: prop.description ?? '',
        defaultValue: prop.defaultValue
          ? (await renderDocTemplate('default-value', { value: prop.defaultValue.value })).trim()
          : '',
      });
    }),
  );

  return sections.join('\n');
}

for (const [id, component] of Object.entries(components)) {
  const slug = id.replace(/^components-/, '');

  const subcomponents = await Promise.all(
    Object.values(component.subcomponents ?? {}).map(async (part) =>
      renderDocTemplate('subcomponent', {
        name: part.name,
        description: part.description ?? '',
        props: await propsMarkdown(part.reactDocgenTypescript.props),
      }),
    ),
  );

  const examples = await Promise.all(
    component.stories.map((story) =>
      renderDocTemplate('example', {
        name: story.name,
        imports: story.import ?? component.import,
        snippet: story.snippet,
        storybookUrl: `pathname://${SITE_BASE_URL}${STORYBOOK_DIRECTORY}/?path=/story/${story.id}`,
      }),
    ),
  );

  await writeFile(
    join(COMPONENT_DOCS_DIRECTORY, `${slug}.md`),
    await renderDocTemplate('component', {
      title: JSON.stringify(component.name),
      name: component.name,
      slug,
      description: component.description ?? '',
      imports: component.import,
      storybookUrl: `pathname://${SITE_BASE_URL}${STORYBOOK_DIRECTORY}/?path=/docs/${id}--docs`,
      props: await propsMarkdown(component.reactDocgenTypescript.props),
      subcomponents: subcomponents.join('\n'),
      examples: examples.join('\n'),
    }),
  );
}

console.log(`Prepared shared guides and ${Object.keys(components).length} component pages.`);
