import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsDividerOrientation = 'horizontal' | 'vertical';
export type EdsDividerSpacing = 'sm' | 'md' | 'lg';

@Component({
  selector: 'eds-divider',
  standalone: true,
  template: `
    @if (orientation === 'horizontal') {
      <div [class]="rootClass" role="separator" [attr.aria-orientation]="orientation">
        @if (label) {
          <span class="eds-divider__label">{{ label }}</span>
        } @else {
          <span class="eds-divider__line" aria-hidden="true"></span>
        }
      </div>
    } @else {
      <div [class]="rootClass" role="separator" aria-orientation="vertical">
        <span class="eds-divider__line eds-divider__line--vertical" aria-hidden="true"></span>
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
    .eds-divider--horizontal { display: flex; align-items: center; width: 100%; }
    .eds-divider--horizontal.eds-divider--spacing-sm { margin: var(--eds-space-2) 0; }
    .eds-divider--horizontal.eds-divider--spacing-md { margin: var(--eds-space-4) 0; }
    .eds-divider--horizontal.eds-divider--spacing-lg { margin: var(--eds-space-6) 0; }
    .eds-divider--vertical { display: inline-flex; align-self: stretch; }
    .eds-divider--vertical.eds-divider--spacing-sm { margin: 0 var(--eds-space-2); }
    .eds-divider--vertical.eds-divider--spacing-md { margin: 0 var(--eds-space-4); }
    .eds-divider--vertical.eds-divider--spacing-lg { margin: 0 var(--eds-space-6); }
    .eds-divider__line { flex: 1; height: 1px; background: var(--eds-color-border); }
    .eds-divider__line--vertical { width: 1px; height: 100%; min-height: 1rem; }
    .eds-divider__label { position: relative; padding: 0 var(--eds-space-3); font-size: var(--eds-font-size-xs); color: var(--eds-color-text-subtle); white-space: nowrap; }
    .eds-divider__label::before, .eds-divider__label::after { content: ''; flex: 1; height: 1px; background: var(--eds-color-border); }
    .eds-divider--horizontal:has(.eds-divider__label) { gap: var(--eds-space-3); }
    .eds-divider--horizontal:has(.eds-divider__label)::before, .eds-divider--horizontal:has(.eds-divider__label)::after { content: ''; flex: 1; height: 1px; background: var(--eds-color-border); }
  `],
})
export class EdsDividerComponent {
  @Input() orientation: EdsDividerOrientation = 'horizontal';
  @Input() label = '';
  @Input() spacing: EdsDividerSpacing = 'md';
  @Input() className = '';

  get rootClass(): string {
    return cx('eds-divider', `eds-divider--${this.orientation}`, `eds-divider--spacing-${this.spacing}`, this.className);
  }
}
