import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsTextareaComponent } from './textarea.component';

describe('EdsTextareaComponent', () => {
  let fixture: ComponentFixture<EdsTextareaComponent>;
  let component: EdsTextareaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('textarea')).toBeTruthy();
  });

  it('should emit valueChange on input', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = 'Notes';
    textarea.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith('Notes');
  });

  it('should show error message when invalid', () => {
    component.invalid = true;
    component.errorMessage = 'Required field';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.eds-error')?.textContent).toContain('Required field');
  });
});
