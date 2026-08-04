import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsDateRangePickerComponent } from './date-range-picker.component';

const meta: Meta<EdsDateRangePickerComponent> = {
  title: 'Components/DateRangePicker',
  component: EdsDateRangePickerComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsDateRangePickerComponent] })],
  args: { label: 'Date range', startValue: '2026-01-01', endValue: '2026-01-31' },
  render: (args) => ({
    props: args,
    template: `<eds-date-range-picker [label]="label" [startValue]="startValue" [endValue]="endValue"></eds-date-range-picker>`,
  }),
};
export default meta;
type Story = StoryObj<EdsDateRangePickerComponent>;
export const Default: Story = {};
