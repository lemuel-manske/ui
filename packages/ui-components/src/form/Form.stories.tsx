import { Field } from '../field/Field';

import { Button } from '../button/Button';

import { Label } from '../label/Label';

import { Combobox } from '../combobox/Combobox';

import { Textarea } from '../textarea/Textarea';

import { Input } from '../input/Input';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect } from 'storybook/test';

import { Form } from './Form';

const meta = {
  title: 'Components/Form',
  tags: ['autodocs'],

  component: Form,

  args: { 'aria-label': 'Archive website', children: null },
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Form {...args} onSubmit={(event) => event.preventDefault()}>
      <Label htmlFor="website">Website URL</Label>

      <Input id="website" name="url" type="url" required placeholder="https://example.com" />

      <Label htmlFor="notes">Notes</Label>

      <Textarea id="notes" name="notes" />

      <Label htmlFor="collection">Collection</Label>

      <Combobox id="collection" name="collection" defaultValue="reading">
        <Combobox.Option value="reading">Reading</Combobox.Option>

        <Combobox.Option value="research">Research</Combobox.Option>
      </Combobox>

      <Button type="submit">
        <Button.Label>Archive website</Button.Label>
      </Button>
    </Form>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Form {...args}>
      <Label htmlFor="invalid-url">Website URL</Label>

      <Input
        id="invalid-url"
        type="url"
        defaultValue="example"
        aria-invalid
        aria-describedby="url-error"
      />

      <p id="url-error">Enter a complete URL, including https://.</p>
    </Form>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Form {...args}>
      <Label htmlFor="disabled-url">Website URL</Label>

      <Input id="disabled-url" disabled defaultValue="https://example.com" />

      <Button disabled>
        <Button.Label>Archiving…</Button.Label>
      </Button>
    </Form>
  ),
};

export const AccessibleFields: Story = {
  render: (args) => (
    <Form
      {...args}
      onSubmit={(event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        event.currentTarget.dataset.submittedUrl = String(data.get('url'));
      }}
    >
      <Field required>
        <Field.Label>Website URL (required)</Field.Label>

        <Field.Control>
          <Input name="url" type="url" placeholder="https://example.com" />
        </Field.Control>

        <Field.Description>Enter a complete URL, including https://.</Field.Description>
      </Field>

      <Button type="submit">
        <Button.Label>Archive website</Button.Label>
      </Button>
    </Form>
  ),

  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: 'Website URL (required)' });

    await expect(input).toBeRequired();

    await expect(input).toHaveAccessibleDescription('Enter a complete URL, including https://.');

    await userEvent.type(input, 'https://example.com');

    await userEvent.click(canvas.getByRole('button', { name: 'Archive website' }));

    await expect(canvas.getByRole('form', { name: 'Archive website' })).toHaveAttribute(
      'data-submitted-url',
      'https://example.com',
    );
  },
};

export default meta;
