import type { Meta, StoryObj } from '@storybook/react-vite';

import { Fieldset, Legend } from './Fieldset';

import { Checkbox } from '../checkbox/Checkbox';

const meta = {
  title: 'Components/Fieldset',
  component: Fieldset,
  subcomponents: { Legend },
  tags: ['autodocs'],

  args: { children: null },
} satisfies Meta<typeof Fieldset>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Fieldset {...args}>
      <Fieldset.Legend>Preferences</Fieldset.Legend>

      <Checkbox>Receive updates</Checkbox>
    </Fieldset>
  ),
};

export default meta;
