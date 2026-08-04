import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'eds-code-snippet',
  standalone: true,
  template: `
    @if (code.trim()) {
      <div class="panel">
        <div class="header">
          <span class="label">{{ label }} · {{ language }}</span>
          <button
            class="copy"
            type="button"
            [attr.data-copied]="copied ? 'true' : 'false'"
            (click)="copy()"
          >
            {{ copied ? 'Copied' : 'Copy' }}
          </button>
        </div>
        <pre><code>{{ code.trim() }}</code></pre>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        margin-top: var(--eds-space-5);
        text-align: left;
      }

      .panel {
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-lg);
        background: var(--eds-color-ink-950);
        color: #e8edf2;
        overflow: hidden;
        box-shadow: var(--eds-shadow-sm);
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--eds-space-3);
        padding: var(--eds-space-2) var(--eds-space-3);
        border-bottom: 1px solid rgb(255 255 255 / 0.08);
        background: rgb(255 255 255 / 0.03);
      }

      .label {
        font-size: var(--eds-font-size-xs);
        font-weight: var(--eds-font-weight-semibold);
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--eds-color-ink-400);
      }

      .copy {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-2);
        margin: 0;
        padding: var(--eds-space-1) var(--eds-space-2);
        border: 1px solid rgb(255 255 255 / 0.12);
        border-radius: var(--eds-radius-sm);
        background: rgb(255 255 255 / 0.04);
        color: #e8edf2;
        font: inherit;
        font-size: var(--eds-font-size-xs);
        font-weight: var(--eds-font-weight-semibold);
        cursor: pointer;
      }

      .copy:hover {
        background: rgb(255 255 255 / 0.08);
        border-color: rgb(255 255 255 / 0.2);
      }

      .copy[data-copied='true'] {
        color: var(--eds-color-brand-300);
        border-color: rgb(61 181 175 / 0.45);
      }

      pre {
        margin: 0;
        padding: var(--eds-space-4);
        overflow: auto;
        max-height: 18rem;
      }

      code {
        font-family: var(--eds-font-mono);
        font-size: 0.8125rem;
        line-height: 1.55;
        white-space: pre;
      }
    `,
  ],
})
export class EdsCodeSnippetComponent {
  @Input() code = '';
  @Input() language = 'html';
  @Input() label = 'Code snippet';

  @Output() copiedChange = new EventEmitter<{ code: string }>();

  copied = false;
  private copyTimer: ReturnType<typeof setTimeout> | null = null;

  async copy(): Promise<void> {
    const text = this.code.trim();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
    }

    this.copied = true;
    if (this.copyTimer) clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => {
      this.copied = false;
    }, 1600);

    this.copiedChange.emit({ code: text });
  }
}
