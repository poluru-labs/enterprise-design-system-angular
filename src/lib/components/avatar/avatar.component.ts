import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'eds-avatar',
  standalone: true,
  template: `
    <span
      [class]="classes"
      role="img"
      [attr.aria-label]="accessibleLabel"
    >
      @if (showImage) {
        <img [src]="src" alt="" aria-hidden="true" (error)="onImageError()" />
      } @else {
        <span aria-hidden="true">{{ initials }}</span>
      }
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      .avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: var(--eds-radius-full);
        background: var(--eds-color-brand-100);
        color: var(--eds-color-brand-800);
        font-weight: var(--eds-font-weight-semibold);
        letter-spacing: 0.02em;
        user-select: none;
        flex-shrink: 0;
      }

      .sm {
        width: 2rem;
        height: 2rem;
        font-size: var(--eds-font-size-xs);
      }

      .md {
        width: 2.5rem;
        height: 2.5rem;
        font-size: var(--eds-font-size-sm);
      }

      .lg {
        width: 3rem;
        height: 3rem;
        font-size: var(--eds-font-size-md);
      }

      .xl {
        width: 4rem;
        height: 4rem;
        font-size: var(--eds-font-size-lg);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `,
  ],
})
export class EdsAvatarComponent {
  @Input() name = '';
  @Input() src = '';
  @Input() size: EdsAvatarSize = 'md';
  @Input() alt = '';

  imageError = false;

  get showImage(): boolean {
    return Boolean(this.src) && !this.imageError;
  }

  get initials(): string {
    const parts = this.name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  get accessibleLabel(): string {
    if (this.alt) return this.alt;
    if (this.name) return this.name;
    return 'Avatar';
  }

  get classes(): string {
    return cx('avatar', this.size);
  }

  onImageError(): void {
    this.imageError = true;
  }
}
