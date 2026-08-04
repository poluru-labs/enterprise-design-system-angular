/** Design token values mirrored from CSS custom properties for typed consumption. */

export const color = {
  ink: {
    950: '#0f1720',
    900: '#1a2430',
    800: '#2a3746',
    700: '#3d4d5f',
    600: '#5b6b7c',
    500: '#7a8b9c',
    400: '#9aa8b6',
    300: '#b8c3ce',
    200: '#d7dee7',
    100: '#e8edf2',
    50: '#f4f6f8',
  },
  brand: {
    900: '#084845',
    800: '#0b5a56',
    700: '#0f6e6a',
    600: '#12837e',
    500: '#1a9b95',
    400: '#3db5af',
    300: '#6dcdc8',
    200: '#a6e2df',
    100: '#d4f1ef',
    50: '#eef9f8',
  },
  white: '#ffffff',
  success: { 600: '#1f7a4d', 100: '#d9f2e5' },
  warning: { 600: '#9a6700', 100: '#fff1cc' },
  danger: { 600: '#b42318', 100: '#fce8e6' },
  info: { 600: '#175cd3', 100: '#e0ecff' },
} as const;

export const typography = {
  fontFamily: {
    sans: "'Source Sans 3', 'Segoe UI', 'Helvetica Neue', sans-serif",
    display: "'Source Serif 4', Georgia, 'Times New Roman', serif",
    mono: "'IBM Plex Mono', ui-monospace, monospace",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.65,
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
} as const;

export const radius = {
  none: '0',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const;

export const elevation = {
  xs: '0 1px 2px rgb(15 23 32 / 0.05)',
  sm: '0 1px 3px rgb(15 23 32 / 0.08), 0 1px 2px rgb(15 23 32 / 0.04)',
  md: '0 4px 12px rgb(15 23 32 / 0.08), 0 2px 4px rgb(15 23 32 / 0.04)',
  lg: '0 12px 32px rgb(15 23 32 / 0.12), 0 4px 8px rgb(15 23 32 / 0.06)',
  focus: '0 0 0 3px rgb(18 131 126 / 0.35)',
} as const;

export const motion = {
  duration: {
    fast: '120ms',
    normal: '200ms',
    slow: '320ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  },
} as const;

export const tokens = {
  color,
  typography,
  spacing,
  radius,
  elevation,
  motion,
} as const;

export type EdsTokens = typeof tokens;
