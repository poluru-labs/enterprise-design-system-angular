import type { Meta, StoryObj } from '@storybook/angular';
import { EdsSplitButtonComponent } from './split-button.component';
import { EdsMenuItemComponent } from '../dropdown-menu/menu-item.component';

const meta: Meta<EdsSplitButtonComponent> = {
  title: 'Components/SplitButton',
  component: EdsSplitButtonComponent,
  tags: ['autodocs'],
  args: { label: 'Save', variant: 'primary', size: 'md', disabled: false },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [EdsMenuItemComponent] },
    template: `
      <eds-split-button [label]="label" [variant]="variant" [size]="size" [disabled]="disabled">
        <eds-menu-item label="Save draft" value="draft"></eds-menu-item>
        <eds-menu-item label="Publish" value="publish"></eds-menu-item>
      </eds-split-button>
    `,
  }),
};

export default meta;
type Story = StoryObj<EdsSplitButtonComponent>;
export const Default: Story = {};
