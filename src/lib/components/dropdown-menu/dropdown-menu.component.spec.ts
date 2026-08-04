import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsDropdownMenuComponent } from './dropdown-menu.component';
import { EdsMenuItemComponent } from './menu-item.component';

describe('EdsDropdownMenuComponent', () => {
  let fixture: ComponentFixture<EdsDropdownMenuComponent>;
  let component: EdsDropdownMenuComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsDropdownMenuComponent, EdsMenuItemComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(EdsDropdownMenuComponent);
    component = fixture.componentInstance;
  });

  it('starts closed', () => {
    expect(component.open).toBe(false);
  });

  it('opens on toggle', () => {
    component.toggle(new Event('click'));
    expect(component.open).toBe(true);
  });

  it('closes on Escape', () => {
    component.open = true;
    fixture.detectChanges();
    component.onDocumentKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.open).toBe(false);
  });
});
