import type { Meta, StoryObj } from '@storybook/angular';
import { EdsCodeSnippetComponent } from './code-snippet.component';

const meta: Meta<EdsCodeSnippetComponent> = {
  title: 'Components/CodeSnippet',
  component: EdsCodeSnippetComponent,
  tags: ['autodocs'],
  args: {
    code: '<eds-button variant="primary">Save</eds-button>',
    language: 'html',
    label: 'Code snippet',
  },
};

export default meta;
type Story = StoryObj<EdsCodeSnippetComponent>;
export const Default: Story = {};
