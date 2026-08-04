import type { Meta, StoryObj } from '@storybook/angular';
import { EdsCardComponent } from './card.component';

const meta: Meta<EdsCardComponent> = {
  title: 'Components/Card',
  component: EdsCardComponent,
  tags: ['autodocs'],
  args: { elevated: false, padded: true },
  render: (args) => ({
    props: args,
    template: `
      <eds-card [elevated]="elevated" [padded]="padded" style="max-width:24rem;">
        <h3 header style="margin:0;font-size:1rem;">Card title</h3>
        <p style="margin:0;color:var(--eds-color-text-muted);">Card body content with supporting text.</p>
        <div footer style="display:flex;gap:0.5rem;justify-content:flex-end;">
          <button type="button">Action</button>
        </div>
      </eds-card>
    `,
  }),
};

export default meta;
type Story = StoryObj<EdsCardComponent>;
export const Default: Story = {};
export const Elevated: Story = { args: { elevated: true } };
