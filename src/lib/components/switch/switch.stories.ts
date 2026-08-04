import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsSwitchComponent } from './switch.component';

const meta: Meta<EdsSwitchComponent> = {
  title: 'Components/Switch',
  component: EdsSwitchComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsSwitchComponent] })],
  args: {
    label: 'Enable notifications',
    checked: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<EdsSwitchComponent>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};
