import { Size } from '@lemuel-manske/design-tokens';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  tags: ['autodocs'],

  component: Spinner,

  args: { label: 'Loading results' },

  argTypes: { size: { control: 'select', options: [Size.SMALL, Size.MEDIUM, Size.LARGE] } },
} satisfies Meta<typeof Spinner>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;

export const VisibleLabel: Story = {
  args: { labelHidden: false, label: 'Capturing archive' },
};
