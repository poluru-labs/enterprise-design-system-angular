import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsSkeletonComponent } from './skeleton.component';

describe('EdsSkeletonComponent', () => {
  let fixture: ComponentFixture<EdsSkeletonComponent>;
  let component: EdsSkeletonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsSkeletonComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
