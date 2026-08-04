import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsKbdComponent } from './kbd.component';

const meta: Meta<EdsKbdComponent> = {
  title: 'Components/Kbd',
  component: EdsKbdComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsKbdComponent] })],
  args: { keys: '⌘ K' },
  render: (args) => ({ props: args, template: `<eds-kbd [keys]="keys"></eds-kbd>` }),
};
export default meta;
type Story = StoryObj<EdsKbdComponent>;
export const Default: Story = {};
