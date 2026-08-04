import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EdsIconName } from '../../icons/names';
import { cx } from '../../utils/cx';
import { EDS_FIELD_STYLES } from '../_field-styles';
import { EdsIconComponent } from '../icon/icon.component';

export type EdsInputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
export type EdsInputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'eds-input',
  standalone: true,
  imports: [EdsIconComponent],
  template: `
    <div class="eds-field">
      @if (label) {
        <label class="eds-label" [for]="inputId">{{ label }}</label>
      }
      <div [class]="controlClass">
        @if (icon) {
          <span class="eds-input__affix">
            <eds-icon [name]="icon" [size]="iconSize"></eds-icon>
          </span>
        }
        <input
          class="eds-input__control"
          [id]="inputId"
          [type]="type"
          [value]="value"
          [placeholder]="placeholder"
          [name]="name || null"
          [disabled]="disabled"
          [readOnly]="readonly"
          [required]="required"
          [attr.aria-invalid]="invalid ? 'true' : 'false'"
          [attr.aria-describedby]="describedBy || null"
          (input)="onInput($event)"
          (change)="onChange($event)"
        />
        @if (iconTrailing) {
          <span class="eds-input__affix">
            <eds-icon [name]="iconTrailing" [size]="iconSize"></eds-icon>
          </span>
        }
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
      .eds-input__control {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        min-height: unset;
        color: inherit;
        font: inherit;
      }

      .eds-input__control:focus,
      .eds-input__control:focus-visible {
        box-shadow: none;
        outline: none;
      }

      .eds-control {
        gap: var(--eds-space-2);
      }

      .eds-input__affix {
        display: inline-flex;
        align-items: center;
        color: var(--eds-color-text-muted);
        line-height: 0;
        flex-shrink: 0;
      }
    `,
  ],
})
export class EdsInputComponent {
  private static nextId = 0;

  @Input() label = '';
  @Input() type: EdsInputType = 'text';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() errorMessage = '';
  @Input() hint = '';
  @Input() size: EdsInputSize = 'md';
  @Input() icon: EdsIconName | '' = '';
  @Input() iconTrailing: EdsIconName | '' = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() changed = new EventEmitter<string>();

  readonly inputId = `eds-input-${EdsInputComponent.nextId++}`;

  get iconSize(): 'sm' | 'md' {
    return this.size === 'sm' ? 'sm' : 'md';
  }

  get controlClass(): string {
    return cx(
      'eds-control',
      `eds-control--${this.size}`,
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
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }

  onChange(event: Event): void {
    this.changed.emit(this.value);
  }
}
