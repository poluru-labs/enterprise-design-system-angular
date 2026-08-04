import type { Meta, StoryObj } from '@storybook/angular';
import { EdsModalComponent } from './modal.component';

const meta: Meta<EdsModalComponent> = {
  title: 'Components/Modal',
  component: EdsModalComponent,
  tags: ['autodocs'],
  args: {
    heading: 'Confirm action',
    open: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <eds-modal
        [open]="open"
        [heading]="heading"
        [closeOnBackdrop]="closeOnBackdrop"
        [closeOnEscape]="closeOnEscape"
        (openChange)="open = $event"
      >
        <p style="margin:0">This action cannot be undone. Review the details carefully before continuing.</p>
        <div footer style="display:flex; gap:0.5rem; justify-content:flex-end;">
          <button type="button" (click)="open = false">Cancel</button>
          <button type="button" (click)="open = false">Confirm</button>
        </div>
      </eds-modal>
    `,
  }),
};

export default meta;
type Story = StoryObj<EdsModalComponent>;

export const Default: Story = {};
export const CustomHeading: Story = { args: { heading: 'Archive workspace?' } };
