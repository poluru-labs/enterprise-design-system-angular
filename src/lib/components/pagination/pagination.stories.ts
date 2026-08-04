import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsPaginationComponent } from './pagination.component';

const meta: Meta<EdsPaginationComponent> = {
  title: 'Components/Pagination',
  component: EdsPaginationComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsPaginationComponent] })],
  args: { page: 3, total: 120, pageSize: 10 },
  render: (args) => ({ props: args, template: `<eds-pagination [page]="page" [total]="total" [pageSize]="pageSize" (pageChange)="page = $event"></eds-pagination>` }),
};
export default meta;
type Story = StoryObj<EdsPaginationComponent>;
export const Default: Story = {};
