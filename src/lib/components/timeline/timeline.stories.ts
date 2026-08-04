import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsTimelineComponent } from './timeline.component';

const meta: Meta<EdsTimelineComponent> = {
  title: 'Components/Timeline',
  component: EdsTimelineComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsTimelineComponent] })],
  args: { items: [{ title: 'Order placed', timestamp: 'Jan 1', status: 'complete' }, { title: 'Processing', status: 'current' }, { title: 'Shipped', status: 'upcoming' }] },
  render: (args) => ({ props: args, template: `<eds-timeline [items]="items"></eds-timeline>` }),
};
export default meta;
type Story = StoryObj<EdsTimelineComponent>;
export const Default: Story = {};
