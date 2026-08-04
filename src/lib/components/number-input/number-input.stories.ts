import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsNumberInputComponent } from './number-input.component';

const meta: Meta<EdsNumberInputComponent> = {
  title: 'Components/NumberInput',
  component: EdsNumberInputComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsNumberInputComponent] })],
  args: {
    label: 'Quantity',
    value: 1,
    min: 0,
    max: 99,
    step: 1,
  },
};

export default meta;
type Story = StoryObj<EdsNumberInputComponent>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Minimum order quantity is 1.' },
};
