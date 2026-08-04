import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-kbd',
  standalone: true,
  template: `<kbd [class]="rootClass"><ng-content></ng-content>{{ keys }}</kbd>`,
  styles: [`
    :host { display: inline; }
    .eds-kbd {
      display: inline-block; padding: 0.1em 0.45em;
      font-family: var(--eds-font-mono); font-size: 0.85em;
      color: var(--eds-color-text); background: var(--eds-color-surface);
      border: 1px solid var(--eds-color-border-strong);
      border-radius: var(--eds-radius-sm);
      box-shadow: 0 1px 0 var(--eds-color-border);
      line-height: 1.4;
    }
  `],
})
export class EdsKbdComponent {
  @Input() keys = '';
  @Input() className = '';
  get rootClass(): string { return cx('eds-kbd', this.className); }
}
