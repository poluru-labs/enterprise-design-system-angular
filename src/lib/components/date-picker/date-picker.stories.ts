import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsDatePickerComponent } from './date-picker.component';

const meta: Meta<EdsDatePickerComponent> = {
  title: 'Components/DatePicker',
  component: EdsDatePickerComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsDatePickerComponent] })],
  args: { label: 'Start date', value: '2026-01-15', placeholder: 'Select date' },
  render: (args) => ({
    props: args,
    template: `<eds-date-picker [label]="label" [value]="value" [placeholder]="placeholder" [hint]="hint" [invalid]="invalid"></eds-date-picker>`,
  }),
};
export default meta;
type Story = StoryObj<EdsDatePickerComponent>;
export const Default: Story = {};
export const WithHint: Story = { args: { hint: 'Pick a weekday' } };
