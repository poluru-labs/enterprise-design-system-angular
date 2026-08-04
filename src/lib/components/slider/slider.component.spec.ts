import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsSliderComponent } from './slider.component';

describe('EdsSliderComponent', () => {
  let fixture: ComponentFixture<EdsSliderComponent>;
  let component: EdsSliderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[type="range"]')).toBeTruthy();
  });

  it('should emit valueChange on input', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '75';
    input.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith(75);
  });

  it('should show value when showValue is true', () => {
    component.showValue = true;
    component.value = 42;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.eds-slider__value')?.textContent).toContain('42');
  });
});
