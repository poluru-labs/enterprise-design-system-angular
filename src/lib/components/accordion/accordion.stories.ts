import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsAccordionComponent } from './accordion.component';

const meta: Meta<EdsAccordionComponent> = {
  title: 'Components/Accordion',
  component: EdsAccordionComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsAccordionComponent] })],
  args: { items: [{ heading: 'General', content: 'General settings content.' }, { heading: 'Security', content: 'Security settings content.' }], single: true },
  render: (args) => ({ props: args, template: `<eds-accordion [items]="items" [single]="single"></eds-accordion>` }),
};
export default meta;
type Story = StoryObj<EdsAccordionComponent>;
export const Default: Story = {};
