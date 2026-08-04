import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsStepperComponent } from './stepper.component';

const meta: Meta<EdsStepperComponent> = {
  title: 'Components/Stepper',
  component: EdsStepperComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsStepperComponent] })],
  args: { steps: [{ label: 'Account', description: 'Create account' }, { label: 'Profile', description: 'Add details' }, { label: 'Review' }], current: 1 },
  render: (args) => ({ props: args, template: `<eds-stepper [steps]="steps" [current]="current"></eds-stepper>` }),
};
export default meta;
type Story = StoryObj<EdsStepperComponent>;
export const Default: Story = {};
