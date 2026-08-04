import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsEmptyStateComponent } from './empty-state.component';

describe('EdsEmptyStateComponent', () => {
  let fixture: ComponentFixture<EdsEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsEmptyStateComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsEmptyStateComponent);
  });

  it('renders heading and description', () => {
    fixture.componentInstance.heading = 'No results';
    fixture.componentInstance.description = 'Try another search';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No results');
    expect(fixture.nativeElement.textContent).toContain('Try another search');
  });

  it('shows icon by default', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.icon')).toBeTruthy();
  });

  it('hides icon when icon is false', () => {
    fixture.componentInstance.icon = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.icon')).toBeNull();
  });
});
