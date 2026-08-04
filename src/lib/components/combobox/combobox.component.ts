import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { cx } from '../../utils/cx';
import { EDS_FIELD_STYLES } from '../_field-styles';

export type EdsComboboxOption = { label: string; value: string; disabled?: boolean };

@Component({
  selector: 'eds-combobox',
  standalone: true,
  template: `
    <div class="eds-field">
      @if (label) {
        <label class="eds-label" [for]="comboboxId">{{ label }}</label>
      }
      <div class="eds-combobox">
        <div [class]="controlClass">
          <input
            class="eds-combobox__control"
            [id]="comboboxId"
            role="combobox"
            type="text"
            [value]="filter"
            [placeholder]="placeholder"
            [disabled]="disabled"
            [attr.aria-invalid]="invalid ? 'true' : 'false'"
            [attr.aria-expanded]="open ? 'true' : 'false'"
            [attr.aria-controls]="comboboxId + '-listbox'"
            [attr.aria-activedescendant]="activeOptionId"
            [attr.aria-describedby]="invalid && errorMessage ? comboboxId + '-error' : null"
            autocomplete="off"
            (input)="onInput($event)"
            (focus)="openList()"
            (keydown)="onKeydown($event)"
            (blur)="onBlur($event)"
          />
        </div>
        @if (open) {
          <ul
            [id]="comboboxId + '-listbox'"
            class="eds-combobox__listbox"
            role="listbox"
            (mousedown)="preventBlur($event)"
          >
            @if (filteredOptions.length === 0) {
              <li class="eds-combobox__empty">No matches found</li>
            } @else {
              @for (option of filteredOptions; track option.value; let index = $index) {
                <li
                  [id]="comboboxId + '-opt-' + option.value"
                  class="eds-combobox__option"
                  role="option"
                  [attr.aria-selected]="option.value === value ? 'true' : 'false'"
                  [class.eds-combobox__option--active]="index === activeIndex"
                  [class.eds-combobox__option--disabled]="option.disabled"
                  (click)="selectOption(option)"
                >
                  {{ option.label }}
                </li>
              }
            }
          </ul>
        }
      </div>
      @if (invalid && errorMessage) {
        <span class="eds-error" [id]="comboboxId + '-error'">{{ errorMessage }}</span>
      }
    </div>
  `,
  styles: [
    EDS_FIELD_STYLES,
    `
      .eds-combobox {
        position: relative;
      }

      .eds-combobox__control {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        min-height: unset;
        color: inherit;
        font: inherit;
      }

      .eds-combobox__control:focus,
      .eds-combobox__control:focus-visible {
        box-shadow: none;
        outline: none;
      }

      .eds-combobox__listbox {
        position: absolute;
        z-index: 10;
        top: calc(100% + var(--eds-space-1));
        left: 0;
        right: 0;
        margin: 0;
        padding: var(--eds-space-1);
        list-style: none;
        border: 1px solid var(--eds-color-border-strong);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-surface);
        box-shadow: var(--eds-shadow-md);
        max-height: 12rem;
        overflow-y: auto;
      }

      .eds-combobox__option {
        padding: var(--eds-space-2) var(--eds-space-3);
        border-radius: var(--eds-radius-sm);
        cursor: pointer;
        font-size: var(--eds-font-size-md);
      }

      .eds-combobox__option--active,
      .eds-combobox__option:hover:not(.eds-combobox__option--disabled) {
        background: var(--eds-color-brand-50);
        color: var(--eds-color-primary);
      }

      .eds-combobox__option--disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      .eds-combobox__empty {
        padding: var(--eds-space-3);
        color: var(--eds-color-text-subtle);
        font-size: var(--eds-font-size-sm);
      }
    `,
  ],
})
export class EdsComboboxComponent implements OnChanges {
  private static nextId = 0;

  @Input() label = '';
  @Input() value = '';
  @Input() options: EdsComboboxOption[] = [];
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() errorMessage = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();

  readonly comboboxId = `eds-combobox-${EdsComboboxComponent.nextId++}`;

  filter = '';
  open = false;
  activeIndex = -1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !this.open) {
      const match = this.options.find((o) => o.value === this.value);
      this.filter = match?.label ?? this.value;
    }
  }

  get filteredOptions(): EdsComboboxOption[] {
    const query = this.filter.trim().toLowerCase();
    if (!query) return this.options;
    return this.options.filter((o) => o.label.toLowerCase().includes(query));
  }

  get controlClass(): string {
    return cx(
      'eds-control',
      'eds-control--md',
      this.invalid && 'eds-control--invalid',
      this.disabled && 'eds-control--disabled',
    );
  }

  get activeOptionId(): string | null {
    const option = this.filteredOptions[this.activeIndex];
    return option ? `${this.comboboxId}-opt-${option.value}` : null;
  }

  openList(): void {
    if (this.disabled) return;
    this.open = true;
    this.activeIndex = Math.max(
      0,
      this.filteredOptions.findIndex((o) => o.value === this.value),
    );
  }

  closeList(): void {
    this.open = false;
    this.activeIndex = -1;
  }

  selectOption(option: EdsComboboxOption, originalEvent?: Event): void {
    if (option.disabled) return;
    this.value = option.value;
    this.filter = option.label;
    this.closeList();
    this.valueChange.emit(this.value);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filter = target.value;
    this.open = true;
    this.activeIndex = 0;
    this.filterChange.emit(this.filter);
  }

  onKeydown(event: KeyboardEvent): void {
    const items = this.filteredOptions.filter((o) => !o.disabled);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.openList();
      this.activeIndex = Math.min(this.activeIndex + 1, items.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.openList();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const option = items[this.activeIndex];
      if (option) this.selectOption(option, event);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.closeList();
      const match = this.options.find((o) => o.value === this.value);
      this.filter = match?.label ?? '';
    }
  }

  onBlur(event: FocusEvent): void {
    const related = event.relatedTarget as Node | null;
    const root = (event.target as HTMLElement)?.closest('.eds-combobox');
    if (related && root?.contains(related)) return;
    this.closeList();
    const match = this.options.find((o) => o.value === this.value);
    this.filter = match?.label ?? this.filter;
  }

  preventBlur(event: Event): void {
    event.preventDefault();
  }
}
