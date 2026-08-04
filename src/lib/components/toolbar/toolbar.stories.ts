import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsToolbarComponent } from './toolbar.component';

const meta: Meta<EdsToolbarComponent> = {
  title: 'Components/Toolbar',
  component: EdsToolbarComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsToolbarComponent] })],
  args: { bordered: true },
  render: (args) => ({ props: args, template: `<eds-toolbar [bordered]="bordered" start="Filter" center="Results" end="Export"></eds-toolbar>` }),
};
export default meta;
type Story = StoryObj<EdsToolbarComponent>;
export const Default: Story = {};
