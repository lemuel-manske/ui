import { Size, Weight } from '@lemuel-manske/design-tokens';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from './Heading';

const meta = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],

  args: { children: 'Section heading', level: 2 },

  argTypes: {
    size: { control: 'select', options: Object.values(Size) },

    weight: { control: 'select', options: Object.values(Weight) },
  },
} satisfies Meta<typeof Heading>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Semibold: Story = {
  args: {
    children: 'A web muda. Suas capturas permanecem.',
    size: Size.LARGE,
    weight: Weight.SEMIBOLD,
  },
};

export default meta;
