import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsProgressBarComponent } from './progress-bar.component';

const meta: Meta<EdsProgressBarComponent> = {
  title: 'Components/ProgressBar',
  component: EdsProgressBarComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsProgressBarComponent] })],
  args: { value: 72, label: 'Uploading', showValue: true },
  render: (args) => ({ props: args, template: `<eds-progress-bar [value]="value" [label]="label" [showValue]="showValue"></eds-progress-bar>` }),
};
export default meta;
type Story = StoryObj<EdsProgressBarComponent>;
export const Default: Story = {};
