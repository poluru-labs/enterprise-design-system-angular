import { TestBed } from '@angular/core/testing';
import { HandoffsPageComponent } from './handoffs-page.component';
import { internals } from '../../shared/testing/internals';

describe('HandoffsPageComponent', () => {
  let component: HandoffsPageComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandoffsPageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(HandoffsPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('creates the handoff queue', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Handoffs');
    expect(nativeElement.textContent).toContain('HO-1092');
  });

  it('approves a waiting handoff', () => {
    const api = internals(component);
    api.resolve('HO-1092', 'Approved');
    const item = api.waiting().find((entry: { id: string }) => entry.id === 'HO-1092');
    expect(item.status).toBe('Approved');
    expect(item.waiting).toBe('Resolved');
  });

  it('rejects a waiting handoff', () => {
    const api = internals(component);
    api.resolve('HO-1088', 'Rejected');
    const item = api.waiting().find((entry: { id: string }) => entry.id === 'HO-1088');
    expect(item.status).toBe('Rejected');
    expect(item.waiting).toBe('Resolved');
  });

  it('maps handoff statuses', () => {
    const api = internals(component);
    expect(api.statusVariant('Approved')).toBe('success');
    expect(api.statusVariant('Waiting')).toBe('warning');
    expect(api.statusVariant('Rejected')).toBe('danger');
    expect(api.statusVariant('Idle')).toBe('neutral');
  });

  it('builds a five-step review cycle', () => {
    expect(internals(component).steps).toHaveLength(5);
    expect(internals(component).timeline.length).toBeGreaterThan(0);
  });
});
