import type { Meta, StoryObj } from '@storybook/angular';
import { EdsDrawerComponent } from './drawer.component';

const meta: Meta<EdsDrawerComponent> = {
  title: 'Components/Drawer',
  component: EdsDrawerComponent,
  tags: ['autodocs'],
  args: { open: true, heading: 'Settings', side: 'right', size: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <eds-drawer [open]="open" [heading]="heading" [side]="side" [size]="size" (openChange)="open = $event">
        <p style="margin:0">Drawer body content goes here.</p>
      </eds-drawer>
    `,
  }),
};

export default meta;
type Story = StoryObj<EdsDrawerComponent>;
export const Default: Story = {};
export const LeftPanel: Story = { args: { side: 'left', heading: 'Navigation' } };
