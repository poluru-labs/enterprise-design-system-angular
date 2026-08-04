import { Component, Input } from '@angular/core';

@Component({
  selector: 'eds-empty-state',
  standalone: true,
  template: `
    <div class="empty">
      @if (icon) {
        <span class="icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 7.5C4 6.11929 5.11929 5 6.5 5H17.5C18.8807 5 20 6.11929 20 7.5V16.5C20 17.8807 18.8807 19 17.5 19H6.5C5.11929 19 4 17.8807 4 16.5V7.5Z"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path d="M4 9H20" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </span>
      }
      <div class="text">
        @if (heading) {
          <h3 class="heading">{{ heading }}</h3>
        }
        @if (description) {
          <p class="description">{{ description }}</p>
        }
      </div>
      <div class="extra"><ng-content /></div>
      <div class="actions"><ng-content select="[actions]" /></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--eds-space-4);
        padding: var(--eds-space-8) var(--eds-space-6);
        text-align: center;
      }

      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: var(--eds-radius-lg);
        background: var(--eds-color-ink-50);
        color: var(--eds-color-text-muted);
        line-height: 0;
      }

      .text {
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-2);
        max-width: 24rem;
      }

      .heading {
        margin: 0;
        font-size: var(--eds-font-size-lg);
        font-weight: var(--eds-font-weight-semibold);
        line-height: var(--eds-line-height-snug);
        color: var(--eds-color-text);
      }

      .description {
        margin: 0;
        font-size: var(--eds-font-size-sm);
        line-height: var(--eds-line-height-relaxed);
        color: var(--eds-color-text-muted);
      }

      .extra {
        font-size: var(--eds-font-size-sm);
        color: var(--eds-color-text-muted);
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: var(--eds-space-3);
      }

      .actions:empty {
        display: none;
      }
    `,
  ],
})
export class EdsEmptyStateComponent {
  @Input() heading = '';
  @Input() description = '';
  @Input() icon = true;
}
