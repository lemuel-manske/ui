import { Size } from '@lemuel-manske/design-tokens';

import { LinkAppearance } from './options';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],

  args: { children: 'Read more', href: '#details' },
} satisfies Meta<typeof Link>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;

export const Action: Story = { args: { appearance: LinkAppearance.ACTION } };

export const SmallDownload: Story = {
  args: {
    appearance: LinkAppearance.ACTION,
    size: Size.SMALL,
    href: '/capture.wacz',
    download: true,
    children: 'Download capture',
  },
};
