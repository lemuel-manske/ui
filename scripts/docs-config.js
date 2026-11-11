import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIRECTORY = fileURLToPath(new URL('..', import.meta.url));

const COMPONENT_SOURCE_DIRECTORY = join(ROOT_DIRECTORY, 'packages/ui-components/src');
const STORYBOOK_OUTPUT_DIRECTORY = join(ROOT_DIRECTORY, 'packages/ui-components/storybook-static');

const SITE_DIRECTORY = join(ROOT_DIRECTORY, 'website');

const GENERATED_DIRECTORY = join(SITE_DIRECTORY, '.generated');

const GENERATED_DOCS_PATH = '.generated/docs';
const GENERATED_STATIC_PATH = '.generated/static';

const GUIDES_DIRECTORY = join(SITE_DIRECTORY, GENERATED_DOCS_PATH, 'guides');

const COMPONENT_DOCS_DIRECTORY = join(SITE_DIRECTORY, GENERATED_DOCS_PATH, 'components');

const STATIC_DIRECTORY = join(SITE_DIRECTORY, GENERATED_STATIC_PATH);

const SITE_OUTPUT_DIRECTORY = join(SITE_DIRECTORY, 'dist');

const TEMPLATES_DIRECTORY = join(ROOT_DIRECTORY, 'scripts/templates');

const SITE_URL = 'https://lemuel-manske.github.io';
const SITE_BASE_URL = '/ui/';

const REPOSITORY_URL = 'https://github.com/lemuel-manske/ui';
const COMPONENT_SOURCE_URL = `${REPOSITORY_URL}/blob/main/packages/ui-components/src/`;

const PACKAGE_GUIDES = {
  'i18n.md': 'packages/i18n/README.md',
};

const COMPONENTS_MANIFEST_PATH = 'manifests/components.json';
const DOCS_MANIFEST_PATH = 'manifests/docs.json';

const RAW_GUIDES_PATH = 'docs';

const VERSION_METADATA_PATH = 'docs/version.json';

const AGENT_DIRECTORY = 'agent';

const LLMS_INDEX_FILENAME = 'llms.txt';

const STORYBOOK_DIRECTORY = 'storybook';

const NOJEKYLL_FILENAME = '.nojekyll';

const REQUIRED_COMPONENTS = ['Button', 'Field', 'Form'];

const VERSIONED_PACKAGES = ['ui-components', 'ui-design-tokens', 'ui-utils', 'i18n'];

const SETUP_GUIDE_TITLE = 'Getting started';

const AGENT_GUIDE_TITLE = 'Agent access';

export {
  ROOT_DIRECTORY,
  COMPONENT_SOURCE_DIRECTORY,
  STORYBOOK_OUTPUT_DIRECTORY,
  GENERATED_DIRECTORY,
  GENERATED_DOCS_PATH,
  GENERATED_STATIC_PATH,
  GUIDES_DIRECTORY,
  COMPONENT_DOCS_DIRECTORY,
  STATIC_DIRECTORY,
  SITE_OUTPUT_DIRECTORY,
  TEMPLATES_DIRECTORY,
  SITE_URL,
  SITE_BASE_URL,
  REPOSITORY_URL,
  COMPONENT_SOURCE_URL,
  PACKAGE_GUIDES,
  COMPONENTS_MANIFEST_PATH,
  DOCS_MANIFEST_PATH,
  RAW_GUIDES_PATH,
  VERSION_METADATA_PATH,
  AGENT_DIRECTORY,
  LLMS_INDEX_FILENAME,
  STORYBOOK_DIRECTORY,
  NOJEKYLL_FILENAME,
  REQUIRED_COMPONENTS,
  VERSIONED_PACKAGES,
  SETUP_GUIDE_TITLE,
  AGENT_GUIDE_TITLE,
};
