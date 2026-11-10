import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from '../link/Link';
import { Text } from '../text/Text';

import { Timeline } from './Timeline';

const meta = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],

  args: { 'aria-label': 'Version history', children: null },

  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
  },
} satisfies Meta<typeof Timeline>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Timeline {...args}>
      <Timeline.Item label="v2.0.0" current>
        <Text>Redesigned navigation and improved accessibility.</Text>
      </Timeline.Item>

      <Timeline.Item label="v1.1.0">
        <Text>Added dark mode.</Text>
      </Timeline.Item>

      <Timeline.Item label="v1.0.0">
        <Text>Initial release.</Text>
      </Timeline.Item>
    </Timeline>
  ),
};

export const Horizontal: Story = {
  ...Default,
  args: { orientation: 'horizontal' },
};

export const LabelsOnly: Story = {
  render: (args) => (
    <Timeline {...args}>
      <Timeline.Item label="v1.0.0" />

      <Timeline.Item label="v1.1.0" />

      <Timeline.Item label="v2.0.0" current />
    </Timeline>
  ),
};

export const RichContent: Story = {
  render: (args) => (
    <Timeline {...args}>
      <Timeline.Item label={<Link href="#v2">v2.0.0 release notes</Link>} current>
        <Text>
          <time dateTime="2026-11-10">November 10, 2026</time>
        </Text>

        <Text>Redesigned navigation and improved accessibility.</Text>
      </Timeline.Item>

      <Timeline.Item label={<Link href="#v1">v1.0.0 release notes</Link>}>
        <Text>Initial release.</Text>
      </Timeline.Item>
    </Timeline>
  ),
};

export default meta;
