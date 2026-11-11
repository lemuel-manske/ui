import { Size, Tone, Variant } from '@lemuel-manske/design-tokens';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, fn } from 'storybook/test';

import { Button } from './Button';
import { ButtonLabel } from './ButtonLabel';
import { Icon } from '../icon/Icon';
import { CheckIcon, InfoIcon } from '../icon/ExampleIcons.test-fixture';

const meta = {
  title: 'Components/Button',
  component: Button,
  subcomponents: { ButtonLabel, Icon },
  tags: ['autodocs'],

  args: {
    children: 'Archive website',
    size: Size.MEDIUM,
    variant: Variant.PRIMARY,
    onClick: fn(),
  },

  argTypes: {
    size: { control: 'select', options: [Size.SMALL, Size.MEDIUM, Size.LARGE] },
    variant: { control: 'select', options: Object.values(Variant) },
    tone: { control: 'select', options: Object.values(Tone) },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: Variant.SECONDARY },
};

export const Tertiary: Story = {
  args: { variant: Variant.TERTIARY },
};

export const Sizes: Story = {
  render: (args) => (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--ui-space-16)' }}
    >
      {([Size.SMALL, Size.MEDIUM, Size.LARGE] as const).map((size) => (
        <Button {...args} key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, onClick: fn() },

  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole('button', { name: 'Archive website' });

    await userEvent.click(button);

    await expect(button).toBeDisabled();

    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Keyboard: Story = {
  args: { onClick: fn() },

  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole('button', { name: 'Archive website' });

    await userEvent.tab();

    await expect(button).toHaveFocus();

    await userEvent.keyboard('{Enter}');

    await userEvent.keyboard(' ');

    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

export const LongLabel: Story = {
  args: {
    children: 'Preserve this website and its historical context in your personal collection',
  },
};

export const Rebranded: Story = {
  globals: { brand: 'library' },
};

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Icon>
        <CheckIcon />
      </Icon>

      <Button.Label>Save changes</Button.Label>
    </Button>
  ),
};

export const IconOnly: Story = {
  args: { 'aria-label': 'Show details', variant: Variant.TERTIARY },
  render: (args) => (
    <Button {...args}>
      <Icon>
        <InfoIcon />
      </Icon>
    </Button>
  ),
};

export const StatusColors: Story = {
  render: (args) => (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--ui-space-16)' }}
    >
      {Object.values(Tone).map((tone) => (
        <Button {...args} key={tone} tone={tone}>
          <Icon>
            <CheckIcon />
          </Icon>

          <Button.Label>{tone}</Button.Label>
        </Button>
      ))}
    </div>
  ),
};

export const Submit: Story = {
  args: { type: 'submit' },

  render: (args) => (
    <form
      aria-label="Example form"
      onSubmit={(event) => {
        event.preventDefault();

        event.currentTarget.dataset.submitted = 'true';
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'var(--ui-space-16)',
        }}
      >
        <Button {...args} />

        <Button variant={Variant.TERTIARY}>Cancel</Button>
      </div>
    </form>
  ),
};

export default meta;
