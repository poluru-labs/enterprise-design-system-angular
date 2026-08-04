import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsAvatarComponent } from './avatar.component';

describe('EdsAvatarComponent', () => {
  let fixture: ComponentFixture<EdsAvatarComponent>;
  let component: EdsAvatarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsAvatarComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsAvatarComponent);
    component = fixture.componentInstance;
  });

  it('shows initials from name', () => {
    component.name = 'Jane Doe';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('JD');
  });

  it('shows question mark when name is empty', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('?');
  });

  it('falls back to initials on image error', () => {
    component.name = 'Alex';
    component.src = 'bad.png';
    fixture.detectChanges();
    component.onImageError();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('AL');
  });
});
