import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  tags: ['autodocs'],

  component: Link,

  args: { children: 'Read more', href: '#details' },
} satisfies Meta<typeof Link>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;

export const Action: Story = { args: { appearance: 'action' } };

export const SmallDownload: Story = {
  args: {
    appearance: 'action',
    size: 'small',
    href: '/capture.wacz',
    download: true,
    children: 'Download capture',
  },
};
