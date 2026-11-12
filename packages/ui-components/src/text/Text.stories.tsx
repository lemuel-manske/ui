import { Size, Tone, Emphasis } from '@lemuel-manske/design-tokens';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  tags: ['autodocs'],

  component: Text,

  args: { children: 'A paragraph of supporting information.' },

  argTypes: {
    size: { control: 'select', options: [Size.SMALL, Size.MEDIUM, Size.LARGE] },
    tone: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', Tone.SUCCESS, Tone.DANGER],
    },
    emphasis: { control: 'select', options: Object.values(Emphasis) },
  },
} satisfies Meta<typeof Text>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;

export const SmallSecondary: Story = {
  args: { size: Size.SMALL, tone: 'secondary', children: 'capture-2026-11-11' },
};

export const Small: Story = {
  args: { size: Size.SMALL, children: 'Preserved collection' },
};

export const Success: Story = {
  args: { tone: Tone.SUCCESS, children: 'Capture complete' },
};

export const Danger: Story = {
  args: { tone: Tone.DANGER, children: 'Capture failed' },
};

export const Italic: Story = {
  args: { emphasis: Emphasis.ITALIC, children: 'Editorial note' },
};
