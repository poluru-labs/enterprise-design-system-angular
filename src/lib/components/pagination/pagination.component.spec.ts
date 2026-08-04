import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsPaginationComponent } from './pagination.component';

describe('EdsPaginationComponent', () => {
  let fixture: ComponentFixture<EdsPaginationComponent>;
  let component: EdsPaginationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsPaginationComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

  it('should compute total pages', () => {
    component.total = 100;
    component.pageSize = 10;
    expect(component.totalPages).toBe(10);
  });

});
