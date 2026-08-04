import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';
import { EDS_FIELD_STYLES } from '../_field-styles';
import { EdsIconComponent } from '../icon/icon.component';

export type EdsSearchSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'eds-search',
  standalone: true,
  imports: [EdsIconComponent],
  template: `
    <div class="eds-field">
      <div [class]="controlClass">
        <span class="eds-search__icon" aria-hidden="true">
          <eds-icon name="search" [size]="iconSize"></eds-icon>
        </span>
        <input
          class="eds-search__control"
          [id]="inputId"
          type="search"
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          (input)="onInput($event)"
          (change)="onChange($event)"
        />
        @if (showClear) {
          <button
            type="button"
            class="eds-search__clear"
            aria-label="Clear search"
            [disabled]="disabled"
            (click)="clear($event)"
          >
            <eds-icon name="x" [size]="iconSize"></eds-icon>
          </button>
        }
      </div>
    </div>
  `,
  styles: [
    EDS_FIELD_STYLES,
    `
      .eds-control {
        gap: var(--eds-space-2);
      }

      .eds-search__icon {
        display: inline-flex;
        flex-shrink: 0;
        color: var(--eds-color-text-muted);
        line-height: 0;
      }

      .eds-search__control {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        min-height: unset;
        color: inherit;
        font: inherit;
      }

      .eds-search__control:focus,
      .eds-search__control:focus-visible {
        box-shadow: none;
        outline: none;
      }

      .eds-search__clear {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin: 0;
        padding: var(--eds-space-1);
        border: none;
        border-radius: var(--eds-radius-sm);
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
        line-height: 0;
        transition:
          color var(--eds-duration-fast) var(--eds-easing-standard),
          background-color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .eds-search__clear:hover:not(:disabled) {
        color: var(--eds-color-text);
        background: var(--eds-color-ink-100);
      }

      .eds-search__clear:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .eds-search__clear:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
    `,
  ],
})
export class EdsSearchComponent {
  private static nextId = 0;

  @Input() value = '';
  @Input() placeholder = 'Search…';
  @Input() disabled = false;
  @Input() size: EdsSearchSize = 'md';
  @Input() clearable = true;

  @Output() valueChange = new EventEmitter<string>();
  @Output() changed = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  readonly inputId = `eds-search-${EdsSearchComponent.nextId++}`;

  get iconSize(): 'sm' | 'md' {
    return this.size === 'sm' ? 'sm' : 'md';
  }

  get controlClass(): string {
    return cx(
      'eds-control',
      `eds-control--${this.size}`,
      this.disabled && 'eds-control--disabled',
    );
  }

  get showClear(): boolean {
    return this.clearable && this.value.length > 0;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }

  onChange(event: Event): void {
    this.changed.emit(this.value);
  }

  clear(event: Event): void {
    event.preventDefault();
    if (this.disabled) return;
    this.value = '';
    this.cleared.emit();
    this.valueChange.emit(this.value);
    this.changed.emit(this.value);
  }
}
