import type { Meta, StoryObj } from '@storybook/angular';
import { EdsAlertComponent } from './alert.component';

const meta: Meta<EdsAlertComponent> = {
  title: 'Components/Alert',
  component: EdsAlertComponent,
  tags: ['autodocs'],
  args: { variant: 'info', title: 'Update available', message: 'A new version is ready to install.', dismissible: true },
};

export default meta;
type Story = StoryObj<EdsAlertComponent>;
export const Default: Story = {};
export const Success: Story = { args: { variant: 'success', title: 'Success', message: 'Operation completed.' } };
