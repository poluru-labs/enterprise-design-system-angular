import { TestBed } from '@angular/core/testing';
import { SettingsPageComponent } from './settings-page.component';
import { internals } from '../../shared/testing/internals';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsPageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('creates workspace settings', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Settings');
    expect(nativeElement.textContent).toContain('AI Suggestions');
  });

  it('starts with production-safe defaults', () => {
    const api = internals(component);
    expect(api.aiSuggestions()).toBe(true);
    expect(api.approvalNotifications()).toBe(true);
    expect(api.brandStrictness()).toBe(false);
    expect(api.brandFloor()).toBe(90);
    expect(api.reminderHours()).toBe(24);
    expect(api.shareHistory()).toBe(true);
    expect(api.archiveDate()).toBe('2026-12-31');
  });

  it('lets operators change policy values', () => {
    const api = internals(component);
    api.brandStrictness.set(true);
    api.brandFloor.set(95);
    api.reminderHours.set(12);
    expect(api.brandStrictness()).toBe(true);
    expect(api.brandFloor()).toBe(95);
    expect(api.reminderHours()).toBe(12);
  });

  it('embeds Alex Poluru in the sample policy', () => {
    expect(internals(component).samplePolicy).toContain('Alex Poluru');
    expect(internals(component).samplePolicy).toContain('brand_floor');
  });
});
