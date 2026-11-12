import type { Meta, StoryObj } from '@storybook/react-vite';

import { Combobox } from './Combobox';

import { ComboboxOption } from './ComboboxOption';

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  subcomponents: { ComboboxOption },
  tags: ['autodocs'],

  args: {
    'aria-label': 'Site',
    defaultValue: 'public',

    children: (
      <>
        <Combobox.Option value="public">Página pública (sem login)</Combobox.Option>

        <Combobox.Option value="example">example.org</Combobox.Option>

        <Combobox.Option value="library">library.example.org</Combobox.Option>
      </>
    ),
  },

  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },

    children: { control: false },
  },
} satisfies Meta<typeof Combobox>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export default meta;
