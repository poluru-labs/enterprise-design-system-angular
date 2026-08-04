import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsTimePickerComponent } from './time-picker.component';

describe('EdsTimePickerComponent', () => {
  let fixture: ComponentFixture<EdsTimePickerComponent>;
  let component: EdsTimePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsTimePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsTimePickerComponent);
    component = fixture.componentInstance;
    component.label = 'Start time';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[type="time"]')).toBeTruthy();
  });

  it('should emit valueChange on change', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '14:30';
    input.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith('14:30');
  });

  it('should render label', () => {
    expect(fixture.nativeElement.querySelector('label')?.textContent).toContain('Start time');
  });
});
