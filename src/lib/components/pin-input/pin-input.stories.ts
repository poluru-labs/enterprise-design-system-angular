import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsPinInputComponent } from './pin-input.component';

const meta: Meta<EdsPinInputComponent> = {
  title: 'Components/PinInput',
  component: EdsPinInputComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsPinInputComponent] })],
  args: {
    label: 'Verification code',
    length: 6,
    type: 'number',
  },
};

export default meta;
type Story = StoryObj<EdsPinInputComponent>;

export const Default: Story = {};

export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'Invalid code. Try again.' },
};
