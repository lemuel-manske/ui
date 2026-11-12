import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  tags: ['autodocs'],

  component: Text,

  args: { children: 'A paragraph of supporting information.' },

  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    tone: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'success', 'danger'],
    },
    emphasis: { control: 'select', options: ['normal', 'italic'] },
  },
} satisfies Meta<typeof Text>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;

export const SmallSecondary: Story = {
  args: { size: 'small', tone: 'secondary', children: 'capture-2026-11-11' },
};

export const Small: Story = {
  args: { size: 'small', children: 'Preserved collection' },
};

export const Success: Story = {
  args: { tone: 'success', children: 'Capture complete' },
};

export const Danger: Story = {
  args: { tone: 'danger', children: 'Capture failed' },
};

export const Italic: Story = {
  args: { emphasis: 'italic', children: 'Editorial note' },
};
