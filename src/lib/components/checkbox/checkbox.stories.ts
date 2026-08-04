import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsCheckboxComponent } from './checkbox.component';

const meta: Meta<EdsCheckboxComponent> = {
  title: 'Components/Checkbox',
  component: EdsCheckboxComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsCheckboxComponent] })],
  args: {
    label: 'Send me product updates',
    checked: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<EdsCheckboxComponent>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Select all' },
};
