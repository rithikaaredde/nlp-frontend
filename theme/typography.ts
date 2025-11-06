import { TextStyle } from 'react-native';

export const fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System'
};

export const typography: Record<string, TextStyle> = {
  headline1: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0.2
  },
  headline2: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.3
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.1
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase'
  }
};
