import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsRadioComponent } from './radio.component';
import { EdsRadioGroupComponent } from './radio-group.component';

const meta: Meta<EdsRadioGroupComponent> = {
  title: 'Components/Radio',
  component: EdsRadioGroupComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [EdsRadioGroupComponent, EdsRadioComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <eds-radio-group [label]="label" [name]="name" [value]="value" [orientation]="orientation">
        <eds-radio label="Free" value="free"></eds-radio>
        <eds-radio label="Pro" value="pro"></eds-radio>
        <eds-radio label="Enterprise" value="enterprise"></eds-radio>
      </eds-radio-group>
    `,
  }),
  args: {
    label: 'Plan',
    name: 'plan',
    value: 'pro',
    orientation: 'vertical',
  },
};

export default meta;
type Story = StoryObj<EdsRadioGroupComponent>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};
