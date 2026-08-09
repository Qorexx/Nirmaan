export type PageRoute =
  | 'landing'
  | 'architecture'
  | 'command-center'
  | 'projects'
  | 'workspace'
  | 'mission-control'
  | 'treasury'
  | 'explorer'
  | 'analytics'
  | 'compliance'
  | 'settings';

export type StageId =
  | 'proof-submitted'
  | 'ai-processing'
  | 'vision-verify'
  | 'gps-validation'
  | 'confidence-score'
  | 'http-402-request'
  | 'wallet-auth'
  | 'payment-settled'
  | 'contract-exec'
  | 'escrow-release'
  | 'tx-confirmed'
  | 'audit-record'
  | 'proof-submission'
  | 'verification'
  | 'x402-payment'
  | 'blockchain-settlement'
  | 'analytics-reporting';

export interface WorkflowStage {
  id: StageId;
  stageNumber: number;
  name: string;
  icon: string;
  layer: 'contractor' | 'ai' | 'verify' | 'x402' | 'chain' | 'db';
  status: 'pending' | 'active' | 'completed' | 'error';
  subtitle: string;
  details: string[];
  kpiMetric?: string;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  stage: StageId;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'x402' | 'chain';
  txHash?: string;
  confidence?: number;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  category: 'Highway' | 'Solar Grid' | 'Bridge Resurfacing' | 'Water Canal';
  contractor: string;
  budget: number;
  lockedAmount: number;
  releasedAmount: number;
  status: 'LOCKED' | 'IN_REVIEW' | 'VERIFIED_PAID' | 'UNLOCKED' | 'FROZEN';
  aiScore?: number;
  txHash?: string;
  gpsCoords: { lat: number; lng: number };
  beforeImageUrl: string;
  afterImageUrl: string;
  completionPercentage: number;
  lastUpdated: string;
}

export interface ExternalService {
  name: string;
  status: 'Operational' | 'Latency' | 'Offline';
  pingMs: number;
  type: 'AI' | 'Satellite' | 'Payment' | 'Blockchain';
  endpoint: string;
}

export interface TreasuryMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subValue: string;
}
