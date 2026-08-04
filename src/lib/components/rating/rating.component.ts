import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-rating',
  standalone: true,
  template: `
    <div [class]="rootClass" role="slider" [attr.aria-valuenow]="value" [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max" [attr.aria-label]="'Rating'">
      @for (star of stars; track star) {
        <button type="button" [class]="starClass(star)" [disabled]="readonly || disabled"
          [attr.aria-label]="'Rate ' + star" (click)="rate(star)">
          ★
          @if (allowHalf && isHalf(star)) { <span class="eds-rating__half" aria-hidden="true">★</span> }
        </button>
      }
    </div>
  `,
  styles: [`
    :host { display: inline-block; }
    .eds-rating { display: inline-flex; gap: var(--eds-space-1); }
    .eds-rating__star { position: relative; border: 0; background: transparent; color: var(--eds-color-ink-300); font-size: 1.25rem; cursor: pointer; padding: 0; line-height: 1; }
    .eds-rating--md .eds-rating__star { font-size: 1.5rem; }
    .eds-rating--lg .eds-rating__star { font-size: 2rem; }
    .eds-rating__star--filled { color: var(--eds-color-warning-500, #f59e0b); }
    .eds-rating__star--readonly, .eds-rating__star:disabled { cursor: default; }
    .eds-rating__half { position: absolute; left: 0; top: 0; width: 50%; overflow: hidden; color: var(--eds-color-warning-500, #f59e0b); }
    .eds-rating__star:focus-visible { outline: none; box-shadow: var(--eds-shadow-focus); border-radius: var(--eds-radius-sm); }
  `],
})
export class EdsRatingComponent {
  @Input() value = 0;
  @Input() max = 5;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() allowHalf = false;
  @Input() className = '';
  @Output() valueChange = new EventEmitter<number>();

  get stars(): number[] { return Array.from({ length: this.max }, (_, i) => i + 1); }
  get rootClass(): string { return cx('eds-rating', `eds-rating--${this.size}`, this.className); }

  isFilled(star: number): boolean { return this.value >= star; }
  isHalf(star: number): boolean { return this.allowHalf && this.value >= star - 0.5 && this.value < star; }

  starClass(star: number): string {
    return cx('eds-rating__star', (this.isFilled(star) || this.isHalf(star)) && 'eds-rating__star--filled', (this.readonly || this.disabled) && 'eds-rating__star--readonly');
  }

  rate(star: number): void {
    if (this.readonly || this.disabled) return;
    const next = this.value === star ? 0 : star;
    this.value = next;
    this.valueChange.emit(next);
  }
}
