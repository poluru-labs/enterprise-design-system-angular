import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsDataTableComponent } from './data-table.component';

const meta: Meta<EdsDataTableComponent> = {
  title: 'Components/DataTable',
  component: EdsDataTableComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsDataTableComponent] })],
  args: { columns: [{ key: 'name', label: 'Name', sortable: true }, { key: 'role', label: 'Role' }], rows: [{ name: 'Jane', role: 'Admin' }, { name: 'John', role: 'User' }], sortable: true, striped: true },
  render: (args) => ({ props: args, template: `<eds-data-table [columns]="columns" [rows]="rows" [sortable]="sortable" [striped]="striped"></eds-data-table>` }),
};
export default meta;
type Story = StoryObj<EdsDataTableComponent>;
export const Default: Story = {};
