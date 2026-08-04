import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsRatingComponent } from './rating.component';

const meta: Meta<EdsRatingComponent> = {
  title: 'Components/Rating',
  component: EdsRatingComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsRatingComponent] })],
  args: { value: 3, max: 5 },
  render: (args) => ({ props: args, template: `<eds-rating [(value)]="value" [max]="max"></eds-rating>` }),
};
export default meta;
type Story = StoryObj<EdsRatingComponent>;
export const Default: Story = {};
