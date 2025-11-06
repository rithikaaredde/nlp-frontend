import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { palette } from '../theme/colors';

interface BadgeProps {
  value: number | string;
  variant?: 'neutral' | 'danger' | 'success' | 'warning';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({ value, variant = 'danger', style }) => {
  const backgroundColor =
    variant === 'danger'
      ? palette.danger
      : variant === 'success'
        ? palette.success
        : variant === 'warning'
          ? palette.warning
          : palette.neutral400;

  return (
    <View style={[styles.wrapper, { backgroundColor }, style]}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    minWidth: 22,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700'
  }
});

export default Badge;
