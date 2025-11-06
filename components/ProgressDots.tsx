import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { palette } from '../theme/colors';

interface ProgressDotsProps {
  count: number;
  progress: Animated.AnimatedInterpolation<string | number>;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({ count, progress }) => {
  return (
    <View style={styles.container}>
      {new Array(count).fill(0).map((_, index) => {
        const opacity = progress.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp'
        });

        const scale = progress.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [1, 1.3, 1],
          extrapolate: 'clamp'
        });

        return (
          <Animated.View
            key={index}
            style={[styles.dot, { opacity, transform: [{ scale }] }]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.sky,
    marginHorizontal: 6
  }
});

export default ProgressDots;
