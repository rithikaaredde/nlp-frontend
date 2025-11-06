import React, { useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { useApp } from '../context/AppContext';
import { nlpApi } from '../services/nlpApi';
import { palette, threatColors } from '../theme/colors';
import { ScanResult, ThreatLevel } from '../types';

type Filter = ThreatLevel | 'all';

export const HistoryScreen: React.FC = () => {
  const { scanHistory, clearHistory } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [isExporting, setIsExporting] = useState(false);

  const filteredHistory = useMemo(() => {
    return scanHistory.filter(item => {
      const matchesFilter = filter === 'all' || item.threatLevel === filter;
      const matchesSearch = item.input.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [scanHistory, search, filter]);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const response = await nlpApi.exportHistory(scanHistory.map(item => item.id));
      Alert.alert('Export ready', `Download link: ${response.exportUrl}`);
    } catch (error) {
      Alert.alert('Export failed', 'Please try again later.');
    } finally {
      setIsExporting(false);
    }
  };

  const renderItem = ({ item }: { item: ScanResult }) => (
    <Card style={styles.item} padding={18}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemType}>{item.type.toUpperCase()} scan</Text>
        <Badge value={item.threatLevel} variant={item.threatLevel === 'high' ? 'danger' : item.threatLevel === 'medium' ? 'warning' : 'success'} />
      </View>
      <Text numberOfLines={2} style={styles.itemInput}>{item.input}</Text>
      <View style={styles.itemFooter}>
        <Text style={styles.itemMeta}>{new Date(item.timestamp).toLocaleString()}</Text>
        <Text style={[styles.metaThreat, { color: threatColors[item.threatLevel] }]}>Threats: {item.detectedThreats}</Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Input
          placeholder="Search history"
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.filterRow}>
          {(['all', 'low', 'medium', 'high'] as Filter[]).map(item => (
            <Button
              key={item}
              label={item.toUpperCase()}
              variant={filter === item ? 'primary' : 'secondary'}
              onPress={() => setFilter(item)}
              style={styles.filterButton}
            />
          ))}
        </View>
      </View>

      <FlatList
        data={filteredHistory}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Card padding={24}>
            <Text style={styles.emptyTitle}>No scans yet</Text>
            <Text style={styles.emptySubtitle}>Run your first scan to build an audit trail.</Text>
          </Card>
        }
      />

      <View style={styles.footerActions}>
        <Button label="Export" onPress={handleExport} loading={isExporting} style={styles.exportButton} />
        <Button label="Clear history" onPress={clearHistory} variant="ghost" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: palette.neutral100
  },
  controls: {
    marginBottom: 16
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4
  },
  listContent: {
    paddingBottom: 120
  },
  item: {
    marginBottom: 16
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  itemType: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.neutral700
  },
  itemInput: {
    fontSize: 15,
    color: palette.neutral900,
    marginBottom: 14
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemMeta: {
    fontSize: 12,
    color: palette.neutral500
  },
  metaThreat: {
    fontSize: 12,
    fontWeight: '700'
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: palette.neutral800
  },
  emptySubtitle: {
    fontSize: 14,
    color: palette.neutral500
  },
  footerActions: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20
  },
  exportButton: {
    marginBottom: 12
  }
});

export default HistoryScreen;
