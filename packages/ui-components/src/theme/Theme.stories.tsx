import type { Meta, StoryObj } from '@storybook/react-vite';

import { archiveTheme, libraryTheme, createTheme } from '@lemuel-manske/design-tokens';

import { Heading } from '../heading/Heading';

import { Text } from '../text/Text';

import { Button } from '../button/Button';

import { Theme } from './Theme';

const meta = {
  title: 'Components/Theme',
  tags: ['autodocs'],

  component: Theme,

  args: {
    children: (
      <Button>
        <Button.Label>Save changes</Button.Label>
      </Button>
    ),
  },
} satisfies Meta<typeof Theme>;

type Story = StoryObj<typeof meta>;

export const Archive: Story = {
  args: { theme: archiveTheme },
};

export const Library: Story = {
  args: { theme: libraryTheme },
};

export default meta;

const brand = createTheme(libraryTheme, {
  color: { background: '#FFFFFF', 'text-primary': '#172554' },
  action: { primary: '#1D4ED8', 'primary-hover': '#1E40AF', 'primary-foreground': '#FFFFFF' },
  font: { display: 'system-ui, sans-serif' },
  component: { 'button-radius': '9999px', 'button-weight': 'var(--ui-weight-bold)' },
});

export const CustomBrand: Story = {
  args: { theme: brand },
  render: (args) => (
    <Theme {...args}>
      <Heading level={2} size="xlarge" weight="bold" emphasis="italic">
        Dashboard
      </Heading>
      <Text size="small">capture-2026-11-11</Text>
      <Button>Continue</Button>
    </Theme>
  ),
};

export const NestedBrands: Story = {
  args: { theme: archiveTheme },
  render: (args) => (
    <Theme {...args}>
      <Heading>Archive workspace</Heading>
      <Button>Archive action</Button>
      <Theme theme={brand}>
        <Heading>Partner workspace</Heading>
        <Button>Partner action</Button>
      </Theme>
      <Button>Archive action again</Button>
    </Theme>
  ),
};
