import { TestBed } from '@angular/core/testing';
import { CalendarPageComponent } from './calendar-page.component';
import { internals } from '../../shared/testing/internals';

describe('CalendarPageComponent', () => {
  let component: CalendarPageComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarPageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(CalendarPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('creates the editorial calendar', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Calendar');
    expect(nativeElement.textContent).toContain('Campaign brief alignment');
  });

  it('builds a five-item timeline for this week', () => {
    expect(internals(component).timelineItems).toHaveLength(5);
  });

  it('maps calendar statuses', () => {
    const api = internals(component);
    expect(api.statusVariant('Complete')).toBe('success');
    expect(api.statusVariant('Current')).toBe('warning');
    expect(api.statusVariant('Upcoming')).toBe('info');
    expect(api.statusVariant('Idle')).toBe('neutral');
  });
});
