import { Size, Tone, Weight, Emphasis } from '@lemuel-manske/design-tokens';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from './Heading';

const meta = {
  title: 'Components/Heading',
  tags: ['autodocs'],

  component: Heading,

  args: { children: 'Section heading', level: 2 },

  argTypes: {
    size: { control: 'select', options: Object.values(Size) },

    weight: { control: 'select', options: Object.values(Weight) },
    tone: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', Tone.SUCCESS, Tone.DANGER],
    },
    emphasis: { control: 'select', options: Object.values(Emphasis) },
  },
} satisfies Meta<typeof Heading>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Semibold: Story = {
  args: {
    children: 'Section heading',
    size: Size.LARGE,
    weight: Weight.SEMIBOLD,
  },
};

export default meta;

export const XLarge: Story = { args: { size: Size.XLARGE, level: 1 } };

export const SectionTitle: Story = { args: { size: Size.MEDIUM, level: 3 } };

export const XLargeItalic: Story = {
  args: {
    level: 1,
    size: Size.XLARGE,
    weight: Weight.BOLD,
    emphasis: Emphasis.ITALIC,
    children: 'Section heading',
  },
};
