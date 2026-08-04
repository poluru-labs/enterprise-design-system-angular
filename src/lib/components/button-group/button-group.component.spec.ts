import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsButtonGroupComponent } from './button-group.component';

describe('EdsButtonGroupComponent', () => {
  let fixture: ComponentFixture<EdsButtonGroupComponent>;
  let component: EdsButtonGroupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsButtonGroupComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
