import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'eds-checkbox',
  standalone: true,
  template: `
    <label class="eds-checkbox" [class.eds-checkbox--disabled]="disabled">
      <input
        #inputEl
        class="eds-checkbox__input"
        type="checkbox"
        [id]="inputId"
        [name]="name || null"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onChange($event)"
      />
      <span class="eds-checkbox__box" aria-hidden="true">
        <svg class="eds-checkbox__mark eds-checkbox__mark--check" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <svg class="eds-checkbox__mark eds-checkbox__mark--indeterminate" viewBox="0 0 16 16" fill="none">
          <path d="M4 8H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </span>
      @if (label) {
        <span class="eds-checkbox__label">{{ label }}</span>
      } @else {
        <span class="eds-checkbox__label"><ng-content></ng-content></span>
      }
    </label>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        font-family: var(--eds-font-sans);
        color: var(--eds-color-text);
      }

      .eds-checkbox {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--eds-space-2);
        cursor: pointer;
        user-select: none;
      }

      .eds-checkbox--disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      .eds-checkbox__input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
      }

      .eds-checkbox__box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 1.125rem;
        height: 1.125rem;
        margin-top: 0.125rem;
        border: 1px solid var(--eds-color-border-strong);
        border-radius: var(--eds-radius-sm);
        background: var(--eds-color-surface);
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          border-color var(--eds-duration-fast) var(--eds-easing-standard),
          box-shadow var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .eds-checkbox__input:focus-visible + .eds-checkbox__box {
        box-shadow: var(--eds-shadow-focus);
      }

      .eds-checkbox__input:checked + .eds-checkbox__box,
      .eds-checkbox__input:indeterminate + .eds-checkbox__box {
        background: var(--eds-color-primary);
        border-color: var(--eds-color-primary);
        color: var(--eds-color-text-inverse);
      }

      .eds-checkbox__mark {
        width: 0.75rem;
        height: 0.75rem;
        opacity: 0;
        transform: scale(0.8);
        transition: opacity var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .eds-checkbox__input:checked + .eds-checkbox__box .eds-checkbox__mark--check,
      .eds-checkbox__input:indeterminate + .eds-checkbox__box .eds-checkbox__mark--indeterminate {
        opacity: 1;
      }

      .eds-checkbox__label {
        font-size: var(--eds-font-size-md);
        line-height: var(--eds-line-height-normal);
      }
    `,
  ],
})
export class EdsCheckboxComponent implements AfterViewChecked {
  private static nextId = 0;

  @Input() label = '';
  @Input() checked = false;
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Input() name = '';
  @Input() value = 'on';

  @Output() checkedChange = new EventEmitter<boolean>();

  @ViewChild('inputEl') inputEl?: ElementRef<HTMLInputElement>;

  readonly inputId = `eds-checkbox-${EdsCheckboxComponent.nextId++}`;

  ngAfterViewChecked(): void {
    if (this.inputEl?.nativeElement) {
      this.inputEl.nativeElement.indeterminate = this.indeterminate;
    }
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = false;
    this.checkedChange.emit(this.checked);
  }
}
