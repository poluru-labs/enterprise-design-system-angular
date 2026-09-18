import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AlertsPageComponent } from './alerts-page.component';
import { internals } from '../../shared/testing/internals';
import { templateConfig } from '../../core/config/template.config';

describe('AlertsPageComponent', () => {
  let component: AlertsPageComponent;
  let nativeElement: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(AlertsPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('creates the alert feed', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Alerts');
    expect(internals(component).filtered().length).toBe(templateConfig.alerts.length);
  });

  it('filters alerts by search text', () => {
    internals(component).search.set('parser');
    const rows = internals(component).filtered() as { title: string }[];
    expect(rows.length).toBe(1);
    expect(rows[0].title).toContain('Contract parser');
  });

  it('filters alerts by remaining tags', () => {
    const api = internals(component);
    api.tags.set(['Action needed']);
    const rows = api.filtered() as { severity: string }[];
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((item) => item.severity === 'Action needed')).toBe(true);
    api.dismissTag('Action needed');
    expect(api.tags()).toEqual([]);
  });

  it('navigates to alert settings', () => {
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    internals(component).goSettings();
    expect(navigate).toHaveBeenCalledWith('/settings');
  });

  it('maps severities', () => {
    const api = internals(component);
    expect(api.statusVariant('Action needed')).toBe('warning');
    expect(api.statusVariant('Warning')).toBe('danger');
    expect(api.statusVariant('Info')).toBe('info');
  });
});
