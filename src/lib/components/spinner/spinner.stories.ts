import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsSpinnerComponent } from './spinner.component';

const meta: Meta<EdsSpinnerComponent> = {
  title: 'Components/Spinner',
  component: EdsSpinnerComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsSpinnerComponent] })],
  args: { size: 'md', label: 'Loading', showLabel: false },
  render: (args) => ({
    props: args,
    template: `<eds-spinner [size]="size" [label]="label" [showLabel]="showLabel"></eds-spinner>`,
  }),
};

export default meta;
type Story = StoryObj<EdsSpinnerComponent>;

export const Default: Story = {};
export const WithLabel: Story = { args: { showLabel: true } };
export const Large: Story = { args: { size: 'lg', showLabel: true } };
