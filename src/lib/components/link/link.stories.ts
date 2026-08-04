import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsLinkComponent } from './link.component';

const meta: Meta<EdsLinkComponent> = {
  title: 'Components/Link',
  component: EdsLinkComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsLinkComponent] })],
  args: { href: 'https://example.com', external: true, variant: 'default' },
  render: (args) => ({ props: args, template: `<eds-link [href]="href" [external]="external" [variant]="variant">Documentation</eds-link>` }),
};
export default meta;
type Story = StoryObj<EdsLinkComponent>;
export const Default: Story = {};
