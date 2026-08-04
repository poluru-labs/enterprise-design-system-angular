import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsInputComponent } from './input.component';

const meta: Meta<EdsInputComponent> = {
  title: 'Components/Input',
  component: EdsInputComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsInputComponent] })],
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
    size: 'md',
    disabled: false,
    invalid: false,
  },
};

export default meta;
type Story = StoryObj<EdsInputComponent>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { icon: 'mail', label: 'Email address' },
};

export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'Enter a valid email address.' },
};
