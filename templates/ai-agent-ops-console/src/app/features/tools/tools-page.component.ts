import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  EdsBadgeComponent,
  EdsCardComponent,
  EdsCheckboxComponent,
  EdsListComponent,
  EdsRadioComponent,
  EdsRadioGroupComponent,
  EdsStatusComponent,
  EdsSwitchComponent,
  EdsTagComponent,
  EdsTreeViewComponent,
  type EdsListItem,
  type EdsTreeNode
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-tools-page',
  standalone: true,
  imports: [
    EdsBadgeComponent,
    EdsCardComponent,
    EdsCheckboxComponent,
    EdsListComponent,
    EdsRadioComponent,
    EdsRadioGroupComponent,
    EdsStatusComponent,
    EdsSwitchComponent,
    EdsTagComponent,
    EdsTreeViewComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">Tool registry</p>
        <h1>Tools</h1>
        <p class="summary">Manage the approved tools and integrations available to the fleet. Access stays simple: open, approval, or restricted.</p>
      </div>
      <eds-badge [label]="config.tools.length + ' tools'" variant="brand" [soft]="true" [pill]="true"></eds-badge>
    </section>

    <section class="split">
      <eds-card class="card-pad" [elevated]="false">
        <div class="section-head">
          <h2>Catalog</h2>
          <eds-tag [label]="selectedLabel()" variant="brand"></eds-tag>
        </div>
        <eds-tree-view
          [items]="tree"
          [selectedId]="selectedId()"
          [expandedIds]="expanded"
          (nodeSelect)="selectedId.set($event)"
        ></eds-tree-view>
      </eds-card>

      <div class="stack">
        <eds-card class="card-pad" [elevated]="false">
          <h2>{{ selectedLabel() }}</h2>
          <p class="meta">{{ selectedOwner() }}</p>
          <div class="setting" style="margin-top: 0.85rem">
            <div>
              <h3>Available to agents</h3>
              <p>Include this tool in production routing.</p>
            </div>
            <eds-switch label="Enabled" [checked]="enabled()" (checkedChange)="enabled.set($event)"></eds-switch>
          </div>
          <eds-checkbox
            label="Require human approval on every call"
            [checked]="approval()"
            (checkedChange)="approval.set($event)"
          ></eds-checkbox>
          <div style="margin-top: 0.9rem">
            <eds-radio-group label="Access" name="access" [value]="access()" (valueChange)="access.set($event)">
              <eds-radio label="Open" value="open"></eds-radio>
              <eds-radio label="Approval" value="approval"></eds-radio>
              <eds-radio label="Restricted" value="restricted"></eds-radio>
            </eds-radio-group>
          </div>
        </eds-card>

        <eds-card class="card-pad" [elevated]="false">
          <h2>Owners</h2>
          <eds-list [items]="owners" [divided]="true"></eds-list>
        </eds-card>
      </div>
    </section>

    <section class="grid-3" style="margin-top: 0.9rem">
      @for (tool of config.tools; track tool.name) {
        <eds-card class="card-pad collection-card" [elevated]="false">
          <div class="section-head">
            <h3>{{ tool.name }}</h3>
            <eds-status [label]="tool.status" [variant]="statusVariant(tool.status)"></eds-status>
          </div>
          <p class="meta">{{ tool.type }} · {{ tool.calls }} calls · {{ tool.reliability }}</p>
          <p class="meta">{{ tool.owner }} · {{ tool.team }}</p>
          <eds-tag [label]="tool.access" variant="brand"></eds-tag>
        </eds-card>
      }
    </section>
  `
})
export class ToolsPageComponent {
  protected readonly config = templateConfig;
  protected readonly selectedId = signal('internal');
  protected readonly enabled = signal(true);
  protected readonly approval = signal(false);
  protected readonly access = signal('open');

  protected readonly expanded: Record<string, boolean> = {
    catalog: true,
    internal: true
  };

  protected readonly tree: EdsTreeNode[] = [
    {
      id: 'catalog',
      label: 'AgentOps Kit',
      children: [
        {
          id: 'internal',
          label: 'Internal API',
          children: [
            { id: 'erp', label: 'ERP lookup' },
            { id: 'ticketing', label: 'Ticketing' },
            { id: 'hris', label: 'HRIS records' }
          ]
        },
        { id: 'external', label: 'External' },
        { id: 'integration', label: 'Integration' },
        { id: 'parser', label: 'Internal' }
      ]
    }
  ];

  protected readonly owners: EdsListItem[] = this.config.tools.map((item) => ({
    label: item.owner,
    description: item.name + ' · ' + item.status
  }));

  protected selectedLabel(): string {
    const map: Record<string, string> = {
      catalog: 'AgentOps Kit',
      internal: 'Internal API',
      erp: 'ERP lookup',
      ticketing: 'Ticketing',
      hris: 'HRIS records',
      external: 'External',
      integration: 'Integration',
      parser: 'Internal'
    };
    return map[this.selectedId()] ?? 'Internal API';
  }

  protected selectedOwner(): string {
    const found = this.config.tools.find(
      (item) => item.name === this.selectedLabel() || item.type === this.selectedLabel()
    );
    return found?.owner ?? 'Alex Poluru';
  }

  protected statusVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
    if (status === 'Approved') {
      return 'success';
    }
    if (status === 'Restricted') {
      return 'warning';
    }
    if (status === 'Degraded') {
      return 'danger';
    }
    return 'neutral';
  }
}
