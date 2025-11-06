import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlertItem, ScanResult, ThreatLevel, UserPreferences } from '../types';
import { nlpApi } from '../services/nlpApi';

const STORAGE_KEYS = {
  token: '@threatScanner/token',
  onboarding: '@threatScanner/onboardingComplete',
  preferences: '@threatScanner/preferences'
};

interface AppContextValue {
  isLoading: boolean;
  isSignedIn: boolean;
  hasCompletedOnboarding: boolean;
  threatLevel: ThreatLevel;
  alerts: AlertItem[];
  scanHistory: ScanResult[];
  unreadAlertCount: number;
  preferences: UserPreferences;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  refreshAlerts: () => Promise<void>;
  addScanResult: (result: ScanResult) => void;
  updateThreatLevel: (level: ThreatLevel) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
  dismissAlert: (id: string) => void;
  clearHistory: () => void;
}

const defaultPreferences: UserPreferences = {
  biometricAuth: false,
  notificationsEnabled: true,
  automaticUpdates: true,
  darkMode: false
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>('low');
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const [token, onboarding, storedPrefs] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.token),
          AsyncStorage.getItem(STORAGE_KEYS.onboarding),
          AsyncStorage.getItem(STORAGE_KEYS.preferences)
        ]);

        if (token) {
          setIsSignedIn(true);
        }

        if (onboarding === 'true') {
          setHasCompletedOnboarding(true);
        }

        if (storedPrefs) {
          setPreferences({ ...defaultPreferences, ...JSON.parse(storedPrefs) });
        }

        await refreshAlerts();
      } catch (error) {
        console.warn('Failed to bootstrap state', error);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { token } = await nlpApi.login(email, password);
      await AsyncStorage.setItem(STORAGE_KEYS.token, token);
      setIsSignedIn(true);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    setIsSignedIn(false);
    setHasCompletedOnboarding(false);
    setScanHistory([]);
    setAlerts([]);
    setThreatLevel('low');
    setPreferences(defaultPreferences);
  };

  const completeOnboarding = async () => {
    setHasCompletedOnboarding(true);
    await AsyncStorage.setItem(STORAGE_KEYS.onboarding, 'true');
  };

  const refreshAlerts = async () => {
    try {
      const incoming = await nlpApi.fetchAlerts();
      setAlerts(incoming.map(alert => ({ ...alert, acknowledged: false })));
    } catch (error) {
      console.warn('Failed to fetch alerts', error);
    }
  };

  const addScanResult = (result: ScanResult) => {
    setScanHistory(prev => [result, ...prev]);
    setThreatLevel(result.threatLevel);
  };

  const updateThreatLevel = (level: ThreatLevel) => {
    setThreatLevel(level);
  };

  const updatePreferences = async (prefs: Partial<UserPreferences>) => {
    const merged = { ...preferences, ...prefs };
    setPreferences(merged);
    await AsyncStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(merged));
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => (alert.id === id ? { ...alert, acknowledged: true } : alert)));
  };

  const clearHistory = () => {
    setScanHistory([]);
  };

  const unreadAlertCount = useMemo(
    () => alerts.filter(alert => !alert.acknowledged).length,
    [alerts]
  );

  const value = useMemo(
    () => ({
      isLoading,
      isSignedIn,
      hasCompletedOnboarding,
      threatLevel,
      alerts,
      scanHistory,
      unreadAlertCount,
      preferences,
      signIn,
      signOut,
      completeOnboarding,
      refreshAlerts,
      addScanResult,
      updateThreatLevel,
      updatePreferences,
      dismissAlert,
      clearHistory
    }),
    [
      isLoading,
      isSignedIn,
      hasCompletedOnboarding,
      threatLevel,
      alerts,
      scanHistory,
      unreadAlertCount,
      preferences
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
