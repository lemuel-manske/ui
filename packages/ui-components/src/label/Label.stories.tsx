import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect } from 'storybook/test';

import { Input } from '../input/Input';

import { Label } from './Label';
import { Icon } from '../icon/Icon';
import { InfoIcon } from '../icon/ExampleIcons.test-fixture';

const meta = {
  title: 'Components/Label',
  tags: ['autodocs'],

  component: Label,
  subcomponents: { Icon },

  args: {
    children: 'Collection name',
    htmlFor: 'collection-name',
    size: 'medium',
  },

  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    tone: { control: 'select', options: ['default', 'danger', 'success', 'warning', 'info'] },
  },

  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--ui-space-8)', maxWidth: '25rem' }}>
      <Label {...args} />

      <Input id={args.htmlFor} name="collection" type="text" />
    </div>
  ),
} satisfies Meta<typeof Label>;

type Story = StoryObj<typeof meta>;

export const Medium: Story = {};

export const Small: Story = {
  args: { size: 'small' },
};

export const Large: Story = {
  args: { size: 'large' },
};

export const WithIcon: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--ui-space-8)', maxWidth: '25rem' }}>
      <Label {...args}>
        <Icon>
          <InfoIcon />
        </Icon>
        Collection name
      </Label>

      <Input id={args.htmlFor} name="collection" type="text" />
    </div>
  ),
};

export const StatusColors: Story = {
  render: (args) => (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--ui-space-16)' }}
    >
      {(['default', 'danger', 'success', 'warning', 'info'] as const).map((tone) => (
        <Label key={tone} {...args} htmlFor={undefined} tone={tone}>
          <Icon>
            <InfoIcon />
          </Icon>

          {tone}
        </Label>
      ))}
    </div>
  ),
};

export const AssociatedField: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: 'Collection name' });

    await userEvent.click(canvas.getByText('Collection name'));

    await expect(input).toHaveFocus();
  },
};

export default meta;
