import { useColorScheme } from 'react-native';
import { palette } from './colors';

export const useThemeColors = () => {
  const scheme = useColorScheme();

  const isDark = scheme === 'dark';

  return {
    isDark,
    background: isDark ? palette.navy : palette.neutral100,
    surface: isDark ? palette.midnight : '#FFFFFF',
    textPrimary: isDark ? '#FFFFFF' : palette.neutral900,
    textSecondary: isDark ? palette.neutral300 : palette.neutral500,
    border: isDark ? palette.slate : palette.neutral200,
    card: isDark ? palette.slate : '#FFFFFF',
    overlay: 'rgba(0,0,0,0.7)'
  };
};
