import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsRadioComponent } from './radio.component';
import { EdsRadioGroupComponent } from './radio-group.component';

describe('EdsRadioComponent', () => {
  let fixture: ComponentFixture<EdsRadioComponent>;
  let component: EdsRadioComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsRadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsRadioComponent);
    component = fixture.componentInstance;
    component.label = 'Option A';
    component.value = 'a';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[type="radio"]')).toBeTruthy();
  });

  it('should emit checkedChange when standalone', () => {
    const spy = jest.fn();
    component.checkedChange.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith(true);
  });
});

describe('EdsRadioGroupComponent', () => {
  let fixture: ComponentFixture<EdsRadioGroupComponent>;
  let component: EdsRadioGroupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsRadioGroupComponent, EdsRadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsRadioGroupComponent);
    component = fixture.componentInstance;
    component.name = 'plan';
    fixture.detectChanges();
  });

  it('should create radio group', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('fieldset')).toBeTruthy();
  });

  it('should emit valueChange when select is called', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.select('pro', new Event('change'));
    expect(spy).toHaveBeenCalledWith('pro');
  });
});
