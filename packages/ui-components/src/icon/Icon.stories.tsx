import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Icon } from './Icon';
import { GlobeIcon } from './ExampleIcons.test-fixture';

const meta = {
  title: 'Components/Icon',
  tags: ['autodocs'],

  component: Icon,

  args: { children: <GlobeIcon /> },

  argTypes: {
    children: { control: false },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    tone: { control: 'select', options: ['default', 'danger', 'success', 'warning', 'info'] },
  },
} satisfies Meta<typeof Icon>;

type Story = StoryObj<typeof meta>;

export const Decorative: Story = {};

export const Informative: Story = {
  args: { label: 'Languages available' },
};

export const Clickable: Story = {
  args: { label: 'Change language', onClick: fn() },
};

export const Disabled: Story = {
  args: { label: 'Change language', onClick: fn(), disabled: true },
};

export default meta;
