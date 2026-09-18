import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  EdsAvatarComponent,
  EdsButtonComponent,
  EdsCheckboxComponent,
  EdsComboboxComponent,
  EdsDrawerComponent,
  EdsDropdownMenuComponent,
  EdsInputComponent,
  EdsListComponent,
  EdsMenuItemComponent,
  EdsModalComponent,
  EdsSearchComponent,
  EdsSelectComponent,
  EdsStepperComponent,
  EdsTextareaComponent,
  EdsToastComponent,
  EdsTooltipComponent,
  EdsVisuallyHiddenComponent,
  type EdsComboboxOption,
  type EdsListItem,
  type EdsSelectOption,
  type EdsStepperStep
} from '@poluru-labs/enterprise-design-system-angular';
import { filter, fromEvent } from 'rxjs';
import { templateConfig } from './core/config/template.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    EdsAvatarComponent,
    EdsButtonComponent,
    EdsCheckboxComponent,
    EdsComboboxComponent,
    EdsDrawerComponent,
    EdsDropdownMenuComponent,
    EdsInputComponent,
    EdsListComponent,
    EdsMenuItemComponent,
    EdsModalComponent,
    EdsSearchComponent,
    EdsSelectComponent,
    EdsStepperComponent,
    EdsTextareaComponent,
    EdsToastComponent,
    EdsTooltipComponent,
    EdsVisuallyHiddenComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shell" [class.nav-open]="navOpen()">
      <aside class="sidebar">
        <a class="brand" routerLink="/">
          <span class="brand-mark">{{ config.brand.mark }}</span>
          <span>{{ config.brand.name }} <b>{{ config.brand.accent }}</b></span>
        </a>

        @for (group of config.navGroups; track group.label) {
          <p class="nav-label">{{ group.label }}</p>
          <nav class="nav">
            @for (item of group.items; track item.path) {
              <a [routerLink]="item.path" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: item.exact === true }">
                <span class="material-symbols-outlined">{{ item.icon }}</span>
                <span class="nav-copy">{{ item.label }}</span>
                @if (item.badge) {
                  <em class="nav-badge">{{ item.badge }}</em>
                }
              </a>
            }
          </nav>
        }

        <div class="sidebar-bottom">
          <a routerLink="/settings" routerLinkActive="active">
            <span class="material-symbols-outlined">tune</span>
            Settings
          </a>
          <div class="profile">
            <eds-avatar [name]="config.user.name" size="sm"></eds-avatar>
            <div>
              <strong>{{ config.user.name }}</strong>
              <small>{{ config.user.role }}</small>
            </div>
          </div>
        </div>
      </aside>

      <button class="backdrop" type="button" aria-label="Close navigation" (click)="closeNav()"></button>

      <main>
        <header class="workspace-bar">
          <eds-button
            class="menu-button"
            variant="tertiary"
            size="sm"
            icon="menu"
            [iconOnly]="true"
            accessibleLabel="Open navigation"
            (clicked)="toggleNav()"
          ></eds-button>
          <div class="workspace">{{ config.workspace }} <span class="material-symbols-outlined">expand_more</span></div>
          <eds-search
            class="topbar-search"
            size="sm"
            placeholder="Search agents, runs, tools..."
            [clearable]="true"
            [value]="query()"
            (valueChange)="onSearch($event)"
          ></eds-search>
          <div class="top-actions">
            <eds-tooltip class="header-search-icon" content="Search workspace" placement="bottom">
              <eds-button
                variant="tertiary"
                size="sm"
                icon="search"
                [iconOnly]="true"
                accessibleLabel="Open search"
                (clicked)="goSearch()"
              ></eds-button>
            </eds-tooltip>
            <eds-tooltip content="Alerts" placement="bottom">
              <eds-button
                class="notification"
                variant="tertiary"
                size="sm"
                icon="bell"
                [iconOnly]="true"
                accessibleLabel="Open alerts"
                (clicked)="inboxOpen.set(true)"
              ></eds-button>
            </eds-tooltip>
            <eds-button class="header-deploy" variant="primary" size="sm" icon="upload" (clicked)="openDeployModal()">
              Deploy
            </eds-button>
            <eds-dropdown-menu class="account-menu" placement="bottom">
              <button trigger type="button" class="account" aria-label="Account menu">
                <eds-avatar [name]="config.user.name" size="sm"></eds-avatar>
                <span class="account-copy">
                  <strong>{{ config.user.name }}</strong>
                  <small>{{ config.user.role }}</small>
                </span>
                <span class="material-symbols-outlined account-caret" aria-hidden="true">expand_more</span>
              </button>
              <eds-menu-item label="Workspace settings" value="settings" (itemSelect)="goSettings()"></eds-menu-item>
              <eds-menu-item label="Open alerts" value="alerts" (itemSelect)="goAlerts()"></eds-menu-item>
              <eds-menu-item label="Deploy agent" value="deploy" (itemSelect)="openDeployModal()"></eds-menu-item>
            </eds-dropdown-menu>
          </div>
        </header>
        <eds-visually-hidden>AgentOps Kit operations workspace</eds-visually-hidden>
        <router-outlet />
        <footer class="site-footer">
          <span>Created by <a href="https://polurus.com">Subrahmanyam Poluru</a></span>
          <span>Built with <a href="https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-angular">Enterprise Design System Angular</a></span>
        </footer>
      </main>
    </div>

    <eds-modal [open]="deployOpen()" heading="Deploy agent" (openChange)="deployOpen.set($event)">
      <div class="modal-grid">
        <eds-stepper [steps]="deploySteps" [current]="deployStep()" (stepClick)="deployStep.set($event)"></eds-stepper>
        @if (deployStep() === 0) {
          <eds-input
            label="Agent name"
            placeholder="Collections follow-up"
            icon="user"
            [value]="draftName()"
            (valueChange)="draftName.set($event)"
          ></eds-input>
          <eds-combobox
            label="Model"
            placeholder="Choose a model"
            [options]="modelOptions"
            [value]="draftModel()"
            (valueChange)="draftModel.set($event)"
          ></eds-combobox>
        } @else if (deployStep() === 1) {
          <eds-select
            label="Owner team"
            placeholder="Choose a team"
            [options]="teamOptions"
            [value]="draftTeam()"
            (valueChange)="draftTeam.set($event)"
          ></eds-select>
          <eds-textarea
            label="Release notes"
            placeholder="Why this version should ship"
            [rows]="4"
            [value]="draftNotes()"
            (valueChange)="draftNotes.set($event)"
          ></eds-textarea>
        } @else {
          @for (tool of config.deployTools; track tool) {
            <eds-checkbox
              [label]="tool"
              [checked]="draftTools().includes(tool)"
              (checkedChange)="toggleDraftTool(tool, $event)"
            ></eds-checkbox>
          }
        }
      </div>
      <div footer class="modal-footer">
        <eds-button variant="secondary" (clicked)="deployOpen.set(false)">Cancel</eds-button>
        @if (deployStep() > 0) {
          <eds-button variant="tertiary" (clicked)="deployStep.set(deployStep() - 1)">Back</eds-button>
        }
        <eds-button variant="primary" [disabled]="!canAdvanceDeploy()" (clicked)="advanceDeploy()">
          {{ deployStep() === 2 ? 'Deploy to production' : 'Continue' }}
        </eds-button>
      </div>
    </eds-modal>

    <eds-drawer [open]="inboxOpen()" heading="Alerts" side="right" size="md" (openChange)="inboxOpen.set($event)">
      <div class="drawer-stack">
        <eds-list [items]="inboxItems" [divided]="true"></eds-list>
      </div>
      <div footer class="drawer-footer">
        <eds-button variant="secondary" (clicked)="inboxOpen.set(false)">Close</eds-button>
        <eds-button variant="primary" (clicked)="goAlerts()">Open alerts</eds-button>
      </div>
    </eds-drawer>

    <div class="toast-slot">
      <eds-toast
        title="Deploy queued"
        description="Alex Poluru will see this agent in the directory after the next health check."
        variant="success"
        [open]="toastOpen()"
        (openChange)="toastOpen.set($event)"
      ></eds-toast>
    </div>
  `
})
export class AppComponent {
  private readonly router = inject(Router);
  protected readonly config = templateConfig;
  protected readonly navOpen = signal(false);
  protected readonly query = signal('');
  protected readonly deployOpen = signal(false);
  protected readonly inboxOpen = signal(false);
  protected readonly toastOpen = signal(false);
  protected readonly deployStep = signal(0);
  protected readonly draftName = signal('Collections follow-up');
  protected readonly draftModel = signal(templateConfig.deployModels[0]);
  protected readonly draftTeam = signal('Finance');
  protected readonly draftNotes = signal('');
  protected readonly draftTools = signal(['ERP lookup', 'Slack notify']);

  protected readonly deploySteps: EdsStepperStep[] = [
    { label: 'Agent', description: 'Name and model' },
    { label: 'Owner', description: 'Team and notes' },
    { label: 'Tools', description: 'Approved access' }
  ];

  protected readonly modelOptions: EdsComboboxOption[] = this.config.deployModels.map((label) => ({
    label,
    value: label
  }));

  protected readonly teamOptions: EdsSelectOption[] = [
    { label: 'Finance', value: 'Finance' },
    { label: 'People', value: 'People' },
    { label: 'Support', value: 'Support' },
    { label: 'Legal', value: 'Legal' },
    { label: 'Platform', value: 'Platform' }
  ];

  protected readonly inboxItems: EdsListItem[] = this.config.alerts.slice(0, 4).map((entry) => ({
    label: entry.title,
    description: entry.detail
  }));

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => this.closeNav());

    fromEvent(window, 'agentops:deploy')
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.openDeployModal());
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      void this.router.navigateByUrl('/search');
    }
  }

  protected toggleNav(): void {
    this.navOpen.update((open) => !open);
  }

  protected closeNav(): void {
    this.navOpen.set(false);
  }

  protected onSearch(value: string): void {
    this.query.set(value);
  }

  protected goSearch(): void {
    void this.router.navigateByUrl('/search');
  }

  protected goSettings(): void {
    void this.router.navigateByUrl('/settings');
  }

  protected goAlerts(): void {
    this.inboxOpen.set(false);
    void this.router.navigateByUrl('/alerts');
  }

  protected openDeployModal(): void {
    this.deployStep.set(0);
    this.deployOpen.set(true);
  }

  protected toggleDraftTool(tool: string, checked: boolean): void {
    this.draftTools.update((current) => {
      if (checked) {
        return current.includes(tool) ? current : [...current, tool];
      }
      return current.filter((item) => item !== tool);
    });
  }

  protected canAdvanceDeploy(): boolean {
    if (this.deployStep() === 0) {
      return this.draftName().trim().length > 1 && this.draftModel().length > 0;
    }
    if (this.deployStep() === 1) {
      return this.draftTeam().length > 0;
    }
    return this.draftTools().length > 0;
  }

  protected advanceDeploy(): void {
    if (!this.canAdvanceDeploy()) {
      return;
    }
    if (this.deployStep() < 2) {
      this.deployStep.update((step) => step + 1);
      return;
    }
    this.deployOpen.set(false);
    this.toastOpen.set(true);
  }
}
