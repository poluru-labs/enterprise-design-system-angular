import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsTreeViewComponent } from './tree-view.component';

describe('EdsTreeViewComponent', () => {
  let fixture: ComponentFixture<EdsTreeViewComponent>;
  let component: EdsTreeViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsTreeViewComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
