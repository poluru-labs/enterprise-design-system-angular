import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { DeployPageComponent } from './deploy-page.component';
import { internals } from '../../shared/testing/internals';
import { templateConfig } from '../../core/config/template.config';

describe('DeployPageComponent', () => {
  let component: DeployPageComponent;
  let nativeElement: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeployPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(DeployPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('creates the deploy form with preflight defaults', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Deploy agent');
    const api = internals(component);
    expect(api.name()).toBe('Collections follow-up');
    expect(api.owner()).toBe('Finance');
    expect(api.model()).toBe(templateConfig.deployModels[0]);
    expect(api.submitted()).toBe(false);
  });

  it('adds and removes approved tools', () => {
    const api = internals(component);
    api.toggleTool('Ticketing', true);
    expect(api.tools()).toContain('Ticketing');
    api.toggleTool('Ticketing', false);
    expect(api.tools()).not.toContain('Ticketing');
    api.toggleTool('ERP lookup', true);
    expect(api.tools().filter((tool: string) => tool === 'ERP lookup')).toHaveLength(1);
  });

  it('navigates back to the agent directory', () => {
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    internals(component).goAgents();
    expect(navigate).toHaveBeenCalledWith('/agents');
  });

  it('exposes model options from the workspace config', () => {
    expect(internals(component).modelOptions).toEqual(
      templateConfig.deployModels.map((label) => ({ label, value: label }))
    );
  });
});
