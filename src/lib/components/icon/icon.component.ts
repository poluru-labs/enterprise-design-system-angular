import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { iconPaths } from '../../icons/paths';
import { EdsIconName, isEdsIconName } from '../../icons/names';
import { cx } from '../../utils/cx';

export type EdsIconSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'eds-icon',
  standalone: true,
  template: `
    @if (svgContent) {
      <svg
        [class]="svgClass"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        [attr.aria-hidden]="labelled ? 'false' : 'true'"
        [attr.role]="labelled ? 'img' : 'presentation'"
        [attr.aria-label]="labelled ? (label || name) : null"
        [innerHTML]="svgContent"
      ></svg>
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        vertical-align: middle;
        line-height: 0;
        color: inherit;
      }

      svg {
        display: block;
        flex-shrink: 0;
      }

      .eds-icon--sm {
        width: 1rem;
        height: 1rem;
      }

      .eds-icon--md {
        width: 1.25rem;
        height: 1.25rem;
      }

      .eds-icon--lg {
        width: 1.5rem;
        height: 1.5rem;
      }
    `,
  ],
})
export class EdsIconComponent {
  @Input() name: EdsIconName | '' = 'check';
  @Input() size: EdsIconSize = 'md';
  @Input() decorative = true;
  @Input() label = '';

  constructor(private readonly sanitizer: DomSanitizer) {}

  get labelled(): boolean {
    return !this.decorative && Boolean(this.label || this.name);
  }

  get svgClass(): string {
    return cx('eds-icon', `eds-icon--${this.size}`);
  }

  get svgContent(): SafeHtml | null {
    if (!this.name || !isEdsIconName(this.name)) {
      return null;
    }
    return this.sanitizer.bypassSecurityTrustHtml(iconPaths[this.name]);
  }
}
