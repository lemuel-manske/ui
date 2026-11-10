import {
  GENERATED_DOCS_PATH,
  GENERATED_STATIC_PATH,
  LLMS_INDEX_FILENAME,
  REPOSITORY_URL,
  SITE_BASE_URL,
  SITE_URL,
  STORYBOOK_DIRECTORY,
} from '../scripts/docs-config.js';

const config = {
  title: 'Lemuel Manske UI',
  tagline: 'Accessible React components and semantic themes',
  url: SITE_URL,
  baseUrl: SITE_BASE_URL,
  trailingSlash: true,
  organizationName: 'lemuel-manske',
  projectName: 'ui',
  onBrokenLinks: 'throw',

  staticDirectories: [GENERATED_STATIC_PATH],

  presets: [
    [
      'classic',
      {
        docs: {
          path: GENERATED_DOCS_PATH,
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: `${REPOSITORY_URL}/tree/main/`,
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: { customCss: './src/custom.css' },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Lemuel Manske UI',
      items: [
        { type: 'docSidebar', sidebarId: 'guides', label: 'Guides', position: 'left' },
        { type: 'docSidebar', sidebarId: 'components', label: 'Components', position: 'left' },
        {
          href: `pathname://${SITE_BASE_URL}${STORYBOOK_DIRECTORY}/`,
          label: 'Storybook',
          position: 'right',
          target: '_self',
        },
        {
          href: `pathname://${SITE_BASE_URL}${LLMS_INDEX_FILENAME}`,
          label: 'For agents',
          position: 'right',
          target: '_self',
        },
        { href: REPOSITORY_URL, label: 'GitHub', position: 'right' },
      ],
    },
    colorMode: { defaultMode: 'light', respectPrefersColorScheme: true },
    prism: { additionalLanguages: ['bash', 'ini'] },
    footer: {
      style: 'light',
      copyright: 'React components, executable examples, and documentation from the same source.',
    },
  },
};

export default config;
