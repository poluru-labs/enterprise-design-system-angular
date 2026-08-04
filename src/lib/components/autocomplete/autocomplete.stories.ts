import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsAutocompleteComponent } from './autocomplete.component';

const meta: Meta<EdsAutocompleteComponent> = {
  title: 'Components/Autocomplete',
  component: EdsAutocompleteComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsAutocompleteComponent] })],
  args: {
    label: 'Framework',
    placeholder: 'Start typing…',
    suggestions: ['Angular', 'React', 'Vue', 'Svelte', 'Solid'],
    minChars: 1,
  },
};

export default meta;
type Story = StoryObj<EdsAutocompleteComponent>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'Ang' },
};
