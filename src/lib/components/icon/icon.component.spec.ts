import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsIconComponent } from './icon.component';

describe('EdsIconComponent', () => {
  let fixture: ComponentFixture<EdsIconComponent>;
  let component: EdsIconComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsIconComponent);
    component = fixture.componentInstance;
    component.name = 'check';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an svg for a valid icon name', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg.classList.contains('eds-icon--md')).toBe(true);
  });

  it('should set aria-label when not decorative', () => {
    component.decorative = false;
    component.label = 'Checked';
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('aria-label')).toBe('Checked');
    expect(svg.getAttribute('role')).toBe('img');
  });
});
