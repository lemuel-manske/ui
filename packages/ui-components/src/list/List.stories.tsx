import type { Meta, StoryObj } from '@storybook/react-vite';

import { List } from './List';

const meta = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],

  args: { children: null },

  argTypes: {
    as: { control: 'inline-radio', options: ['ul', 'ol'] },
    marker: { control: 'inline-radio', options: ['default', 'none'] },
  },
} satisfies Meta<typeof List>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <List {...args}>
      <List.Item>Reusable components</List.Item>

      <List.Item>Shared design tokens</List.Item>

      <List.Item>Accessible interactions</List.Item>
    </List>
  ),
};

export const Ordered: Story = {
  ...Default,
  args: { as: 'ol' },
};

export const WithoutMarkers: Story = {
  ...Default,
  args: { marker: 'none' },
};

export const Reversed: Story = {
  ...Default,
  args: { as: 'ol', start: 5, reversed: true },
};

export const Nested: Story = {
  render: (args) => (
    <List {...args}>
      <List.Item>
        Components
        <List>
          <List.Item>Buttons</List.Item>

          <List.Item>Lists</List.Item>
        </List>
      </List.Item>

      <List.Item>
        Release process
        <List as="ol">
          <List.Item>Build</List.Item>

          <List.Item>Test</List.Item>

          <List.Item>Publish</List.Item>
        </List>
      </List.Item>
    </List>
  ),
};

export default meta;
