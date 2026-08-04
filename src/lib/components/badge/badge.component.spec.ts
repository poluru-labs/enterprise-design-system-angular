import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsBadgeComponent } from './badge.component';

describe('EdsBadgeComponent', () => {
  let fixture: ComponentFixture<EdsBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsBadgeComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsBadgeComponent);
  });

  it('renders label', () => {
    fixture.componentInstance.label = 'New';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('New');
  });

  it('applies variant and size classes', () => {
    fixture.componentInstance.variant = 'brand';
    fixture.componentInstance.size = 'sm';
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge.classList.contains('brand')).toBe(true);
    expect(badge.classList.contains('sm')).toBe(true);
  });

  it('uses pill shape when pill is true', () => {
    fixture.componentInstance.pill = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.pill')).toBeTruthy();
  });
});
