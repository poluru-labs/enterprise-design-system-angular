import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsDividerComponent } from './divider.component';

describe('EdsDividerComponent', () => {
  let fixture: ComponentFixture<EdsDividerComponent>;
  let component: EdsDividerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsDividerComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should render horizontal divider', () => {
    expect(fixture.nativeElement.querySelector('[role="separator"]')).toBeTruthy();
  });

});
