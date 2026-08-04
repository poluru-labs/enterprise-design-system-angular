import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsSegmentedControlComponent } from './segmented-control.component';

describe('EdsSegmentedControlComponent', () => {
  let fixture: ComponentFixture<EdsSegmentedControlComponent>;
  let component: EdsSegmentedControlComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsSegmentedControlComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsSegmentedControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
