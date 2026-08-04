import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsButtonComponent } from '../button/button.component';
import { EdsButtonGroupComponent } from './button-group.component';

const meta: Meta<EdsButtonGroupComponent> = {
  title: 'Components/ButtonGroup',
  component: EdsButtonGroupComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsButtonGroupComponent, EdsButtonComponent] })],
  args: { size: 'md' },
  render: (args) => ({ props: args, template: `<eds-button-group [size]="size"><eds-button variant="secondary">Left</eds-button><eds-button variant="secondary">Center</eds-button><eds-button variant="secondary">Right</eds-button></eds-button-group>` }),
};
export default meta;
type Story = StoryObj<EdsButtonGroupComponent>;
export const Default: Story = {};
