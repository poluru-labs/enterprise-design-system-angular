import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EdsIconComponent } from './icon.component';
import { EDS_ICON_NAMES } from '../../icons/names';

const meta: Meta<EdsIconComponent> = {
  title: 'Components/Icon',
  component: EdsIconComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [EdsIconComponent] })],
  argTypes: {
    name: { control: 'select', options: EDS_ICON_NAMES },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  args: {
    name: 'search',
    size: 'md',
    decorative: true,
    label: '',
  },
};

export default meta;
type Story = StoryObj<EdsIconComponent>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center;">
        <eds-icon name="star" size="sm"></eds-icon>
        <eds-icon name="star" size="md"></eds-icon>
        <eds-icon name="star" size="lg"></eds-icon>
      </div>
    `,
  }),
};
