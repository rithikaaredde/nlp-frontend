import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { palette } from '../theme/colors';

interface SegmentedControlProps<T extends string> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}

export const SegmentedControl = <T extends string>({ options, value, onChange }: SegmentedControlProps<T>) => {
  return (
    <View style={styles.wrapper}>
      {options.map(option => {
        const isSelected = option.value === value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.segment, isSelected && styles.segmentActive]}
            onPress={() => onChange(option.value)}
            activeOpacity={0.85}
          >
            <Text style={[styles.label, isSelected && styles.labelActive]}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: palette.neutral200,
    borderRadius: 16,
    padding: 4
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  segmentActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.neutral500
  },
  labelActive: {
    color: palette.sky
  }
});

export default SegmentedControl;
