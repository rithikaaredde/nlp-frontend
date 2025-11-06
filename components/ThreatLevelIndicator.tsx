import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { threatColors } from '../theme/colors';
import { ThreatLevel } from '../types';

interface ThreatLevelIndicatorProps {
  level: ThreatLevel;
}

export const ThreatLevelIndicator: React.FC<ThreatLevelIndicatorProps> = ({ level }) => {
  const description = useMemo(() => {
    if (level === 'high') return 'Immediate action required. Elevated hostile activity detected.';
    if (level === 'medium') return 'Heightened awareness recommended. Monitor flagged sources closely.';
    return 'All clear. Automated monitors show no active threats.';
  }, [level]);

  return (
    <LinearGradient
      colors={[threatColors[level], '#111827']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.label}>Current Threat Level</Text>
      <Text style={styles.level}>{level.toUpperCase()}</Text>
      <Text style={styles.description}>{description}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 12
  },
  level: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 20
  }
});

export default ThreatLevelIndicator;
