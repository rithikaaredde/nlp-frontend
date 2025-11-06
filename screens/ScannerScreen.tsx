import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SegmentedControl } from '../components/SegmentedControl';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { nlpApi } from '../services/nlpApi';
import { useApp } from '../context/AppContext';
import { palette, threatColors } from '../theme/colors';

type ScanType = 'text' | 'url' | 'file';

export const ScannerScreen: React.FC = () => {
  const { addScanResult } = useApp();
  const [scanType, setScanType] = useState<ScanType>('text');
  const [input, setInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [resultThreat, setResultThreat] = useState<string | null>(null);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isScanning) {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: 2200,
        useNativeDriver: false
      }).start();
    }
  }, [isScanning, progress]);

  const handleScan = async () => {
    if (!input) {
      Alert.alert('Input required', 'Provide content to scan.');
      return;
    }
    try {
      setIsScanning(true);
      const result = await nlpApi.submitScan({ input, type: scanType });
      addScanResult(result);
      setResultThreat(result.threatLevel);
      Alert.alert('Scan complete', `Threat level: ${result.threatLevel.toUpperCase()}`);
    } catch (error) {
      Alert.alert('Scan failed', 'Unable to complete scan. Try again later.');
    } finally {
      setIsScanning(false);
    }
  };

  const percentage = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.title}>Intelligent Scanner</Text>

      <SegmentedControl
        value={scanType}
        onChange={value => {
          setScanType(value);
          setInput('');
        }}
        options={[
          { label: 'Text', value: 'text' },
          { label: 'URL', value: 'url' },
          { label: 'File', value: 'file' }
        ]}
      />

      <Card style={styles.card}>
        <Input
          placeholder={
            scanType === 'text'
              ? 'Paste text snippet here'
              : scanType === 'url'
                ? 'https://'
                : 'Tap to simulate secure file selection'
          }
          value={input}
          onChangeText={setInput}
          multiline={scanType === 'text'}
          numberOfLines={scanType === 'text' ? 6 : 2}
          style={styles.input}
        />
        <Button
          label={isScanning ? 'Scanning…' : 'Start scan'}
          onPress={handleScan}
          loading={isScanning}
        />
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressBar, { width: percentage }]} />
        </View>
      </Card>

      {resultThreat ? (
        <Card style={styles.resultCard}>
          <Text style={styles.resultLabel}>Last scan</Text>
          <Text style={[styles.resultThreat, { color: threatColors[resultThreat as keyof typeof threatColors] }]}>
            {resultThreat.toUpperCase()}
          </Text>
          <Text style={styles.resultMeta}>Result stored in history for auditing.</Text>
        </Card>
      ) : null}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: palette.neutral100
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: palette.neutral900
  },
  card: {
    marginTop: 24
  },
  input: {
    marginBottom: 24
  },
  progressTrack: {
    marginTop: 18,
    height: 8,
    borderRadius: 999,
    backgroundColor: palette.neutral200,
    overflow: 'hidden'
  },
  progressBar: {
    height: 8,
    backgroundColor: palette.sky
  },
  resultCard: {
    marginTop: 28,
    alignItems: 'flex-start'
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.neutral500
  },
  resultThreat: {
    fontSize: 32,
    fontWeight: '700',
    marginVertical: 12
  },
  resultMeta: {
    fontSize: 14,
    color: palette.neutral500
  }
});

export default ScannerScreen;
