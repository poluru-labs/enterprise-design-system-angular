import { TestBed } from '@angular/core/testing';
import { ApprovalsPageComponent } from './approvals-page.component';
import { internals } from '../../shared/testing/internals';

describe('ApprovalsPageComponent', () => {
  let component: ApprovalsPageComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalsPageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(ApprovalsPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('creates the approvals queue', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Approvals');
    expect(nativeElement.textContent).toContain('AP-2041');
  });

  it('approves a waiting request', () => {
    const api = internals(component);
    api.resolve('AP-2041', 'Approved');
    const item = api.queue().find((entry: { id: string }) => entry.id === 'AP-2041');
    expect(item.status).toBe('Approved');
    expect(item.waiting).toBe('Resolved');
  });

  it('requests changes and blocks drafts', () => {
    const api = internals(component);
    api.resolve('AP-2038', 'Changes');
    expect(api.queue().find((entry: { id: string }) => entry.id === 'AP-2038').status).toBe('Changes');
    api.resolve('AP-2033', 'Blocked');
    expect(api.queue().find((entry: { id: string }) => entry.id === 'AP-2033').status).toBe('Blocked');
  });

  it('maps approval statuses', () => {
    const api = internals(component);
    expect(api.statusVariant('Approved')).toBe('success');
    expect(api.statusVariant('Waiting')).toBe('warning');
    expect(api.statusVariant('Changes')).toBe('warning');
    expect(api.statusVariant('Blocked')).toBe('danger');
    expect(api.statusVariant('Idle')).toBe('neutral');
  });

  it('builds a five-step review cycle', () => {
    expect(internals(component).steps).toHaveLength(5);
  });
});
