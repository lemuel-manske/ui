import { Size, Weight } from '@lemuel-manske/design-tokens';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Fieldset, Legend } from './Fieldset';

import { Checkbox } from '../checkbox/Checkbox';

const meta = {
  title: 'Components/Fieldset',
  tags: ['autodocs'],

  component: Fieldset,
  subcomponents: { Legend },

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

export const Divided: Story = {
  args: { appearance: 'divided' },
  render: (args) => (
    <Fieldset {...args}>
      <Legend size={Size.LARGE} weight={Weight.SEMIBOLD}>
        Authentication
      </Legend>
      <Checkbox>Remember this account</Checkbox>
    </Fieldset>
  ),
};

export const Plain: Story = {
  args: { appearance: 'plain' },
  render: (args) => (
    <Fieldset {...args}>
      <Legend size={Size.SMALL}>Preferences</Legend>
      <Checkbox>Receive updates</Checkbox>
    </Fieldset>
  ),
};
