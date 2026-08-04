import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsStatusComponent } from './status.component';

const meta: Meta<EdsStatusComponent> = {
  title: 'Components/Status',
  component: EdsStatusComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsStatusComponent] })],
  args: { label: 'Active', variant: 'success', pulse: false },
  render: (args) => ({ props: args, template: `<eds-status [label]="label" [variant]="variant" [pulse]="pulse"></eds-status>` }),
};
export default meta;
type Story = StoryObj<EdsStatusComponent>;
export const Default: Story = {};
