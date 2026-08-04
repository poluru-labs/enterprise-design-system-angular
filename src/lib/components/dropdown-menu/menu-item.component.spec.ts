import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsMenuItemComponent } from './menu-item.component';

describe('EdsMenuItemComponent', () => {
  let fixture: ComponentFixture<EdsMenuItemComponent>;
  let component: EdsMenuItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsMenuItemComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsMenuItemComponent);
    component = fixture.componentInstance;
    component.label = 'Edit';
    component.value = 'edit';
  });

  it('renders label', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Edit');
  });

  it('emits itemSelect on click', () => {
    fixture.detectChanges();
    const spy = jest.fn();
    component.itemSelect.subscribe(spy);
    fixture.nativeElement.querySelector('button').click();
    expect(spy).toHaveBeenCalledWith({ value: 'edit', label: 'Edit' });
  });

  it('does not emit when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const spy = jest.fn();
    component.itemSelect.subscribe(spy);
    fixture.nativeElement.querySelector('button').click();
    expect(spy).not.toHaveBeenCalled();
  });
});
