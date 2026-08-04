import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsTabsComponent } from './tabs.component';

const meta: Meta<EdsTabsComponent> = {
  title: 'Components/Tabs',
  component: EdsTabsComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsTabsComponent] })],
  args: { tabs: [{ label: 'Overview', content: 'Overview panel' }, { label: 'Settings', content: 'Settings panel' }], selectedIndex: 0 },
  render: (args) => ({ props: args, template: `<eds-tabs [tabs]="tabs" [(selectedIndex)]="selectedIndex"></eds-tabs>` }),
};
export default meta;
type Story = StoryObj<EdsTabsComponent>;
export const Default: Story = {};
