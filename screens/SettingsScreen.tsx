import React, { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { palette } from '../theme/colors';
import { UserPreferences } from '../types';

export const SettingsScreen: React.FC = () => {
  const { preferences, updatePreferences, signOut } = useApp();
  const [pending, setPending] = useState<UserPreferences>(preferences);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setPending(preferences);
  }, [preferences]);

  const hasChanges = useMemo(
    () => JSON.stringify(pending) !== JSON.stringify(preferences),
    [pending, preferences]
  );

  const handleSave = async () => {
    try {
      setSaving(true);
      await updatePreferences(pending);
      Alert.alert('Preferences updated');
    } finally {
      setSaving(false);
    }
  };

  const toggle = (key: keyof UserPreferences) => (value: boolean) => {
    setPending(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>

      <Card style={styles.section}>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Enable notifications</Text>
            <Text style={styles.subtitle}>Receive push alerts when high-risk items are detected.</Text>
          </View>
          <Switch value={pending.notificationsEnabled} onValueChange={toggle('notificationsEnabled')} />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Biometric login</Text>
            <Text style={styles.subtitle}>Use Face ID or Touch ID for quicker authentication.</Text>
          </View>
          <Switch value={pending.biometricAuth} onValueChange={toggle('biometricAuth')} />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Auto-update intelligence</Text>
            <Text style={styles.subtitle}>Keep threat signatures and models up to date.</Text>
          </View>
          <Switch value={pending.automaticUpdates} onValueChange={toggle('automaticUpdates')} />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Dark mode</Text>
            <Text style={styles.subtitle}>Match system theme for low-light environments.</Text>
          </View>
          <Switch value={pending.darkMode} onValueChange={toggle('darkMode')} />
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.label}>Security Zones</Text>
        <Text style={styles.subtitle}>Configure workspace-level rules and escalation paths.</Text>
        <Button label="Configure" variant="secondary" style={styles.sectionButton} />
      </Card>

      <Button
        label={saving ? 'Saving…' : 'Save preferences'}
        onPress={handleSave}
        disabled={!hasChanges}
        loading={saving}
        style={styles.saveButton}
      />

      <Button
        label="Sign out"
        variant="ghost"
        onPress={signOut}
      />
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
    paddingBottom: 40
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.neutral900,
    marginBottom: 24
  },
  section: {
    marginBottom: 24
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.neutral800
  },
  subtitle: {
    marginTop: 4,
    color: palette.neutral500,
    maxWidth: 220
  },
  divider: {
    height: 1,
    backgroundColor: palette.neutral200,
    marginVertical: 16
  },
  sectionButton: {
    marginTop: 16,
    alignSelf: 'flex-start'
  },
  saveButton: {
    marginBottom: 16
  }
});

export default SettingsScreen;
