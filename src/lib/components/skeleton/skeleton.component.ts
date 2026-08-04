import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsSkeletonVariant = 'text' | 'circular' | 'rectangular';

@Component({
  selector: 'eds-skeleton',
  standalone: true,
  template: `
    @if (lines > 1 && variant === 'text') {
      <div [class]="rootClass" aria-hidden="true">
        @for (line of lineArray; track $index) {
          <span [class]="lineClass($index)" [style.width]="lineWidth($index)"></span>
        }
      </div>
    } @else {
      <span [class]="singleClass" [style.width]="width" [style.height]="height" aria-hidden="true"></span>
    }
  `,
  styles: [`
    :host { display: block; }
    .eds-skeleton { display: flex; flex-direction: column; gap: var(--eds-space-2); }
    .eds-skeleton__item {
      display: block; background: linear-gradient(90deg, var(--eds-color-ink-100) 25%, var(--eds-color-ink-50) 50%, var(--eds-color-ink-100) 75%);
      background-size: 200% 100%; animation: eds-skeleton-shimmer 1.5s ease-in-out infinite; border-radius: var(--eds-radius-sm);
    }
    .eds-skeleton__item--text { height: 1em; width: 100%; }
    .eds-skeleton__item--circular { border-radius: 50%; width: 2.5rem; height: 2.5rem; }
    .eds-skeleton__item--rectangular { height: 4rem; width: 100%; border-radius: var(--eds-radius-md); }
    .eds-skeleton__item--last { width: 70%; }
    @keyframes eds-skeleton-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  `],
})
export class EdsSkeletonComponent {
  @Input() variant: EdsSkeletonVariant = 'text';
  @Input() width = '100%';
  @Input() height = '1em';
  @Input() lines = 1;
  @Input() className = '';

  get lineArray(): number[] { return Array.from({ length: this.lines }, (_, i) => i); }
  get rootClass(): string { return cx('eds-skeleton', this.className); }
  get singleClass(): string { return cx('eds-skeleton__item', `eds-skeleton__item--${this.variant}`, this.className); }

  lineClass(index: number): string {
    return cx('eds-skeleton__item', 'eds-skeleton__item--text', index === this.lines - 1 && 'eds-skeleton__item--last');
  }

  lineWidth(index: number): string {
    return index === this.lines - 1 ? '70%' : '100%';
  }
}
