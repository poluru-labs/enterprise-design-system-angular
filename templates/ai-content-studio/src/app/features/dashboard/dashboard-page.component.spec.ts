import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page.component';
import { internals } from '../../shared/testing/internals';
import { templateConfig } from '../../core/config/template.config';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('creates the content dashboard', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Content studio');
    expect(nativeElement.textContent).toContain('Three approvals are waiting for Alex Poluru');
  });

  it('renders headline metrics and features', () => {
    expect(nativeElement.textContent).toContain('76');
    expect(nativeElement.textContent).toContain('87.9%');
    expect(nativeElement.textContent).toContain('AI Draft Studio');
    expect(internals(component).period()).toBe('week');
  });

  it('maps activity statuses to EDS variants', () => {
    const api = internals(component);
    expect(api.statusVariant('Approved')).toBe('success');
    expect(api.statusVariant('Published')).toBe('success');
    expect(api.statusVariant('Review')).toBe('warning');
    expect(api.statusVariant('Blocked')).toBe('danger');
    expect(api.statusVariant('Scheduled')).toBe('info');
    expect(api.statusVariant('Idle')).toBe('neutral');
  });

  it('shows channel mix and editorial load', () => {
    expect(nativeElement.textContent).toContain(templateConfig.channels[0].name);
    expect(nativeElement.textContent).toContain('Alex Poluru');
  });
});
