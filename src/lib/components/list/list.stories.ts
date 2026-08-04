import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsListComponent } from './list.component';

const meta: Meta<EdsListComponent> = {
  title: 'Components/List',
  component: EdsListComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsListComponent] })],
  args: { items: [{ label: 'Inbox', description: '12 unread' }, { label: 'Sent', selected: true }], divided: true },
  render: (args) => ({ props: args, template: `<eds-list [items]="items" [divided]="divided"></eds-list>` }),
};
export default meta;
type Story = StoryObj<EdsListComponent>;
export const Default: Story = {};
