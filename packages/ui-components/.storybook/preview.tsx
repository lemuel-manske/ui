import type { Preview } from '@storybook/react-vite';

import '@lkmliz/design-tokens/styles.css';

import { archiveTheme, libraryTheme } from '@lkmliz/design-tokens';

import { Theme } from '../src/theme/Theme';

import './storybook.css';

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <Theme theme={context.globals.brand === 'library' ? libraryTheme : archiveTheme}>
        <div className="storybook-theme">
          <Story />
        </div>
      </Theme>
    ),
  ],

  globalTypes: {
    brand: {
      description: 'Component theme',

      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'archive', title: 'OpenArquive' },
          { value: 'library', title: 'Library' },
        ],
      },
    },
  },

  initialGlobals: {
    brand: 'archive',
  },

  parameters: {
    layout: 'padded',

    a11y: {
      test: 'error',

      options: {
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
      },
    },
  },
};

export default preview;
