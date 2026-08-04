import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsMeterComponent } from './meter.component';

const meta: Meta<EdsMeterComponent> = {
  title: 'Components/Meter',
  component: EdsMeterComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsMeterComponent] })],
  args: { value: 65, label: 'Storage used', showValue: true },
  render: (args) => ({ props: args, template: `<eds-meter [value]="value" [label]="label" [showValue]="showValue"></eds-meter>` }),
};
export default meta;
type Story = StoryObj<EdsMeterComponent>;
export const Default: Story = {};
