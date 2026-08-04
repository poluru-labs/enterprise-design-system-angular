import type { Meta, StoryObj } from '@storybook/angular';
import { EdsPopoverComponent } from './popover.component';

const meta: Meta<EdsPopoverComponent> = {
  title: 'Components/Popover',
  component: EdsPopoverComponent,
  tags: ['autodocs'],
  args: { open: true, heading: 'Details', placement: 'bottom' },
  render: (args) => ({
    props: args,
    template: `
      <eds-popover [open]="open" [heading]="heading" [placement]="placement" (openChange)="open = $event">
        <button trigger type="button">Toggle popover</button>
        <p style="margin:0">Additional context appears in this panel.</p>
      </eds-popover>
    `,
  }),
};

export default meta;
type Story = StoryObj<EdsPopoverComponent>;
export const Default: Story = {};
