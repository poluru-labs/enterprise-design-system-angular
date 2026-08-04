import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsStatComponent } from './stat.component';

const meta: Meta<EdsStatComponent> = {
  title: 'Components/Stat',
  component: EdsStatComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsStatComponent] })],
  args: { value: '2,847', label: 'Total users', trend: 'up', trendValue: '12%', hint: 'vs last month' },
  render: (args) => ({ props: args, template: `<eds-stat [value]="value" [label]="label" [trend]="trend" [trendValue]="trendValue" [hint]="hint"></eds-stat>` }),
};
export default meta;
type Story = StoryObj<EdsStatComponent>;
export const Default: Story = {};
