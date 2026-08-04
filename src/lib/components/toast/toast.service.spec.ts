import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
    document.body.innerHTML = '';
  });

  it('creates toast host on first show', () => {
    service.show({ title: 'Hello' });
    expect(document.querySelector('eds-toast-host')).toBeTruthy();
  });

  it('show accepts title, description, and variant', () => {
    const id = service.show({ title: 'Done', description: 'All good', variant: 'success' });
    expect(id).toMatch(/^toast-/);
    expect(document.querySelector('eds-toast')?.textContent).toContain('Done');
  });

  it('show returns unique ids', () => {
    const a = service.show({ title: 'One' });
    const b = service.show({ title: 'Two' });
    expect(a).not.toBe(b);
  });
});
