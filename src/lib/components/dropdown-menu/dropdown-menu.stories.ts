import type { Meta, StoryObj } from '@storybook/angular';
import { EdsDropdownMenuComponent } from './dropdown-menu.component';
import { EdsMenuItemComponent } from './menu-item.component';

const meta: Meta<EdsDropdownMenuComponent> = {
  title: 'Components/DropdownMenu',
  component: EdsDropdownMenuComponent,
  tags: ['autodocs'],
  args: { open: true, placement: 'bottom' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [EdsMenuItemComponent] },
    template: `
      <eds-dropdown-menu [open]="open" [placement]="placement" (openChange)="open = $event">
        <button trigger type="button">Actions</button>
        <eds-menu-item label="Edit" value="edit"></eds-menu-item>
        <eds-menu-item label="Duplicate" value="duplicate"></eds-menu-item>
        <eds-menu-item label="Delete" value="delete" [danger]="true"></eds-menu-item>
      </eds-dropdown-menu>
    `,
  }),
};

export default meta;
type Story = StoryObj<EdsDropdownMenuComponent>;
export const Default: Story = {};
