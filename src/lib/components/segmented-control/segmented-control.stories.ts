import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsSegmentedControlComponent } from './segmented-control.component';

const meta: Meta<EdsSegmentedControlComponent> = {
  title: 'Components/SegmentedControl',
  component: EdsSegmentedControlComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsSegmentedControlComponent] })],
  args: { options: [{ label: 'List', value: 'list' }, { label: 'Grid', value: 'grid' }], value: 'list' },
  render: (args) => ({ props: args, template: `<eds-segmented-control [options]="options" [(value)]="value"></eds-segmented-control>` }),
};
export default meta;
type Story = StoryObj<EdsSegmentedControlComponent>;
export const Default: Story = {};
