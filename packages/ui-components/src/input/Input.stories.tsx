import { Size } from '@lemuel-manske/design-tokens';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],

  args: { 'aria-label': 'Name', placeholder: 'Enter your name' },

  argTypes: { size: { control: 'select', options: Object.values(Size) } },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
