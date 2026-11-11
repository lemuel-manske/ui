import { Size } from '@lemuel-manske/design-tokens';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],

  args: { children: 'A paragraph of supporting information.' },

  argTypes: { size: { control: 'select', options: Object.values(Size) } },
} satisfies Meta<typeof Text>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
