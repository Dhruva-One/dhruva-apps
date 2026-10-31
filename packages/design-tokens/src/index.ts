/**
 * Halo design tokens shared by desktop and phone.
 * Values are starting points; sync them with the Dhruva One design canvas.
 * Status colours carry meaning: teal on track, blue fine, amber watch, red needs attention.
 */
export const colors = {
  navy: '#0B1B3A',
  surface: '#FFFFFF',
  surfaceDark: '#0F172A',
  text: '#0F172A',
  textMuted: '#475569',
  status: { onTrack: '#0D9488', fine: '#2563EB', watch: '#D97706', attention: '#DC2626' },
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const radius = { sm: 6, md: 10, lg: 16, pill: 999 } as const;
export const font = {
  family: "'Noto Sans', 'Noto Sans Devanagari', system-ui, sans-serif",
  size: { sm: 13, md: 15, lg: 18, xl: 24 },
} as const;
