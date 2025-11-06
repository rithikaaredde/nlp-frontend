import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThreatLevelIndicator } from '../components/ThreatLevelIndicator';
import { AlertCard } from '../components/AlertCard';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { palette } from '../theme/colors';
import { useApp } from '../context/AppContext';

export const DashboardScreen: React.FC = () => {
  const { threatLevel, alerts, refreshAlerts } = useApp();

  const quickStats = [
    { label: 'Scans today', value: '42', icon: 'scan-outline' as const },
    { label: 'High risks', value: alerts.filter(a => a.severity === 'high').length.toString(), icon: 'warning' as const },
    { label: 'Saved policies', value: '18', icon: 'shield-checkmark-outline' as const },
    { label: 'Response time', value: '3m', icon: 'time-outline' as const }
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl tintColor="#fff" refreshing={false} onRefresh={refreshAlerts} />}
    >
      <ThreatLevelIndicator level={threatLevel} />

      <View style={styles.quickActions}>
        <Button label="Quick scan" style={styles.fullWidth} />
        <View style={styles.quietRow}>
          <Button label="Share report" variant="secondary" style={styles.halfButton} />
          <Button label="Schedule" variant="secondary" style={styles.halfButton} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Operational overview</Text>
      <View style={styles.grid}>
        {quickStats.map(stat => (
          <Card key={stat.label} padding={20} style={styles.gridItem}>
            <Ionicons name={stat.icon} size={24} color={palette.sky} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Card>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Active alerts</Text>
      {alerts.length === 0 ? (
        <Card padding={24}>
          <Text style={styles.emptyTitle}>No alerts at the moment</Text>
          <Text style={styles.emptySubtitle}>You are fully protected. We will notify you if anything changes.</Text>
        </Card>
      ) : (
        alerts.map(alert => <AlertCard key={alert.id} alert={alert} />)
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.neutral100
  },
  content: {
    padding: 20,
    paddingBottom: 80
  },
  quickActions: {
    marginBottom: 28
  },
  fullWidth: {
    marginBottom: 16
  },
  quietRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  halfButton: {
    flex: 1,
    marginHorizontal: 4
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.neutral800,
    marginBottom: 16
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 32
  },
  gridItem: {
    width: '47%',
    marginHorizontal: 6,
    marginBottom: 12
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: palette.neutral900,
    marginTop: 12
  },
  statLabel: {
    fontSize: 14,
    color: palette.neutral500,
    marginTop: 4
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.neutral800,
    marginBottom: 8
  },
  emptySubtitle: {
    fontSize: 14,
    color: palette.neutral500
  }
});

export default DashboardScreen;
