import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from '../link/Link';
import { ListItem } from '../list/List';

import { Navigation, NavigationList } from './Navigation';

const meta = {
  title: 'Components/Navigation',
  component: Navigation,
  subcomponents: { NavigationList },
  tags: ['autodocs'],

  args: { 'aria-label': 'Navegação principal' },
} satisfies Meta<typeof Navigation>;

type Story = StoryObj<typeof meta>;

export const SiteHeader: Story = {
  render: (args) => (
    <header
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 'var(--ui-space-16)',
      }}
    >
      <Link href="/" aria-label="OpenArquive — início">
        OpenArquive
      </Link>

      <Navigation {...args}>
        <Navigation.List>
          <ListItem>
            <Link href="#collection">Coleção</Link>
          </ListItem>

          <ListItem>
            <Link href="#new-capture">Arquivar</Link>
          </ListItem>
        </Navigation.List>
      </Navigation>
    </header>
  ),
};

export const Sidebar: Story = {
  args: { 'aria-label': 'Documentation' },

  render: (args) => (
    <Navigation {...args}>
      <Navigation.List orientation="vertical">
        <ListItem>
          <Link href="#overview" aria-current="location">
            Overview
          </Link>
        </ListItem>

        <ListItem>
          <Link href="#components">Components</Link>
        </ListItem>

        <ListItem>
          <Link href="#design-tokens">Design tokens</Link>
        </ListItem>
      </Navigation.List>
    </Navigation>
  ),
};

export default meta;
