export const palette = {
  midnight: '#0B1728',
  navy: '#11263F',
  slate: '#1F3D5C',
  sky: '#3A7BD5',
  aqua: '#00D2FF',
  success: '#34D399',
  warning: '#FBBF24',
  danger: '#F87171',
  neutral100: '#F8FAFC',
  neutral200: '#E2E8F0',
  neutral300: '#CBD5F5',
  neutral400: '#94A3B8',
  neutral500: '#64748B',
  neutral600: '#475569',
  neutral700: '#334155',
  neutral800: '#1E293B',
  neutral900: '#111827'
};

export const gradients = {
  primary: [palette.sky, palette.aqua],
  danger: ['#EF4444', '#B91C1C'],
  warning: ['#F59E0B', '#B45309'],
  success: ['#10B981', '#047857']
};

export const threatColors = {
  low: palette.success,
  medium: palette.warning,
  high: palette.danger
};
