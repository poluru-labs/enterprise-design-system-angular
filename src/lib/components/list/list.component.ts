import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsListItem {
  label: string;
  description?: string;
  href?: string;
  selected?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'eds-list',
  standalone: true,
  template: `
    <ul [class]="rootClass" role="list">
      @for (item of items; track item.label; let i = $index) {
        <li class="eds-list__item">
          @if (item.href && !item.disabled) {
            <a [class]="itemClass(item, i)" [href]="item.href" [attr.aria-current]="item.selected ? 'page' : null"
              (click)="selectItem(item, i)">
              <span class="eds-list__content">
                <span class="eds-list__label">{{ item.label }}</span>
                @if (item.description) { <span class="eds-list__desc">{{ item.description }}</span> }
              </span>
            </a>
          } @else {
            <button type="button" [class]="itemClass(item, i)" [disabled]="item.disabled"
              [attr.aria-pressed]="item.selected" (click)="selectItem(item, i)">
              <span class="eds-list__content">
                <span class="eds-list__label">{{ item.label }}</span>
                @if (item.description) { <span class="eds-list__desc">{{ item.description }}</span> }
              </span>
            </button>
          }
        </li>
      }
    </ul>
  `,
  styles: [`
    :host { display: block; }
    .eds-list { list-style: none; margin: 0; padding: 0; border-radius: var(--eds-radius-md); overflow: hidden; }
    .eds-list--divided .eds-list__item + .eds-list__item { border-top: 1px solid var(--eds-color-border); }
    .eds-list__btn { display: flex; width: 100%; padding: var(--eds-space-3) var(--eds-space-4); border: 0; background: transparent; text-align: left; font: inherit; color: var(--eds-color-text); cursor: pointer; text-decoration: none; }
    .eds-list__btn:hover:not(:disabled) { background: var(--eds-color-brand-50); }
    .eds-list__btn--selected { background: var(--eds-color-brand-50); color: var(--eds-color-primary); font-weight: var(--eds-font-weight-semibold); }
    .eds-list__btn:disabled { opacity: 0.45; cursor: not-allowed; }
    .eds-list__btn:focus-visible { outline: none; box-shadow: inset var(--eds-shadow-focus); }
    .eds-list__content { display: flex; flex-direction: column; gap: var(--eds-space-1); }
    .eds-list__desc { font-size: var(--eds-font-size-xs); color: var(--eds-color-text-muted); }
  `],
})
export class EdsListComponent {
  @Input() items: EdsListItem[] = [];
  @Input() divided = false;
  @Input() selectedIndex = -1;
  @Input() className = '';
  @Output() itemSelect = new EventEmitter<{ label: string; index: number }>();

  get rootClass(): string { return cx('eds-list', this.divided && 'eds-list--divided', this.className); }

  itemClass(item: EdsListItem, index: number): string {
    const selected = item.selected ?? index === this.selectedIndex;
    return cx('eds-list__btn', selected && 'eds-list__btn--selected');
  }

  selectItem(item: EdsListItem, index: number): void {
    if (item.disabled) return;
    this.selectedIndex = index;
    this.itemSelect.emit({ label: item.label, index });
  }
}
