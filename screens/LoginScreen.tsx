import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { palette } from '../theme/colors';
import { useApp } from '../context/AppContext';

export const LoginScreen: React.FC = () => {
  const { signIn, isLoading, updatePreferences, preferences } = useApp();
  const [email, setEmail] = useState('analyst@cydefense.io');
  const [password, setPassword] = useState('');
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    LocalAuthentication.hasHardwareAsync().then(supported => setBiometricSupported(supported));
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing credentials', 'Please provide both email and password to continue.');
      return;
    }
    setAttempted(true);
    await signIn(email, password);
  };

  const handleBiometric = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to sign in'
      });
      if (result.success) {
        await signIn(email, password || 'biometric-placeholder');
        await updatePreferences({ biometricAuth: true });
      }
    } catch (error) {
      Alert.alert('Biometric authentication failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to continue scanning and monitoring threats.</Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Work Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="name@company.com"
          helperText="Single sign-on available for enterprise tenants."
        />

        <Input
          label="Password"
          secure
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          style={styles.password}
          helperText={attempted && !password ? 'Password is required.' : undefined}
        />

        <Button
          label="Sign In"
          onPress={handleSignIn}
          loading={isLoading}
          style={styles.primaryButton}
        />

        {biometricSupported ? (
          <Button
            label={preferences.biometricAuth ? 'Use Face/Touch ID' : 'Enable Biometric Login'}
            onPress={handleBiometric}
            variant="ghost"
            style={styles.biometricButton}
          />
        ) : null}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© {new Date().getFullYear()} CyDefense Labs</Text>
        <Text style={styles.footerTextMuted}>Secure. Intelligent. Always on.</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.midnight,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 24
  },
  header: {
    marginBottom: 48
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 22
  },
  form: {
    flex: 1
  },
  password: {
    marginTop: 24,
    marginBottom: 32
  },
  primaryButton: {
    marginBottom: 16
  },
  biometricButton: {
    borderColor: 'rgba(255,255,255,0.3)'
  },
  footer: {
    alignItems: 'center'
  },
  footerText: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600'
  },
  footerTextMuted: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.5)'
  }
});

export default LoginScreen;
