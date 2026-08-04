import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsBreadcrumbComponent } from './breadcrumb.component';

describe('EdsBreadcrumbComponent', () => {
  let fixture: ComponentFixture<EdsBreadcrumbComponent>;
  let component: EdsBreadcrumbComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsBreadcrumbComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
