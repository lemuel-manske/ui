import { Size, Tone } from '@lemuel-manske/design-tokens';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Icon } from './Icon';
import { GlobeIcon } from './ExampleIcons.test-fixture';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],

  args: { children: <GlobeIcon /> },

  argTypes: {
    children: { control: false },
    size: { control: 'select', options: Object.values(Size) },
    tone: { control: 'select', options: Object.values(Tone) },
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
