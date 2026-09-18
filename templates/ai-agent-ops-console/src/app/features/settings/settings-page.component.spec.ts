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
    expect(nativeElement.textContent).toContain('Require approval for external tools');
  });

  it('starts with production-safe defaults', () => {
    const api = internals(component);
    expect(api.externalApproval()).toBe(true);
    expect(api.autoPause()).toBe(true);
    expect(api.handoffAlerts()).toBe(true);
    expect(api.reliabilityFloor()).toBe(95);
    expect(api.failCount()).toBe(3);
    expect(api.shareTraces()).toBe(true);
    expect(api.purgeDate()).toBe('2026-12-31');
    expect(api.digestTime()).toBe('07:30');
    expect(api.pin()).toBe('');
  });

  it('lets operators change policy values', () => {
    const api = internals(component);
    api.externalApproval.set(false);
    api.reliabilityFloor.set(90);
    api.pin.set('2468');
    expect(api.externalApproval()).toBe(false);
    expect(api.reliabilityFloor()).toBe(90);
    expect(api.pin()).toBe('2468');
  });

  it('embeds Alex Poluru in the sample policy', () => {
    expect(internals(component).samplePolicy).toContain('Alex Poluru');
    expect(internals(component).samplePolicy).toContain('approval');
  });
});
