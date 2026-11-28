import type { Preview } from '@storybook/react-vite';

import '@lemuel-manske/design-tokens/styles.css';

import { Theme } from '../src/theme/Theme';

import { brandOptions, getBrandTheme } from './options';

import './storybook.css';

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <Theme theme={getBrandTheme(context.globals.brand)}>
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
        items: brandOptions,
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
