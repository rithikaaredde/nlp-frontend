import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useThemeColors } from '../theme';

interface CardProps extends ViewProps {
  elevated?: boolean;
  padding?: number;
}

export const Card: React.FC<CardProps> = ({
  style,
  elevated = true,
  padding = 20,
  children,
  ...rest
}) => {
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: colors.card, padding },
        elevated && styles.elevated,
        style
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 20
  },
  elevated: {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6
  }
});

export default Card;
