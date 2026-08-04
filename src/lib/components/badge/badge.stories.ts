import type { Meta, StoryObj } from '@storybook/angular';
import { EdsBadgeComponent } from './badge.component';

const meta: Meta<EdsBadgeComponent> = {
  title: 'Components/Badge',
  component: EdsBadgeComponent,
  tags: ['autodocs'],
  args: { label: 'Beta', variant: 'brand', size: 'md', pill: false, soft: true },
};

export default meta;
type Story = StoryObj<EdsBadgeComponent>;
export const Default: Story = {};
export const SolidPill: Story = { args: { label: 'Live', variant: 'success', pill: true, soft: false } };
