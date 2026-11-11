import { Size, Tone } from '@lemuel-manske/design-tokens';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect } from 'storybook/test';

import { Label } from './Label';
import { Icon } from '../icon/Icon';
import { InfoIcon } from '../icon/ExampleIcons.test-fixture';

const meta = {
  title: 'Components/Label',
  component: Label,
  subcomponents: { Icon },
  tags: ['autodocs'],

  args: {
    children: 'Collection name',
    htmlFor: 'collection-name',
    size: Size.MEDIUM,
  },

  argTypes: {
    size: { control: 'select', options: Object.values(Size) },
    tone: { control: 'select', options: Object.values(Tone) },
  },

  render: (args) => (
    <div className="story-field">
      <Label {...args} />

      <input id={args.htmlFor} name="collection" type="text" />
    </div>
  ),
} satisfies Meta<typeof Label>;

type Story = StoryObj<typeof meta>;

export const Medium: Story = {};

export const Small: Story = {
  args: { size: Size.SMALL },
};

export const Large: Story = {
  args: { size: Size.LARGE },
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="story-field">
      <Label {...args}>
        <Icon>
          <InfoIcon />
        </Icon>
        Collection name
      </Label>

      <input id={args.htmlFor} name="collection" type="text" />
    </div>
  ),
};

export const StatusColors: Story = {
  render: (args) => (
    <div className="story-row">
      {Object.values(Tone).map((tone) => (
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
