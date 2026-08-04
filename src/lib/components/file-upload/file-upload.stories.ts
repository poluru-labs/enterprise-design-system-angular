import type { Meta, StoryObj } from '@storybook/angular';
import { EdsFileUploadComponent } from './file-upload.component';

const meta: Meta<EdsFileUploadComponent> = {
  title: 'Components/FileUpload',
  component: EdsFileUploadComponent,
  tags: ['autodocs'],
  args: { label: 'Attachments', hint: 'PDF or PNG up to 10 MB', multiple: true },
};

export default meta;
type Story = StoryObj<EdsFileUploadComponent>;
export const Default: Story = {};
