import type { Meta, StoryObj } from '@storybook/angular';
import { EdsEmptyStateComponent } from './empty-state.component';

const meta: Meta<EdsEmptyStateComponent> = {
  title: 'Components/EmptyState',
  component: EdsEmptyStateComponent,
  tags: ['autodocs'],
  args: { heading: 'No files yet', description: 'Upload your first document to get started.', icon: true },
  render: (args) => ({
    props: args,
    template: `
      <eds-empty-state [heading]="heading" [description]="description" [icon]="icon">
        <button actions type="button">Upload file</button>
      </eds-empty-state>
    `,
  }),
};

export default meta;
type Story = StoryObj<EdsEmptyStateComponent>;
export const Default: Story = {};
