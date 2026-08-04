import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsDescriptionListComponent } from './description-list.component';

describe('EdsDescriptionListComponent', () => {
  let fixture: ComponentFixture<EdsDescriptionListComponent>;
  let component: EdsDescriptionListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsDescriptionListComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsDescriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
