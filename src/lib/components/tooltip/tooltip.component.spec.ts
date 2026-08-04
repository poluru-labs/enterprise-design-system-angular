import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EdsTooltipComponent } from './tooltip.component';

describe('EdsTooltipComponent', () => {
  let fixture: ComponentFixture<EdsTooltipComponent>;
  let component: EdsTooltipComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsTooltipComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsTooltipComponent);
    component = fixture.componentInstance;
    component.content = 'Helpful tip';
  });

  it('renders trigger without tooltip when content is empty', () => {
    component.content = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('shows tooltip after delay on hover', fakeAsync(() => {
    component.delay = 100;
    fixture.detectChanges();
    component.onTriggerEnter();
    tick(100);
    expect(component.visible).toBe(true);
  }));

  it('hides tooltip on leave', fakeAsync(() => {
    fixture.detectChanges();
    component.onTriggerEnter();
    component.onTriggerLeave();
    tick(50);
    expect(component.visible).toBe(false);
  }));
});
