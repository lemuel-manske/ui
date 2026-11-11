import { Size } from '@lemuel-manske/design-tokens';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Combobox } from './Combobox';

import { ComboboxOption } from './ComboboxOption';

import { ComboboxAppearance } from './options';

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
    size: { control: 'select', options: [Size.SMALL, Size.MEDIUM, Size.LARGE] },

    appearance: { control: 'select', options: Object.values(ComboboxAppearance) },

    children: { control: false },
  },
} satisfies Meta<typeof Combobox>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Native: Story = { args: { appearance: ComboboxAppearance.NATIVE } };

export const Disabled: Story = { args: { disabled: true } };

export default meta;
