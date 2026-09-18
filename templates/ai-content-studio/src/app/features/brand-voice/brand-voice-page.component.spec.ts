import { TestBed } from '@angular/core/testing';
import { BrandVoicePageComponent } from './brand-voice-page.component';
import { internals } from '../../shared/testing/internals';
import { templateConfig } from '../../core/config/template.config';

describe('BrandVoicePageComponent', () => {
  let component: BrandVoicePageComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandVoicePageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(BrandVoicePageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('creates brand-voice guardrails', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Brand voice');
    expect(nativeElement.textContent).toContain(templateConfig.brandRules[0].title);
    expect(nativeElement.textContent).toContain('zero-risk AI');
  });

  it('maps rule statuses', () => {
    const api = internals(component);
    expect(api.statusVariant('Healthy')).toBe('success');
    expect(api.statusVariant('Guarded')).toBe('info');
    expect(api.statusVariant('Idle')).toBe('neutral');
  });
});
