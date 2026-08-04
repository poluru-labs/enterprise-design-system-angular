import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsInputComponent } from './input.component';

describe('EdsInputComponent', () => {
  let fixture: ComponentFixture<EdsInputComponent>;
  let component: EdsInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input')).toBeTruthy();
  });

  it('should emit valueChange on input', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith('hello');
  });

  it('should render label when provided', () => {
    component.label = 'Email';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label')?.textContent).toContain('Email');
  });
});
