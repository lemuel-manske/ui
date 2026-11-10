import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect } from 'storybook/test';

import { Form } from './Form';

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],

  args: { 'aria-label': 'Archive website', children: null },
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Form {...args} onSubmit={(event) => event.preventDefault()}>
      <Form.Label htmlFor="website">Website URL</Form.Label>

      <Form.Input id="website" name="url" type="url" required placeholder="https://example.com" />

      <Form.Label htmlFor="notes">Notes</Form.Label>

      <Form.Textarea id="notes" name="notes" />

      <Form.Label htmlFor="collection">Collection</Form.Label>

      <Form.Combobox id="collection" name="collection" defaultValue="reading">
        <Form.Combobox.Option value="reading">Reading</Form.Combobox.Option>

        <Form.Combobox.Option value="research">Research</Form.Combobox.Option>
      </Form.Combobox>

      <Form.Button type="submit">
        <Form.Button.Label>Archive website</Form.Button.Label>
      </Form.Button>
    </Form>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Form {...args}>
      <Form.Label htmlFor="invalid-url">Website URL</Form.Label>

      <Form.Input
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
      <Form.Label htmlFor="disabled-url">Website URL</Form.Label>

      <Form.Input id="disabled-url" disabled defaultValue="https://example.com" />

      <Form.Button disabled>
        <Form.Button.Label>Archiving…</Form.Button.Label>
      </Form.Button>
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
      <Form.Field required>
        <Form.Field.Label>Website URL (required)</Form.Field.Label>

        <Form.Field.Control>
          <Form.Input name="url" type="url" placeholder="https://example.com" />
        </Form.Field.Control>

        <Form.Field.Description>Enter a complete URL, including https://.</Form.Field.Description>
      </Form.Field>

      <Form.Button type="submit">
        <Form.Button.Label>Archive website</Form.Button.Label>
      </Form.Button>
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
