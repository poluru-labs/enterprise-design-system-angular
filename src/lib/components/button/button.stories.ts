import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsButtonComponent } from './button.component';

const meta: Meta<EdsButtonComponent> = {
  title: 'Components/Button',
  component: EdsButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [EdsButtonComponent],
    }),
  ],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    icon: { control: 'text' },
    iconTrailing: { control: 'text' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false,
  },
  render: (args) => ({
    props: args,
    template: `<eds-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [fullWidth]="fullWidth"
      [icon]="icon"
      [iconTrailing]="iconTrailing"
      [iconOnly]="iconOnly"
      [accessibleLabel]="iconOnly ? 'Settings' : ''"
    >{{ iconOnly ? '' : 'Continue' }}</eds-button>`,
  }),
};

export default meta;
type Story = StoryObj<EdsButtonComponent>;

export const Primary: Story = {};

export const WithIcon: Story = {
  args: { icon: 'plus' },
  render: (args) => ({
    props: args,
    template: `<eds-button [variant]="variant" [size]="size" [icon]="icon">Add item</eds-button>`,
  }),
};

export const Loading: Story = {
  args: { loading: true, icon: 'save' },
  render: (args) => ({
    props: args,
    template: `<eds-button [loading]="loading" [icon]="icon">Saving</eds-button>`,
  }),
};
