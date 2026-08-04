import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsCircularProgressComponent } from './circular-progress.component';

const meta: Meta<EdsCircularProgressComponent> = {
  title: 'Components/CircularProgress',
  component: EdsCircularProgressComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsCircularProgressComponent] })],
  args: { value: 75, showValue: true },
  render: (args) => ({ props: args, template: `<eds-circular-progress [value]="value" [showValue]="showValue"></eds-circular-progress>` }),
};
export default meta;
type Story = StoryObj<EdsCircularProgressComponent>;
export const Default: Story = {};
