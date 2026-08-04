import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';
import { EdsButtonComponent } from '../button/button.component';
import { EdsDropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { EdsMenuItemComponent } from '../dropdown-menu/menu-item.component';

export type EdsSplitButtonVariant = 'primary' | 'secondary' | 'danger';
export type EdsSplitButtonSize = 'sm' | 'md';

@Component({
  selector: 'eds-split-button',
  standalone: true,
  imports: [EdsButtonComponent, EdsDropdownMenuComponent, EdsMenuItemComponent],
  template: `
    <div
      [class]="splitClasses"
      role="group"
      [attr.aria-label]="label || 'Split button'"
    >
      <eds-button
        class="primary-action"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        (clicked)="onPrimaryClick($event)"
      >
        {{ label }}
      </eds-button>
      <eds-dropdown-menu
        class="menu"
        [open]="menuOpen"
        (openChange)="menuOpen = $event"
        (itemSelect)="onMenuSelect($event)"
      >
        <eds-button
          trigger
          [variant]="variant"
          [size]="size"
          [disabled]="disabled"
          icon="chevron-down"
          [iconOnly]="true"
          accessibleLabel="More options"
        ></eds-button>
        <ng-content />
      </eds-dropdown-menu>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      .split {
        display: inline-flex;
        align-items: stretch;
      }

      .primary-action {
        --eds-button-radius: var(--eds-radius-md) 0 0 var(--eds-radius-md);
      }

      .menu {
        margin-inline-start: -1px;
      }

      .menu eds-button {
        --eds-button-radius: 0 var(--eds-radius-md) var(--eds-radius-md) 0;
      }

      .primary-action,
      .menu {
        position: relative;
      }

      .primary-action:hover,
      .primary-action:focus-within,
      .menu:hover,
      .menu:focus-within {
        z-index: 1;
      }

      :host([disabled]) {
        pointer-events: none;
      }
    `,
  ],
})
export class EdsSplitButtonComponent {
  @Input() label = '';
  @Input() variant: EdsSplitButtonVariant = 'primary';
  @Input() size: EdsSplitButtonSize = 'md';
  @Input() disabled = false;

  @Output() primaryClick = new EventEmitter<MouseEvent>();
  @Output() itemSelect = new EventEmitter<{ value: string; label: string }>();

  menuOpen = false;

  get splitClasses(): string {
    return cx('split', this.size, this.disabled && 'disabled');
  }

  onPrimaryClick(event: MouseEvent): void {
    if (this.disabled) return;
    this.primaryClick.emit(event);
  }

  onMenuSelect(detail: { value: string; label: string }): void {
    this.itemSelect.emit(detail);
  }
}
