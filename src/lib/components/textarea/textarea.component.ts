import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';
import { EDS_FIELD_STYLES } from '../_field-styles';

export type EdsTextareaResize = 'none' | 'vertical' | 'both';

@Component({
  selector: 'eds-textarea',
  standalone: true,
  template: `
    <div class="eds-field">
      @if (label) {
        <label class="eds-label" [for]="inputId">{{ label }}</label>
      }
      <div [class]="controlClass">
        <textarea
          class="eds-textarea__control"
          [id]="inputId"
          [value]="value"
          [placeholder]="placeholder"
          [rows]="rows"
          [style.resize]="resize"
          [maxLength]="maxlength > 0 ? maxlength : null"
          [disabled]="disabled"
          [readOnly]="readonly"
          [required]="required"
          [attr.aria-invalid]="invalid ? 'true' : 'false'"
          [attr.aria-describedby]="describedBy || null"
          (input)="onInput($event)"
          (change)="onChange($event)"
        ></textarea>
      </div>
      @if (invalid && errorMessage) {
        <span class="eds-error" [id]="inputId + '-error'">{{ errorMessage }}</span>
      } @else if (hint) {
        <span class="eds-hint" [id]="inputId + '-hint'">{{ hint }}</span>
      }
    </div>
  `,
  styles: [
    EDS_FIELD_STYLES,
    `
      .eds-control {
        align-items: stretch;
        min-height: 5rem;
        padding: var(--eds-space-3);
      }

      .eds-textarea__control {
        width: 100%;
        min-height: 5rem;
        border: 0;
        background: transparent;
        padding: 0;
        margin: 0;
        color: inherit;
        font: inherit;
        line-height: var(--eds-line-height-normal);
      }

      .eds-textarea__control:focus,
      .eds-textarea__control:focus-visible {
        box-shadow: none;
        outline: none;
      }
    `,
  ],
})
export class EdsTextareaComponent {
  private static nextId = 0;

  @Input() label = '';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() rows = 4;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() errorMessage = '';
  @Input() hint = '';
  @Input() resize: EdsTextareaResize = 'vertical';
  @Input() maxlength = 0;

  @Output() valueChange = new EventEmitter<string>();
  @Output() changed = new EventEmitter<string>();

  readonly inputId = `eds-textarea-${EdsTextareaComponent.nextId++}`;

  get controlClass(): string {
    return cx(
      'eds-control',
      this.invalid && 'eds-control--invalid',
      this.disabled && 'eds-control--disabled',
    );
  }

  get describedBy(): string | undefined {
    if (this.invalid && this.errorMessage) return `${this.inputId}-error`;
    if (this.hint) return `${this.inputId}-hint`;
    return undefined;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }

  onChange(event: Event): void {
    this.changed.emit(this.value);
  }
}
