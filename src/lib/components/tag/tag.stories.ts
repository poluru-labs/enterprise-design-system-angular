import type { Meta, StoryObj } from '@storybook/angular';
import { EdsTagComponent } from './tag.component';

const meta: Meta<EdsTagComponent> = {
  title: 'Components/Tag',
  component: EdsTagComponent,
  tags: ['autodocs'],
  args: { label: 'Design', variant: 'brand', dismissible: true },
};

export default meta;
type Story = StoryObj<EdsTagComponent>;
export const Default: Story = {};
