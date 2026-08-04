import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsTextareaComponent } from './textarea.component';

const meta: Meta<EdsTextareaComponent> = {
  title: 'Components/Textarea',
  component: EdsTextareaComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsTextareaComponent] })],
  args: {
    label: 'Description',
    placeholder: 'Enter details…',
    rows: 4,
  },
};

export default meta;
type Story = StoryObj<EdsTextareaComponent>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Maximum 500 characters.' },
};
