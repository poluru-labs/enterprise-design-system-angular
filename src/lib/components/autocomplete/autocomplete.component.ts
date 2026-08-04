import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';
import { EDS_FIELD_STYLES } from '../_field-styles';

@Component({
  selector: 'eds-autocomplete',
  standalone: true,
  template: `
    <div class="eds-field">
      @if (label) {
        <label class="eds-label" [for]="inputId">{{ label }}</label>
      }
      <div class="eds-autocomplete">
        <div [class]="controlClass">
          <input
            class="eds-autocomplete__control"
            [id]="inputId"
            role="combobox"
            type="text"
            [value]="value"
            [placeholder]="placeholder"
            [disabled]="disabled"
            [attr.aria-expanded]="open ? 'true' : 'false'"
            [attr.aria-controls]="inputId + '-listbox'"
            [attr.aria-activedescendant]="activeItemId"
            autocomplete="off"
            (input)="onInput($event)"
            (change)="onChange($event)"
            (focus)="openList()"
            (keydown)="onKeydown($event)"
            (blur)="onBlur($event)"
          />
        </div>
        @if (open) {
          <ul
            [id]="inputId + '-listbox'"
            class="eds-autocomplete__listbox"
            role="listbox"
            (mousedown)="preventBlur($event)"
          >
            @for (suggestion of filteredSuggestions; track suggestion; let index = $index) {
              <li
                [id]="inputId + '-opt-' + index"
                class="eds-autocomplete__option"
                role="option"
                [class.eds-autocomplete__option--active]="index === activeIndex"
                (click)="selectSuggestion(suggestion)"
              >
                {{ suggestion }}
              </li>
            }
          </ul>
        }
      </div>
    </div>
  `,
  styles: [
    EDS_FIELD_STYLES,
    `
      .eds-autocomplete {
        position: relative;
      }

      .eds-autocomplete__control {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        min-height: unset;
        color: inherit;
        font: inherit;
      }

      .eds-autocomplete__control:focus,
      .eds-autocomplete__control:focus-visible {
        box-shadow: none;
        outline: none;
      }

      .eds-autocomplete__listbox {
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

      .eds-autocomplete__option {
        padding: var(--eds-space-2) var(--eds-space-3);
        border-radius: var(--eds-radius-sm);
        cursor: pointer;
        font-size: var(--eds-font-size-md);
      }

      .eds-autocomplete__option--active,
      .eds-autocomplete__option:hover {
        background: var(--eds-color-brand-50);
        color: var(--eds-color-primary);
      }
    `,
  ],
})
export class EdsAutocompleteComponent {
  private static nextId = 0;

  @Input() label = '';
  @Input() value = '';
  @Input() suggestions: string[] = [];
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() minChars = 1;

  @Output() valueChange = new EventEmitter<string>();
  @Output() changed = new EventEmitter<string>();
  @Output() selected = new EventEmitter<string>();

  readonly inputId = `eds-autocomplete-${EdsAutocompleteComponent.nextId++}`;

  open = false;
  activeIndex = -1;

  get filteredSuggestions(): string[] {
    const query = this.value.trim().toLowerCase();
    if (query.length < this.minChars) return [];
    return this.suggestions.filter((s) => s.toLowerCase().includes(query));
  }

  get controlClass(): string {
    return cx(
      'eds-control',
      'eds-control--md',
      this.disabled && 'eds-control--disabled',
    );
  }

  get activeItemId(): string | null {
    if (this.activeIndex < 0) return null;
    return `${this.inputId}-opt-${this.activeIndex}`;
  }

  openList(): void {
    if (this.disabled) return;
    this.open = this.filteredSuggestions.length > 0;
    this.activeIndex = this.open ? 0 : -1;
  }

  closeList(): void {
    this.open = false;
    this.activeIndex = -1;
  }

  selectSuggestion(suggestion: string, originalEvent?: Event): void {
    this.value = suggestion;
    this.closeList();
    this.selected.emit(this.value);
    this.changed.emit(this.value);
    this.valueChange.emit(this.value);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.openList();
    this.valueChange.emit(this.value);
  }

  onChange(event: Event): void {
    this.changed.emit(this.value);
  }

  onKeydown(event: KeyboardEvent): void {
    const items = this.filteredSuggestions;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (items.length) {
        this.open = true;
        this.activeIndex = Math.min(this.activeIndex + 1, items.length - 1);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (event.key === 'Enter') {
      if (this.open && this.activeIndex >= 0 && items[this.activeIndex]) {
        event.preventDefault();
        this.selectSuggestion(items[this.activeIndex], event);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.closeList();
    }
  }

  onBlur(event: FocusEvent): void {
    const related = event.relatedTarget as Node | null;
    const root = (event.target as HTMLElement)?.closest('.eds-autocomplete');
    if (related && root?.contains(related)) return;
    this.closeList();
  }

  preventBlur(event: Event): void {
    event.preventDefault();
  }
}
