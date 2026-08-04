import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsSliderComponent } from './slider.component';

const meta: Meta<EdsSliderComponent> = {
  title: 'Components/Slider',
  component: EdsSliderComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsSliderComponent] })],
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showValue: true,
  },
};

export default meta;
type Story = StoryObj<EdsSliderComponent>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, value: 30 },
};
