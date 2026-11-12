import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  tags: ['autodocs'],

  component: Textarea,

  args: { 'aria-label': 'Notes', placeholder: 'Add notes' },

  argTypes: { size: { control: 'select', options: ['small', 'medium', 'large'] } },
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
