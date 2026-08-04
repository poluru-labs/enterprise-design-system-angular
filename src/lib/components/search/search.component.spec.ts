import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsSearchComponent } from './search.component';

describe('EdsSearchComponent', () => {
  let fixture: ComponentFixture<EdsSearchComponent>;
  let component: EdsSearchComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[type="search"]')).toBeTruthy();
  });

  it('should emit valueChange on input', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'query';
    input.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith('query');
  });

  it('should clear value and emit cleared', () => {
    component.value = 'test';
    fixture.detectChanges();
    const spy = jest.fn();
    component.cleared.subscribe(spy);
    fixture.nativeElement.querySelector('.eds-search__clear').click();
    expect(component.value).toBe('');
    expect(spy).toHaveBeenCalled();
  });
});
