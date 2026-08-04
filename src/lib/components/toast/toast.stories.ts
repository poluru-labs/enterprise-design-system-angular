import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { EdsToastComponent } from './toast.component';
import { ToastService } from './toast.service';

const meta: Meta<EdsToastComponent> = {
  title: 'Components/Toast',
  component: EdsToastComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [ToastService] }),
  ],
  args: {
    open: true,
    title: 'Changes saved',
    description: 'Your profile was updated successfully.',
    variant: 'success',
  },
};

export default meta;
type Story = StoryObj<EdsToastComponent>;

export const Default: Story = {};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Connection unstable',
    description: 'Some changes may not sync until you reconnect.',
  },
};
