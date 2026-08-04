import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';

export interface EdsFileUploadChangeDetail {
  files: File[];
}

@Component({
  selector: 'eds-file-upload',
  standalone: true,
  template: `
    <div class="field">
      @if (label) {
        <label class="label" [attr.for]="inputId">{{ label }}</label>
      }
      <div
        class="dropzone"
        role="button"
        [attr.tabindex]="disabled ? -1 : 0"
        [attr.aria-disabled]="disabled"
        [attr.data-disabled]="disabled ? 'true' : 'false'"
        [attr.data-dragover]="dragOver ? 'true' : 'false'"
        (click)="openFileDialog()"
        (keydown)="onKeydown($event)"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave()"
        (drop)="onDrop($event)"
      >
        <span class="icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 16V8M12 8L9 11M12 8L15 11"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 16.5V17.5C4 18.8807 5.11929 20 6.5 20H17.5C18.8807 20 20 18.8807 20 17.5V16.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <p class="prompt"><strong>Click to upload</strong> or drag and drop</p>
        <p class="prompt-subtle">{{ multiple ? 'Multiple files supported' : 'Single file only' }}</p>
      </div>
      <input
        #fileInput
        [id]="inputId"
        class="file-input"
        type="file"
        [accept]="accept || undefined"
        [multiple]="multiple"
        [disabled]="disabled"
        (change)="onInputChange($event)"
      />
      @if (hint) {
        <span class="hint">{{ hint }}</span>
      }
      @if (selectedFiles.length) {
        <ul class="file-list" aria-live="polite">
          @for (file of selectedFiles; track file.name) {
            <li class="file-item">{{ file.name }}</li>
          }
        </ul>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-2);
      }

      .label {
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-text);
      }

      .dropzone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--eds-space-2);
        min-height: 8rem;
        padding: var(--eds-space-5);
        border: 1px dashed var(--eds-color-border-strong);
        border-radius: var(--eds-radius-lg);
        background: var(--eds-color-surface);
        color: var(--eds-color-text-muted);
        text-align: center;
        cursor: pointer;
      }

      .dropzone:hover:not([data-disabled='true']) {
        border-color: var(--eds-color-primary);
        background: var(--eds-color-brand-50);
      }

      .dropzone[data-dragover='true'] {
        border-color: var(--eds-color-primary);
        background: var(--eds-color-brand-50);
        box-shadow: var(--eds-shadow-focus);
      }

      .dropzone[data-disabled='true'] {
        opacity: 0.55;
        cursor: not-allowed;
        background: var(--eds-color-ink-50);
      }

      .icon {
        display: inline-flex;
        color: var(--eds-color-primary);
        line-height: 0;
      }

      .prompt {
        margin: 0;
        font-size: var(--eds-font-size-sm);
        color: var(--eds-color-text);
      }

      .prompt-subtle {
        margin: 0;
        font-size: var(--eds-font-size-xs);
        color: var(--eds-color-text-subtle);
      }

      .file-input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
      }

      .hint {
        font-size: var(--eds-font-size-xs);
        color: var(--eds-color-text-subtle);
      }

      .file-list {
        margin: var(--eds-space-3) 0 0;
        padding: 0;
        list-style: none;
      }

      .file-item {
        display: flex;
        align-items: center;
        gap: var(--eds-space-2);
        padding: var(--eds-space-2) var(--eds-space-3);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-ink-50);
        font-size: var(--eds-font-size-sm);
        color: var(--eds-color-text);
      }

      .file-item + .file-item {
        margin-top: var(--eds-space-2);
      }
    `,
  ],
})
export class EdsFileUploadComponent {
  @Input() label = '';
  @Input() accept = '';
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() hint = '';

  @Output() filesChange = new EventEmitter<EdsFileUploadChangeDetail>();

  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  readonly inputId = `eds-file-upload-${Math.random().toString(36).slice(2, 9)}`;

  dragOver = false;
  selectedFiles: File[] = [];

  openFileDialog(): void {
    if (this.disabled) return;
    this.fileInput?.nativeElement.click();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openFileDialog();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (this.disabled) return;
    this.dragOver = true;
  }

  onDragLeave(): void {
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    if (this.disabled) return;
    this.updateFiles(Array.from(event.dataTransfer?.files ?? []));
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updateFiles(Array.from(input.files ?? []));
  }

  private updateFiles(files: File[]): void {
    const nextFiles = this.multiple ? files : files.slice(0, 1);
    this.selectedFiles = nextFiles;
    this.filesChange.emit({ files: nextFiles });
  }
}
