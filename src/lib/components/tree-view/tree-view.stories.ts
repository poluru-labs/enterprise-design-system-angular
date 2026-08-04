import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsTreeViewComponent } from './tree-view.component';

const meta: Meta<EdsTreeViewComponent> = {
  title: 'Components/TreeView',
  component: EdsTreeViewComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsTreeViewComponent] })],
  args: { items: [{ id: '1', label: 'Documents', children: [{ id: '1a', label: 'Reports' }] }, { id: '2', label: 'Images' }], selectedId: '1a' },
  render: (args) => ({ props: args, template: `<eds-tree-view [items]="items" [selectedId]="selectedId"></eds-tree-view>` }),
};
export default meta;
type Story = StoryObj<EdsTreeViewComponent>;
export const Default: Story = {};
