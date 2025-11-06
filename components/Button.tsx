import React from 'react';
import { ActivityIndicator, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { palette } from '../theme/colors';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  style,
  disabled = false,
  loading = false
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.base, styles[variant], isDisabled && styles.disabled, style]}
    >
      {loading ? <ActivityIndicator color={variant === 'ghost' ? palette.sky : '#ffffff'} /> : <Text style={[styles.label, styles[`${variant}Label` as const]]}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: '600'
  },
  primary: {
    backgroundColor: palette.sky
  },
  primaryLabel: {
    color: '#FFFFFF'
  },
  secondary: {
    backgroundColor: palette.neutral200
  },
  secondaryLabel: {
    color: palette.neutral800
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: palette.sky
  },
  ghostLabel: {
    color: palette.sky
  },
  disabled: {
    opacity: 0.5
  }
});

export default Button;
