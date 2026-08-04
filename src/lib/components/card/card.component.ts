import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-card',
  standalone: true,
  template: `
    <article [class]="classes">
      <div class="media"><ng-content select="[media]" /></div>
      <div class="header"><ng-content select="[header]" /></div>
      <div class="body"><ng-content /></div>
      <div class="footer"><ng-content select="[footer]" /></div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .card {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-lg);
        background: var(--eds-color-surface);
        color: var(--eds-color-text);
      }

      .elevated {
        border-color: transparent;
        box-shadow: var(--eds-shadow-sm);
      }

      .padded .header {
        padding: var(--eds-space-5) var(--eds-space-5) var(--eds-space-3);
        border-bottom: 1px solid var(--eds-color-border);
      }

      .padded .body {
        padding: var(--eds-space-5);
      }

      .padded .footer {
        padding: var(--eds-space-3) var(--eds-space-5) var(--eds-space-5);
        border-top: 1px solid var(--eds-color-border);
      }
    `,
  ],
})
export class EdsCardComponent {
  @Input() elevated = false;
  @Input() padded = true;

  get classes(): string {
    return cx('card', this.elevated && 'elevated', this.padded && 'padded');
  }
}
