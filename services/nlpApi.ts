import { ScanResult, ThreatLevel } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface ScanPayload {
  input: string;
  type: 'text' | 'url' | 'file';
}

const mockThreatLevel = (): ThreatLevel => {
  const roll = Math.random();
  if (roll > 0.7) return 'high';
  if (roll > 0.4) return 'medium';
  return 'low';
};

export const nlpApi = {
  async login(email: string, password: string) {
    await delay(800);
    return {
      token: 'mock-token',
      user: {
        id: 'user-123',
        email,
        name: 'Security Analyst'
      }
    };
  },

  async submitScan(payload: ScanPayload): Promise<ScanResult> {
    await delay(1200);
    const threatLevel = mockThreatLevel();
    const detectedThreats = threatLevel === 'high' ? 3 : threatLevel === 'medium' ? 1 : 0;

    return {
      id: `scan-${Date.now()}`,
      type: payload.type,
      input: payload.input,
      detectedThreats,
      threatLevel,
      timestamp: new Date().toISOString()
    };
  },

  async fetchAlerts() {
    await delay(600);
    return [
      {
        id: 'alert-1',
        title: 'Suspicious URL Detected',
        description: 'Incoming phishing attempt flagged by automated heuristics.',
        severity: 'high',
        timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString()
      },
      {
        id: 'alert-2',
        title: 'Document Scan Pending Review',
        description: 'Manual review recommended for newly submitted policy document.',
        severity: 'medium',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString()
      }
    ] as const;
  },

  async exportHistory(scanIds: string[]) {
    await delay(500);
    return {
      status: 'success',
      exportUrl: 'https://files.example.com/export/scans.csv',
      count: scanIds.length
    };
  }
};
