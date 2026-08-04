import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'eds-modal',
  standalone: true,
  template: `
    <div
      class="backdrop"
      [attr.data-open]="open ? 'true' : 'false'"
      [hidden]="!open"
      (click)="onBackdropClick($event)"
    >
      @if (open) {
        <div
          #dialog
          class="dialog"
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="titleId"
          tabindex="-1"
          (click)="$event.stopPropagation()"
        >
          <div class="header">
            <h2 class="title" [id]="titleId">{{ heading }}</h2>
            <button class="close" type="button" aria-label="Close dialog" (click)="close()">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 4L12 12M12 4L4 12"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div class="body"><ng-content /></div>
          <div class="footer"><ng-content select="[footer]" /></div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: grid;
        place-items: center;
        padding: var(--eds-space-6);
        background: linear-gradient(180deg, rgb(15 23 32 / 0.45), rgb(15 23 32 / 0.55));
        backdrop-filter: blur(2px);
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--eds-duration-normal) var(--eds-easing-standard);
      }

      .backdrop[data-open='true'] {
        opacity: 1;
        pointer-events: auto;
      }

      .dialog {
        width: min(100%, 28rem);
        max-height: min(90vh, 40rem);
        display: flex;
        flex-direction: column;
        background: var(--eds-color-surface);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-xl);
        box-shadow: var(--eds-shadow-lg);
        transform: translateY(8px) scale(0.98);
        opacity: 0;
        transition:
          transform var(--eds-duration-normal) var(--eds-easing-emphasized),
          opacity var(--eds-duration-normal) var(--eds-easing-emphasized);
      }

      .backdrop[data-open='true'] .dialog {
        transform: translateY(0) scale(1);
        opacity: 1;
      }

      .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--eds-space-4);
        padding: var(--eds-space-5) var(--eds-space-5) var(--eds-space-3);
      }

      .title {
        margin: 0;
        font-family: var(--eds-font-display);
        font-size: var(--eds-font-size-xl);
        font-weight: var(--eds-font-weight-semibold);
        letter-spacing: var(--eds-letter-spacing-tight);
        color: var(--eds-color-ink-950);
        line-height: var(--eds-line-height-snug);
      }

      .close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: var(--eds-radius-md);
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
      }

      .close:hover {
        background: var(--eds-color-ink-100);
        color: var(--eds-color-text);
      }

      .body {
        padding: 0 var(--eds-space-5) var(--eds-space-5);
        overflow: auto;
        color: var(--eds-color-text-muted);
        font-size: var(--eds-font-size-md);
        line-height: var(--eds-line-height-relaxed);
      }

      .footer {
        display: flex;
        justify-content: flex-end;
        gap: var(--eds-space-2);
        padding: var(--eds-space-3) var(--eds-space-5) var(--eds-space-5);
        border-top: 1px solid var(--eds-color-border);
      }
    `,
  ],
})
export class EdsModalComponent implements OnChanges, OnDestroy {
  @Input() open = false;
  @Input() heading = 'Dialog';
  @Input() closeOnBackdrop = true;
  @Input() closeOnEscape = true;

  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('dialog') dialogRef?: ElementRef<HTMLElement>;

  readonly titleId = `eds-modal-title-${Math.random().toString(36).slice(2, 9)}`;

  private previouslyFocused: HTMLElement | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['open']) return;

    if (this.open) {
      this.previouslyFocused = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      queueMicrotask(() => {
        const focusable = this.getFocusable();
        (focusable[0] ?? this.dialogRef?.nativeElement)?.focus();
      });
    } else if (changes['open'].previousValue === true) {
      document.body.style.overflow = '';
      this.previouslyFocused?.focus?.();
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (!this.open) return;

    if (event.key === 'Escape' && this.closeOnEscape) {
      event.preventDefault();
      this.close();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = this.getFocusable();
    const dialog = this.dialogRef?.nativeElement;
    if (!focusable.length) {
      event.preventDefault();
      dialog?.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop) return;
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    if (!this.open) return;
    this.open = false;
    this.openChange.emit(false);
  }

  private getFocusable(): HTMLElement[] {
    const dialog = this.dialogRef?.nativeElement;
    if (!dialog) return [];
    const nodes = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    return Array.from(nodes).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);
  }
}
