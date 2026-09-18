import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { internals } from './shared/testing/internals';
import { templateConfig } from './core/config/template.config';

describe('AppComponent', () => {
  let component: AppComponent;
  let nativeElement: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('creates the operations shell', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.querySelector('.brand')?.textContent).toContain('AgentOps');
    expect(nativeElement.querySelector('.workspace')?.textContent).toContain(templateConfig.workspace);
  });

  it('renders grouped sidebar navigation', () => {
    const labels = Array.from(nativeElement.querySelectorAll('.nav-label')).map((node) => node.textContent?.trim());
    expect(labels).toEqual(['Operations', 'Oversight']);
    expect(nativeElement.textContent).toContain('Handoffs');
    expect(nativeElement.textContent).toContain('Alex Poluru');
  });

  it('toggles and closes the mobile nav', () => {
    const api = internals(component);
    expect(api.navOpen()).toBe(false);
    api.toggleNav();
    expect(api.navOpen()).toBe(true);
    api.closeNav();
    expect(api.navOpen()).toBe(false);
  });

  it('stores workspace search text', () => {
    internals(component).onSearch('invoice triage');
    expect(internals(component).query()).toBe('invoice triage');
  });

  it('opens the deploy modal on step 0', () => {
    const api = internals(component);
    api.deployStep.set(2);
    api.openDeployModal();
    expect(api.deployOpen()).toBe(true);
    expect(api.deployStep()).toBe(0);
  });

  it('requires a name and model before advancing deploy step 0', () => {
    const api = internals(component);
    api.deployStep.set(0);
    api.draftName.set('');
    expect(api.canAdvanceDeploy()).toBe(false);
    api.draftName.set('Collections follow-up');
    api.draftModel.set(templateConfig.deployModels[0]);
    expect(api.canAdvanceDeploy()).toBe(true);
  });

  it('requires a team on deploy step 1 and tools on step 2', () => {
    const api = internals(component);
    api.deployStep.set(1);
    api.draftTeam.set('');
    expect(api.canAdvanceDeploy()).toBe(false);
    api.draftTeam.set('Finance');
    expect(api.canAdvanceDeploy()).toBe(true);

    api.deployStep.set(2);
    api.draftTools.set([]);
    expect(api.canAdvanceDeploy()).toBe(false);
    api.draftTools.set(['ERP lookup']);
    expect(api.canAdvanceDeploy()).toBe(true);
  });

  it('toggles draft tools and advances the deploy wizard', () => {
    const api = internals(component);
    api.deployStep.set(0);
    api.draftName.set('Collections follow-up');
    api.draftModel.set(templateConfig.deployModels[0]);
    api.advanceDeploy();
    expect(api.deployStep()).toBe(1);

    api.toggleDraftTool('Ticketing', true);
    expect(api.draftTools()).toContain('Ticketing');
    api.toggleDraftTool('Ticketing', false);
    expect(api.draftTools()).not.toContain('Ticketing');
  });

  it('queues a toast after the last deploy step', () => {
    const api = internals(component);
    api.deployStep.set(2);
    api.draftTools.set(['ERP lookup']);
    api.advanceDeploy();
    expect(api.deployOpen()).toBe(false);
    expect(api.toastOpen()).toBe(true);
  });

  it('does not advance deploy when the current step is invalid', () => {
    const api = internals(component);
    api.deployStep.set(0);
    api.draftName.set('');
    api.advanceDeploy();
    expect(api.deployStep()).toBe(0);
  });

  it('navigates to search, settings, and alerts', () => {
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const api = internals(component);
    api.goSearch();
    api.goSettings();
    api.inboxOpen.set(true);
    api.goAlerts();
    expect(navigate).toHaveBeenCalledWith('/search');
    expect(navigate).toHaveBeenCalledWith('/settings');
    expect(navigate).toHaveBeenCalledWith('/alerts');
    expect(api.inboxOpen()).toBe(false);
  });

  it('opens search on ⌘K', () => {
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
    const prevent = vi.spyOn(event, 'preventDefault');
    internals(component).onKeydown(event);
    expect(prevent).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/search');
  });

  it('opens the deploy modal from the agentops:deploy event', () => {
    internals(component).deployOpen.set(false);
    window.dispatchEvent(new CustomEvent('agentops:deploy'));
    expect(internals(component).deployOpen()).toBe(true);
  });
});
