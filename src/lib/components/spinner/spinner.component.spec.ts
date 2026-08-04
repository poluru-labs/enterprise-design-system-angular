import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsSpinnerComponent } from './spinner.component';

describe('EdsSpinnerComponent', () => {
  let fixture: ComponentFixture<EdsSpinnerComponent>;
  let component: EdsSpinnerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsSpinnerComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with default size', () => {
    expect(component).toBeTruthy();
    expect(component.size).toBe('md');
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeTruthy();
  });

  it('should apply size class', () => {
    component.size = 'lg';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.eds-spinner__ring--lg')).toBeTruthy();
  });

  it('should show visible label when showLabel is true', () => {
    component.showLabel = true;
    component.label = 'Please wait';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Please wait');
  });
});
