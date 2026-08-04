import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';
import { buildPaginationItems, PaginationItem } from '../_shared/pagination-utils';

@Component({
  selector: 'eds-pagination',
  standalone: true,
  template: `
    <div [class]="rootClass">
      <nav class="eds-pagination__nav" aria-label="Pagination">
        <button type="button" class="eds-pagination__btn" aria-label="Previous page"
          [disabled]="page <= 1 || totalPages === 0" (click)="changePage(page - 1)">Prev</button>
        @if (totalPages > 0) {
          @for (item of paginationItems; track trackItem(item, $index)) {
            @if (item === 'ellipsis') {
              <span class="eds-pagination__ellipsis" aria-hidden="true">…</span>
            } @else {
              <button type="button" [class]="btnClass(item)" [attr.aria-label]="'Page ' + item"
                [attr.aria-current]="page === item ? 'page' : null" (click)="changePage(item)">{{ item }}</button>
            }
          }
        }
        <button type="button" class="eds-pagination__btn" aria-label="Next page"
          [disabled]="page >= totalPages || totalPages === 0" (click)="changePage(page + 1)">Next</button>
      </nav>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .eds-pagination__nav { display: flex; align-items: center; gap: var(--eds-space-1); }
    .eds-pagination__btn {
      min-width: 2.25rem; height: 2.25rem; padding: 0 var(--eds-space-2); border: 1px solid var(--eds-color-border);
      border-radius: var(--eds-radius-md); background: var(--eds-color-surface); color: var(--eds-color-text);
      font-size: var(--eds-font-size-sm); cursor: pointer;
    }
    .eds-pagination__btn:hover:not(:disabled) { background: var(--eds-color-brand-50); border-color: var(--eds-color-primary); }
    .eds-pagination__btn:focus-visible { outline: none; box-shadow: var(--eds-shadow-focus); }
    .eds-pagination__btn:disabled { opacity: 0.45; cursor: not-allowed; }
    .eds-pagination__btn--active { background: var(--eds-color-primary); color: var(--eds-color-text-inverse); border-color: var(--eds-color-primary); }
    .eds-pagination__ellipsis { padding: 0 var(--eds-space-1); color: var(--eds-color-text-subtle); }
  `],
})
export class EdsPaginationComponent {
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() total = 0;
  @Input() siblingCount = 1;
  @Input() className = '';
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number { return Math.max(Math.ceil(this.total / this.pageSize), 0); }
  get paginationItems(): PaginationItem[] { return buildPaginationItems(this.page, this.totalPages, this.siblingCount); }
  get rootClass(): string { return cx('eds-pagination', this.className); }

  btnClass(item: number): string {
    return cx('eds-pagination__btn', this.page === item && 'eds-pagination__btn--active');
  }

  trackItem(item: PaginationItem, index: number): string {
    return item === 'ellipsis' ? `e-${index}` : String(item);
  }

  changePage(next: number): void {
    const clamped = Math.min(Math.max(next, 1), Math.max(this.totalPages, 1));
    if (clamped !== this.page) this.pageChange.emit(clamped);
  }
}
