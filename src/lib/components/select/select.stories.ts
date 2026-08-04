import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsSelectComponent } from './select.component';

const meta: Meta<EdsSelectComponent> = {
  title: 'Components/Select',
  component: EdsSelectComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsSelectComponent] })],
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' },
    ],
  },
};

export default meta;
type Story = StoryObj<EdsSelectComponent>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'ca' },
};
