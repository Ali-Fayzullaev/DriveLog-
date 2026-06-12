export const colors = {
  bg0: '#070912',
  bg1: '#0d1020',
  bg2: '#141830',

  glass: 'rgba(255,255,255,0.055)',
  glass2: 'rgba(255,255,255,0.085)',
  glassBrd: 'rgba(255,255,255,0.10)',
  glassBrd2: 'rgba(255,255,255,0.16)',

  txt: '#f4f5fb',
  txt2: '#a6abc4',
  txt3: '#6a6f8a',

  gold: '#e7c873',
  goldLight: '#f6e3a6',
  goldDark: '#b8923f',

  violet: '#8b7ff0',
  violetLight: '#a99bff',

  green: '#5ee0a8',
  amber: '#ffc15e',
  red: '#ff7a85',
  blue: '#85b7eb',
};

export const gradients = {
  // deep premium background
  bg: ['#080a14', '#0c0f1d', '#070912'] as const,
  gold: ['#f6e3a6', '#e7c873', '#b8923f'] as const,
  violet: ['#a99bff', '#7a6cf0'] as const,
  green: ['#3fbf86', '#5ee0a8'] as const,
  amber: ['#e09a2e', '#ffc15e'] as const,
  cardA: ['#23284a', '#15182c'] as const,
  cardB: ['#2a2238', '#161224'] as const,
};

export const radius = {
  lg: 26,
  md: 20,
  sm: 14,
  xs: 11,
};

export const font = {
  // Manrope (UI)
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semibold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
  extrabold: 'Manrope_800ExtraBold',
  // Sora (display / numbers)
  displayMedium: 'Sora_500Medium',
  display: 'Sora_600SemiBold',
  displayBold: 'Sora_700Bold',
};

export const spacing = (n: number) => n * 4;
