import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsCheckboxComponent } from './checkbox.component';

describe('EdsCheckboxComponent', () => {
  let fixture: ComponentFixture<EdsCheckboxComponent>;
  let component: EdsCheckboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsCheckboxComponent);
    component = fixture.componentInstance;
    component.label = 'Accept terms';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[type="checkbox"]')).toBeTruthy();
  });

  it('should emit checkedChange when toggled', () => {
    const spy = jest.fn();
    component.checkedChange.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should render label text', () => {
    expect(fixture.nativeElement.textContent).toContain('Accept terms');
  });
});
