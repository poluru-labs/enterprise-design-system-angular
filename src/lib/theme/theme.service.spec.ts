import { TestBed } from '@angular/core/testing';
import { EdsThemeService } from './theme.service';

describe('EdsThemeService', () => {
  let service: EdsThemeService;

  beforeEach(() => {
    document.documentElement.classList.remove('eds-theme-dark');
    document.body.classList.remove('eds-theme-dark');
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdsThemeService);
  });

  afterEach(() => {
    document.documentElement.classList.remove('eds-theme-dark');
    document.body.classList.remove('eds-theme-dark');
  });

  it('defaults to light', () => {
    expect(service.theme()).toBe('light');
    expect(service.isDark()).toBe(false);
  });

  it('applies dark theme class on html and body', () => {
    service.setTheme('dark');
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.classList.contains('eds-theme-dark')).toBe(true);
    expect(document.body.classList.contains('eds-theme-dark')).toBe(true);
  });

  it('toggles between light and dark', () => {
    service.toggleTheme();
    expect(service.theme()).toBe('dark');
    service.toggleTheme();
    expect(service.theme()).toBe('light');
    expect(document.documentElement.classList.contains('eds-theme-dark')).toBe(false);
  });
});
