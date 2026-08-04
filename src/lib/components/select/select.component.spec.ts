import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsSelectComponent } from './select.component';

describe('EdsSelectComponent', () => {
  let fixture: ComponentFixture<EdsSelectComponent>;
  let component: EdsSelectComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsSelectComponent);
    component = fixture.componentInstance;
    component.options = [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('option').length).toBe(2);
  });

  it('should emit valueChange when selection changes', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = '2';
    select.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith('2');
  });

  it('should render placeholder option', () => {
    component.placeholder = 'Choose…';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('option')?.textContent).toContain('Choose');
  });
});
