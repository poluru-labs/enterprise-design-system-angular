import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsAccordionComponent } from './accordion.component';

describe('EdsAccordionComponent', () => {
  let fixture: ComponentFixture<EdsAccordionComponent>;
  let component: EdsAccordionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsAccordionComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
