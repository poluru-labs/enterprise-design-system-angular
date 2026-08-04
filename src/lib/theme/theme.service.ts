import { Injectable, signal, computed } from '@angular/core';

export type EdsTheme = 'light' | 'dark';

/**
 * Applies light/dark tokens via the `eds-theme-dark` class on html + body.
 */
@Injectable({ providedIn: 'root' })
export class EdsThemeService {
  private readonly themeSignal = signal<EdsTheme>('light');

  readonly theme = this.themeSignal.asReadonly();
  readonly isDark = computed(() => this.themeSignal() === 'dark');

  setTheme(theme: EdsTheme): void {
    this.themeSignal.set(theme);
    this.apply(theme);
  }

  toggleTheme(): void {
    this.setTheme(this.themeSignal() === 'dark' ? 'light' : 'dark');
  }

  private apply(theme: EdsTheme): void {
    if (typeof document === 'undefined') return;
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('eds-theme-dark', isDark);
    document.body.classList.toggle('eds-theme-dark', isDark);
  }
}
