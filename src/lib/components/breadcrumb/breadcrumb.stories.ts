import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsBreadcrumbComponent } from './breadcrumb.component';

const meta: Meta<EdsBreadcrumbComponent> = {
  title: 'Components/Breadcrumb',
  component: EdsBreadcrumbComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsBreadcrumbComponent] })],
  args: { items: [{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Details' }] },
  render: (args) => ({ props: args, template: `<eds-breadcrumb [items]="items"></eds-breadcrumb>` }),
};
export default meta;
type Story = StoryObj<EdsBreadcrumbComponent>;
export const Default: Story = {};
