import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsSkeletonComponent } from './skeleton.component';

const meta: Meta<EdsSkeletonComponent> = {
  title: 'Components/Skeleton',
  component: EdsSkeletonComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsSkeletonComponent] })],
  args: { variant: 'text', lines: 3 },
  render: (args) => ({ props: args, template: `<eds-skeleton [variant]="variant" [lines]="lines"></eds-skeleton>` }),
};
export default meta;
type Story = StoryObj<EdsSkeletonComponent>;
export const Default: Story = {};
