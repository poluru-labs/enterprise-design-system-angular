import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsLinkVariant = 'default' | 'subtle' | 'danger';

@Component({
  selector: 'eds-link',
  standalone: true,
  template: `
    <a [class]="linkClass" [href]="disabled ? null : href"
      [attr.target]="external && !disabled ? '_blank' : null"
      [attr.rel]="external && !disabled ? 'noopener noreferrer' : null"
      [attr.aria-disabled]="disabled ? 'true' : null"
      [attr.tabindex]="disabled ? -1 : null"
      (click)="onClick($event)">
      <ng-content></ng-content>
      @if (external && !disabled) {
        <svg class="eds-link__external" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3.5 8.5 8.5 3.5M8.5 3.5H5M8.5 3.5V7" stroke="currentColor" stroke-width="1.25" fill="none"/>
        </svg>
      }
    </a>
  `,
  styles: [`
    :host { display: inline; }
    .eds-link { display: inline-flex; align-items: center; gap: var(--eds-space-1); font-weight: var(--eds-font-weight-medium); text-decoration: underline; text-underline-offset: 2px; cursor: pointer; transition: color var(--eds-duration-fast) var(--eds-easing-standard); }
    .eds-link:focus-visible { outline: none; box-shadow: var(--eds-shadow-focus); border-radius: var(--eds-radius-sm); }
    .eds-link--default { color: var(--eds-color-primary); }
    .eds-link--subtle { color: var(--eds-color-text-muted); text-decoration: none; }
    .eds-link--danger { color: var(--eds-color-danger-600); }
    .eds-link--disabled { opacity: 0.5; pointer-events: none; cursor: not-allowed; }
    .eds-link__external { flex-shrink: 0; }
  `],
})
export class EdsLinkComponent {
  @Input() href = '#';
  @Input() external = false;
  @Input() disabled = false;
  @Input() variant: EdsLinkVariant = 'default';
  @Input() className = '';
  @Output() clicked = new EventEmitter<MouseEvent>();

  get linkClass(): string {
    return cx('eds-link', `eds-link--${this.variant}`, this.disabled && 'eds-link--disabled', this.className);
  }

  onClick(event: MouseEvent): void {
    if (this.disabled) { event.preventDefault(); return; }
    this.clicked.emit(event);
  }
}
