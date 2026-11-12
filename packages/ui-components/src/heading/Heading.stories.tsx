import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from './Heading';

const meta = {
  title: 'Components/Heading',
  tags: ['autodocs'],

  component: Heading,

  args: { children: 'Section heading', level: 2 },

  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large', 'xlarge'] },

    weight: { control: 'select', options: ['regular', 'medium', 'semibold', 'bold'] },
    tone: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'success', 'danger'],
    },
    emphasis: { control: 'select', options: ['normal', 'italic'] },
  },
} satisfies Meta<typeof Heading>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Semibold: Story = {
  args: {
    children: 'Section heading',
    size: 'large',
    weight: 'semibold',
  },
};

export default meta;

export const XLarge: Story = { args: { size: 'xlarge', level: 1 } };

export const SectionTitle: Story = { args: { size: 'medium', level: 3 } };

export const XLargeItalic: Story = {
  args: {
    level: 1,
    size: 'xlarge',
    weight: 'bold',
    emphasis: 'italic',
    children: 'Section heading',
  },
};
