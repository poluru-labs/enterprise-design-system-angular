import type { Meta, StoryObj } from '@storybook/angular';
import { EdsAvatarComponent } from './avatar.component';

const meta: Meta<EdsAvatarComponent> = {
  title: 'Components/Avatar',
  component: EdsAvatarComponent,
  tags: ['autodocs'],
  args: { name: 'Jane Doe', size: 'md' },
};

export default meta;
type Story = StoryObj<EdsAvatarComponent>;
export const Default: Story = {};
export const Large: Story = { args: { size: 'lg', name: 'Alex Kim' } };
