import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsTimePickerComponent } from './time-picker.component';

const meta: Meta<EdsTimePickerComponent> = {
  title: 'Components/TimePicker',
  component: EdsTimePickerComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsTimePickerComponent] })],
  args: {
    label: 'Meeting time',
    value: '09:00',
    hint: '24-hour format (HH:MM)',
  },
};

export default meta;
type Story = StoryObj<EdsTimePickerComponent>;

export const Default: Story = {};

export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'Select a valid time.' },
};
