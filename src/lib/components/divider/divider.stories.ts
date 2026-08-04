import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsDividerComponent } from './divider.component';

const meta: Meta<EdsDividerComponent> = {
  title: 'Components/Divider',
  component: EdsDividerComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsDividerComponent] })],
  args: { label: '', spacing: 'md' },
  render: (args) => ({ props: args, template: `<eds-divider [label]="label" [spacing]="spacing"></eds-divider>` }),
};

export default meta;
type Story = StoryObj<EdsDividerComponent>;

export const Default: Story = {};
