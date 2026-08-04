import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsLinkComponent } from './link.component';

describe('EdsLinkComponent', () => {
  let fixture: ComponentFixture<EdsLinkComponent>;
  let component: EdsLinkComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsLinkComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
