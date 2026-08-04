import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsTimelineComponent } from './timeline.component';

describe('EdsTimelineComponent', () => {
  let fixture: ComponentFixture<EdsTimelineComponent>;
  let component: EdsTimelineComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsTimelineComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
