/** Shared form helpers for design-system consumers. */

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function formatCount(value: number): string {
  if (value < 1000) return String(value);
  if (value < 1_000_000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
}

export type EdsDensity = 'comfortable' | 'compact';

/** Apply density class on documentElement for global density tokens (future-ready). */
export function setDensity(density: EdsDensity): void {
  document.documentElement.dataset['edsDensity'] = density;
}
