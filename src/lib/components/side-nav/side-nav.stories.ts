import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsSideNavComponent } from './side-nav.component';

const meta: Meta<EdsSideNavComponent> = {
  title: 'Components/SideNav',
  component: EdsSideNavComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsSideNavComponent] })],
  args: { items: [{ label: 'Dashboard', href: '/', active: true }, { label: 'Settings', children: [{ label: 'Profile', href: '/profile' }] }] },
  render: (args) => ({ props: args, template: `<eds-side-nav [items]="items"></eds-side-nav>` }),
};
export default meta;
type Story = StoryObj<EdsSideNavComponent>;
export const Default: Story = {};
