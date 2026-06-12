export const darkColors = {
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

export const lightColors = {
  bg0: '#F2F4FB',
  bg1: '#FFFFFF',
  bg2: '#E5E9F5',
  glass: 'rgba(0,0,0,0.04)',
  glass2: 'rgba(0,0,0,0.065)',
  glassBrd: 'rgba(0,0,0,0.08)',
  glassBrd2: 'rgba(0,0,0,0.14)',
  txt: '#111525',
  txt2: '#505880',
  txt3: '#8A90B0',
  gold: '#C9971E',
  goldLight: '#E7B830',
  goldDark: '#9A6D0A',
  violet: '#5B4FD0',
  violetLight: '#7A70E8',
  green: '#0A9D5F',
  amber: '#D98B0A',
  red: '#D63346',
  blue: '#3B6EBF',
};

// Default dark colors — keeps all existing imports working
export const colors = darkColors;

export const makeGradients = (dark: boolean) => ({
  bg: (dark
    ? ['#080a14', '#0c0f1d', '#070912']
    : ['#EFF1FA', '#F5F7FF', '#EDF0FA']) as [string, string, string],
  gold: ['#f6e3a6', '#e7c873', '#b8923f'] as [string, string, string],
  violet: ['#a99bff', '#7a6cf0'] as [string, string],
  green: ['#3fbf86', '#5ee0a8'] as [string, string],
  amber: ['#e09a2e', '#ffc15e'] as [string, string],
  cardA: (dark
    ? ['#23284a', '#15182c']
    : ['#FFFFFF', '#F0F3FF']) as [string, string],
  cardB: (dark
    ? ['#2a2238', '#161224']
    : ['#FFFFFF', '#F5F2FF']) as [string, string],
  blue: ['#4A90D9', '#2E5FA3'] as [string, string],
  red: ['#E63946', '#9B2226'] as [string, string],
});

export const gradients = makeGradients(true);

export const radius = {
  lg: 26,
  md: 20,
  sm: 14,
  xs: 11,
};

export const font = {
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semibold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
  extrabold: 'Manrope_800ExtraBold',
  displayMedium: 'Sora_500Medium',
  display: 'Sora_600SemiBold',
  displayBold: 'Sora_700Bold',
};

export const spacing = (n: number) => n * 4;
