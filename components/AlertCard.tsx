import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AlertItem } from '../types';
import { palette, threatColors } from '../theme/colors';
import { useThemeColors } from '../theme';

interface AlertCardProps {
  alert: AlertItem;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const colors = useThemeColors();
  const ribbonColor = threatColors[alert.severity];

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}
    >
      <View style={[styles.ribbon, { backgroundColor: ribbonColor }]} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>{alert.title}</Text>
          <View style={[styles.badge, { backgroundColor: ribbonColor }]}
          >
            <Text style={styles.badgeText}>{alert.severity.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={[styles.description, { color: colors.textSecondary }]}>{alert.description}</Text>
        <Text style={[styles.timestamp, { color: palette.neutral400 }]}>{new Date(alert.timestamp).toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 16
  },
  ribbon: {
    width: 6
  },
  content: {
    flex: 1,
    padding: 18
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12
  },
  timestamp: {
    fontSize: 12
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.6
  }
});

export default AlertCard;
