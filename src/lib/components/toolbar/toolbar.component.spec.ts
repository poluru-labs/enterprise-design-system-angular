import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsToolbarComponent } from './toolbar.component';

describe('EdsToolbarComponent', () => {
  let fixture: ComponentFixture<EdsToolbarComponent>;
  let component: EdsToolbarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsToolbarComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
