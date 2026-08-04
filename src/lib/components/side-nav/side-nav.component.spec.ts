import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsSideNavComponent } from './side-nav.component';

describe('EdsSideNavComponent', () => {
  let fixture: ComponentFixture<EdsSideNavComponent>;
  let component: EdsSideNavComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsSideNavComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
