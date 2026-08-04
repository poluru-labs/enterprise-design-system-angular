import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsVisuallyHiddenComponent } from './visually-hidden.component';

const meta: Meta<EdsVisuallyHiddenComponent> = {
  title: 'Components/VisuallyHidden',
  component: EdsVisuallyHiddenComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsVisuallyHiddenComponent] })],
  render: (args) => ({ props: args, template: `<eds-visually-hidden>Hidden text for screen readers</eds-visually-hidden>` }),
};
export default meta;
type Story = StoryObj<EdsVisuallyHiddenComponent>;
export const Default: Story = {};
