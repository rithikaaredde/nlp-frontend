export type ThreatLevel = 'low' | 'medium' | 'high';

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: ThreatLevel;
  timestamp: string;
  acknowledged?: boolean;
}

export interface ScanResult {
  id: string;
  type: 'text' | 'url' | 'file';
  input: string;
  detectedThreats: number;
  threatLevel: ThreatLevel;
  timestamp: string;
}

export interface UserPreferences {
  biometricAuth: boolean;
  notificationsEnabled: boolean;
  automaticUpdates: boolean;
  darkMode: boolean;
}
