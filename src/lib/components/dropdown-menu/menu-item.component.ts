import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-menu-item',
  standalone: true,
  template: `
    <button
      [class]="classes"
      type="button"
      role="menuitem"
      [disabled]="disabled"
      [attr.data-active]="active ? 'true' : 'false'"
      [attr.tabindex]="active ? 0 : -1"
      (click)="handleClick($event)"
    >
      @if (label) {
        {{ label }}
      } @else {
        <ng-content />
      }
    </button>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .item {
        display: flex;
        align-items: center;
        gap: var(--eds-space-2);
        width: 100%;
        margin: 0;
        padding: var(--eds-space-2) var(--eds-space-3);
        border: 0;
        border-radius: var(--eds-radius-sm);
        background: transparent;
        color: var(--eds-color-text);
        font: inherit;
        font-size: var(--eds-font-size-md);
        text-align: left;
        cursor: pointer;
      }

      .item:hover:not(:disabled),
      .item[data-active='true']:not(:disabled) {
        background: var(--eds-color-brand-50);
        color: var(--eds-color-primary);
      }

      .item:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      .item.danger {
        color: var(--eds-color-danger-600);
      }

      .item.danger:hover:not(:disabled),
      .item.danger[data-active='true']:not(:disabled) {
        background: var(--eds-color-danger-100);
        color: var(--eds-color-danger-600);
      }
    `,
  ],
})
export class EdsMenuItemComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() danger = false;
  @Input() active = false;

  @Output() itemSelect = new EventEmitter<{ value: string; label: string }>();

  get classes(): string {
    return cx('item', this.danger && 'danger');
  }

  handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.itemSelect.emit({
      value: this.value,
      label: this.label,
    });
  }
}
