import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsSearchComponent } from './search.component';

const meta: Meta<EdsSearchComponent> = {
  title: 'Components/Search',
  component: EdsSearchComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsSearchComponent] })],
  args: {
    placeholder: 'Search documents…',
    clearable: true,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<EdsSearchComponent>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'quarterly report' },
};
