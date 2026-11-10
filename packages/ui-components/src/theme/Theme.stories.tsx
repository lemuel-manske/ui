import type { Meta, StoryObj } from '@storybook/react-vite';

import { archiveTheme, libraryTheme } from '@lemuel-manske/design-tokens';

import { Button } from '../button/Button';

import { Theme } from './Theme';

const meta = {
  title: 'Components/Theme',
  component: Theme,
  tags: ['autodocs'],

  args: {
    theme: archiveTheme,
    children: (
      <Button>
        <Button.Label>Save changes</Button.Label>
      </Button>
    ),
  },
} satisfies Meta<typeof Theme>;

type Story = StoryObj<typeof meta>;

export const Archive: Story = {};

export const Library: Story = {
  args: { theme: libraryTheme },
};

export default meta;
