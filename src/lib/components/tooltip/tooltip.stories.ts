import type { Meta, StoryObj } from '@storybook/angular';
import { EdsTooltipComponent } from './tooltip.component';

const meta: Meta<EdsTooltipComponent> = {
  title: 'Components/Tooltip',
  component: EdsTooltipComponent,
  tags: ['autodocs'],
  args: { content: 'Helpful tip', placement: 'top', delay: 200 },
  render: (args) => ({
    props: args,
    template: `
      <eds-tooltip [content]="content" [placement]="placement" [delay]="delay">
        <button type="button">Hover me</button>
      </eds-tooltip>
    `,
  }),
};

export default meta;
type Story = StoryObj<EdsTooltipComponent>;
export const Default: Story = {};
