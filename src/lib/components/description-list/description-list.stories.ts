import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsDescriptionListComponent } from './description-list.component';

const meta: Meta<EdsDescriptionListComponent> = {
  title: 'Components/DescriptionList',
  component: EdsDescriptionListComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsDescriptionListComponent] })],
  args: { items: [{ term: 'Name', description: 'Jane Doe' }, { term: 'Email', description: 'jane@example.com' }], columns: 1 },
  render: (args) => ({ props: args, template: `<eds-description-list [items]="items" [columns]="columns"></eds-description-list>` }),
};
export default meta;
type Story = StoryObj<EdsDescriptionListComponent>;
export const Default: Story = {};
