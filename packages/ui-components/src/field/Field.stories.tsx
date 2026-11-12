import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect } from 'storybook/test';

import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from './Field';

import { Input } from '../input/Input';

const meta = {
  title: 'Components/Field',
  tags: ['autodocs'],

  component: Field,
  subcomponents: {
    FieldLabel,
    FieldControl,
    FieldDescription,
    FieldError,
  },

  args: { children: null },
} satisfies Meta<typeof Field>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <Field.Label>Name</Field.Label>

      <Field.Control>
        <Input />
      </Field.Control>

      <Field.Description>Use your full name.</Field.Description>
    </Field>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Field {...args}>
      <Field.Label>Email</Field.Label>

      <Field.Control>
        <Input name="email" type="email" defaultValue="invalid" />
      </Field.Control>

      <Field.Description>Use an address you check regularly.</Field.Description>

      <Field.Error>Enter a valid email address.</Field.Error>
    </Field>
  ),

  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Email' });

    await expect(input).toHaveAttribute('aria-invalid', 'true');

    await expect(input).toHaveAccessibleDescription(
      'Use an address you check regularly. Enter a valid email address.',
    );
  },
};

export const Required: Story = {
  ...Default,

  args: { required: true },
};

export const Disabled: Story = {
  ...Default,

  args: { disabled: true },
};

export default meta;
