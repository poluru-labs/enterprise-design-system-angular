import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsComboboxComponent } from './combobox.component';

const meta: Meta<EdsComboboxComponent> = {
  title: 'Components/Combobox',
  component: EdsComboboxComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsComboboxComponent] })],
  args: {
    label: 'Fruit',
    placeholder: 'Search fruits…',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
      { label: 'Date', value: 'date' },
    ],
  },
};

export default meta;
type Story = StoryObj<EdsComboboxComponent>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'banana' },
};
