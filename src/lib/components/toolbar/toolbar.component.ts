import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-toolbar',
  standalone: true,
  template: `
    <div [class]="rootClass" role="toolbar">
      <div class="eds-toolbar__start"><ng-content select="[edsToolbarStart]"></ng-content>{{ start }}</div>
      <div class="eds-toolbar__center"><ng-content select="[edsToolbarCenter]"></ng-content>{{ center }}<ng-content></ng-content></div>
      <div class="eds-toolbar__end"><ng-content select="[edsToolbarEnd]"></ng-content>{{ end }}</div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .eds-toolbar { display: flex; align-items: center; gap: var(--eds-space-3); padding: var(--eds-space-2) var(--eds-space-4); background: var(--eds-color-surface); }
    .eds-toolbar--bordered { border: 1px solid var(--eds-color-border); border-radius: var(--eds-radius-md); }
    .eds-toolbar--sticky { position: sticky; top: 0; z-index: 10; }
    .eds-toolbar__start, .eds-toolbar__center, .eds-toolbar__end { display: flex; align-items: center; gap: var(--eds-space-2); }
    .eds-toolbar__start { flex: 1; justify-content: flex-start; }
    .eds-toolbar__center { flex: 1; justify-content: center; }
    .eds-toolbar__end { flex: 1; justify-content: flex-end; }
  `],
})
export class EdsToolbarComponent {
  @Input() bordered = false;
  @Input() sticky = false;
  @Input() start = '';
  @Input() center = '';
  @Input() end = '';
  @Input() className = '';
  get rootClass(): string { return cx('eds-toolbar', this.bordered && 'eds-toolbar--bordered', this.sticky && 'eds-toolbar--sticky', this.className); }
}
