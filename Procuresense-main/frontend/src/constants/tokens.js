/**
 * ProcureSense AI — Design System Tokens
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all design decisions.
 * Import from here when you need raw values outside of Tailwind classes.
 */

export const COLORS = {
  // Brand
  primary:   '#17bfb7',
  secondary: '#047a74',

  // Neutrals
  foreground:       '#0f172a',
  mutedForeground:  '#64748b',
  background:       '#ffffff',
  muted:            '#f1f5f9',
  border:           '#e2e8f0',

  // Semantic
  success: '#10b981',
  warning: '#f59e0b',
  danger:  '#ef4444',
  info:    '#3b82f6',
}

export const TYPOGRAPHY = {
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  fontMono:   'JetBrains Mono, Fira Code, monospace',
  sizes: {
    '2xs': '10px',
    xs:    '12px',
    sm:    '13px',
    base:  '14px',
    md:    '15px',
    lg:    '16px',
    xl:    '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '28px',
    '5xl': '32px',
  },
  weights: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
    extrabold:800,
  },
}

export const SPACING = {
  xs:  '4px',
  sm:  '8px',
  md:  '12px',
  lg:  '16px',
  xl:  '24px',
  '2xl':'32px',
  '3xl':'48px',
  '4xl':'64px',
}

export const RADIUS = {
  sm:  '8px',
  md:  '12px',
  lg:  '16px',
  xl:  '20px',
  full:'9999px',
}

export const SHADOWS = {
  xs:  '0 1px 2px 0 rgb(0 0 0 / 0.04)',
  sm:  '0 1px 3px 0 rgb(0 0 0 / 0.06)',
  md:  '0 4px 12px 0 rgb(0 0 0 / 0.07)',
  lg:  '0 8px 24px 0 rgb(0 0 0 / 0.08)',
  xl:  '0 16px 40px 0 rgb(0 0 0 / 0.10)',
}

export const SIDEBAR_WIDTH         = 256
export const SIDEBAR_WIDTH_COLLAPSED = 64
export const NAVBAR_HEIGHT         = 64
