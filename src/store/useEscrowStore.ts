import { create } from 'zustand';
import { PageRoute, WorkflowStage, TerminalLog, Project, ExternalService, StageId } from '../types';
import confetti from 'canvas-confetti';
import dayjs from 'dayjs';

export type ThemeMode = 'light' | 'system' | 'dark';

export interface AuthUser {
  name: string;
  role: string;
  address: string;
  avatarInitials: string;
  department: string;
  isAuthenticated: boolean;
}

interface EscrowState {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  
  // Enterprise User Authentication & Persona State
  currentUser: AuthUser;
  loginUser: (user: Partial<AuthUser>) => void;
  logoutUser: () => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;

  // Theme & Presentation State
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isPresentationMode: boolean;
  setPresentationMode: (active: boolean) => void;

  // Simulation & Live Demo State
  isSimulating: boolean;
  currentStageIdx: number;
  stages: WorkflowStage[];
  logs: TerminalLog[];
  activeDemoProject: Project | null;
  
  // Global Treasury & OS Metrics
  totalProtectedValue: number;
  activeProjectsCount: number;
  aiAccuracyRate: number;
  autonomousDecisionsCount: number;
  manualInterventions: number;
  
  // Data lists
  projects: Project[];
  externalServices: ExternalService[];
  
  // Actions
  runLiveSimulation: (customProject?: Project) => void;
  resetSimulation: () => void;
  toggleFreezeProject: (projectId: string) => void;
  overrideDecision: (projectId: string, manualApprove: boolean) => void;
  addTerminalLog: (log: Omit<TerminalLog, 'id' | 'timestamp'>) => void;
}

const INITIAL_USER: AuthUser = {
  name: 'Dr. Aravind V.',
  role: 'Gov Chief Arbiter & Ministry Auditor',
  address: '0x9a4F...3B9c',
  avatarInitials: 'GV',
  department: 'Ministry of Road Transport & Highways (MoRTH)',
  isAuthenticated: true,
};

const INITIAL_STAGES: WorkflowStage[] = [
  { id: 'proof-submitted', stageNumber: 1, name: 'Proof Submitted', icon: '📤', layer: 'contractor', status: 'pending', subtitle: 'Contractor Workspace', details: ['Images & Video Ingested', 'Document Hash Stamped'], kpiMetric: '📦 Payload Locked' },
  { id: 'ai-processing', stageNumber: 2, name: 'Multi-Modal AI Processing', icon: '🤖', layer: 'ai', status: 'pending', subtitle: 'AI Engine', details: ['Noise Removal', 'Perspective Correction'], kpiMetric: '⚡ 42ms' },
  { id: 'vision-verify', stageNumber: 3, name: 'Vision Verification', icon: '👁️', layer: 'verify', status: 'pending', subtitle: 'Computer Vision', details: ['Material Analysis', 'Structural Integrity'], kpiMetric: '👁️ Scanned' },
  { id: 'gps-validation', stageNumber: 4, name: 'Satellite/GPS Validation', icon: '🛰️', layer: 'verify', status: 'pending', subtitle: 'Geo-Sync', details: ['ISRO Radar Cross-Check', 'Boundary Confirmed'], kpiMetric: '🛰️ Matched' },
  { id: 'confidence-score', stageNumber: 5, name: 'Confidence Score Calculated', icon: '🎯', layer: 'verify', status: 'pending', subtitle: 'Decision Matrix', details: ['Score > 90% Required', 'AI Attestation Signed'], kpiMetric: '🎯 98.4%' },
  { id: 'http-402-request', stageNumber: 6, name: 'HTTP 402 Requested', icon: '⚡', layer: 'x402', status: 'pending', subtitle: 'Macaroon Challenge', details: ['L402 Invoice Generated', 'Fee: $0.05 USDC'], kpiMetric: '⚡ Invoice' },
  { id: 'wallet-auth', stageNumber: 7, name: 'Wallet Authorized', icon: '🔐', layer: 'x402', status: 'pending', subtitle: 'Machine Wallet', details: ['Signature Validated', 'Funds Reserved'], kpiMetric: '🔐 Auth' },
  { id: 'payment-settled', stageNumber: 8, name: 'Payment Settled', icon: '💸', layer: 'chain', status: 'pending', subtitle: 'Gas Paid', details: ['L402 Preimage Revealed', 'Verification Gas Settled'], kpiMetric: '💸 84ms' },
  { id: 'contract-exec', stageNumber: 9, name: 'Smart Contract Executed', icon: '⚙️', layer: 'chain', status: 'pending', subtitle: 'L1 Blockchain', details: ['Trigger Escrow Condition', 'Tx Sent to Mempool'], kpiMetric: '⚙️ Executing' },
  { id: 'escrow-release', stageNumber: 10, name: 'Escrow Released', icon: '🔓', layer: 'chain', status: 'pending', subtitle: 'Treasury Vault', details: ['Reserves Unlocked', 'Disseminating Funds'], kpiMetric: '🔓 Released' },
  { id: 'tx-confirmed', stageNumber: 11, name: 'Transaction Confirmed', icon: '⛓️', layer: 'db', status: 'pending', subtitle: 'Ledger', details: ['Tx Hash Finalized', 'State: UNLOCKED'], kpiMetric: '⛓️ Finality' },
  { id: 'audit-record', stageNumber: 12, name: 'Audit Record Generated', icon: '📊', layer: 'db', status: 'pending', subtitle: 'Compliance', details: ['Immutable Record Archived', 'Anti-Corruption Logged'], kpiMetric: '📊 Immutable' }
];

const MOCK_PROJECTS: Project[] = [
  {
    id: 'PROJ-9182',
    name: 'NH-44 Highway Expansion & Sector 9 Culvert',
    contractor: 'L&T Infra Solutions',
    location: 'Sector 9, Pune-Mumbai Expressway Hub',
    category: 'Highway',
    budget: 14200000,
    lockedAmount: 14200000,
    releasedAmount: 0,
    aiScore: 98.4,
    status: 'LOCKED',
    beforeImageUrl: '/images/demo/before_road.png',
    afterImageUrl: '/images/demo/after_road.png',
    gpsCoords: { lat: 18.5204, lng: 73.8567 },
    completionPercentage: 85,
    lastUpdated: dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 'PROJ-7104',
    name: 'SunGrid Phase II Micro-Power Junctions',
    contractor: 'Tata Power Solar Systems',
    location: 'Ahmedabad Solar Field Section 4',
    category: 'Solar Grid',
    budget: 33200000,
    lockedAmount: 21800000,
    releasedAmount: 11400000,
    aiScore: 99.1,
    status: 'UNLOCKED',
    beforeImageUrl: '/images/demo/before_solar.png',
    afterImageUrl: '/images/demo/after_solar.png',
    gpsCoords: { lat: 23.0225, lng: 72.5714 },
    completionPercentage: 94,
    lastUpdated: dayjs().subtract(14, 'minute').format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 'PROJ-4481',
    name: 'Metro Line 4 Elevated Station Pillars',
    contractor: 'AFCON-DMR Construction',
    location: 'Bangalore Electronic City Corridor',
    category: 'Bridge Resurfacing',
    budget: 62500000,
    lockedAmount: 44000000,
    releasedAmount: 18500000,
    aiScore: 97.8,
    status: 'LOCKED',
    beforeImageUrl: '/images/demo/before_bridge.png',
    afterImageUrl: '/images/demo/after_bridge.png',
    gpsCoords: { lat: 12.9716, lng: 77.5946 },
    completionPercentage: 72,
    lastUpdated: dayjs().subtract(45, 'minute').format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 'PROJ-3192',
    name: 'Southern Coastal Seawall Reinforcement',
    contractor: 'Shapoorji Pallonji Co.',
    location: 'Chennai Southern Shoreline Sector 12',
    category: 'Water Canal',
    budget: 27600000,
    lockedAmount: 18400000,
    releasedAmount: 9200000,
    aiScore: 96.5,
    status: 'LOCKED',
    beforeImageUrl: '/images/demo/before_coastal.png',
    afterImageUrl: '/images/demo/after_coastal.png',
    gpsCoords: { lat: 13.0827, lng: 80.2707 },
    completionPercentage: 68,
    lastUpdated: dayjs().subtract(2, 'hour').format('YYYY-MM-DD HH:mm:ss')
  }
];

const MOCK_SERVICES: ExternalService[] = [
  { name: 'Sovereign L1 Validator Node #402', status: 'Operational', pingMs: 12, type: 'Blockchain', endpoint: 'https://rpc.sih.gov.in/v1' },
  { name: 'Palantir Gotham Spatial AI GIS', status: 'Operational', pingMs: 42, type: 'AI', endpoint: 'https://ai.morth.gov.in/infer' },
  { name: 'L402 Macaroon Gas Gateway (USDC)', status: 'Operational', pingMs: 18, type: 'Payment', endpoint: 'https://x402.gateway.org/pay' },
  { name: 'ISRO RISAT-2A Satellite Radar Sync', status: 'Operational', pingMs: 104, type: 'Satellite', endpoint: 'https://risat.isro.gov.in/sync' }
];

export const useEscrowStore = create<EscrowState>((set, get) => ({
  currentPage: 'landing',
  setCurrentPage: (page: PageRoute) => set({ currentPage: page }),
  
  // Theme & Presentation
  theme: (localStorage.getItem('theme-preference') as ThemeMode) || 'system',
  setTheme: (newTheme: ThemeMode) => {
    localStorage.setItem('theme-preference', newTheme);
    set({ theme: newTheme });
    
    // Apply class to documentElement
    const isDark = 
      newTheme === 'dark' || 
      (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  
  isPresentationMode: false,
  setPresentationMode: (active: boolean) => set({ isPresentationMode: active }),
  
  // User & Auth Configuration
  currentUser: INITIAL_USER,
  isLoginModalOpen: false,
  setLoginModalOpen: (open: boolean) => set({ isLoginModalOpen: open }),
  loginUser: (newUser: Partial<AuthUser>) => set((state) => ({
    currentUser: { ...state.currentUser, ...newUser, isAuthenticated: true },
    isLoginModalOpen: false
  })),
  logoutUser: () => set({
    currentUser: {
      name: 'Guest Observer',
      role: 'Public Citizen Inspector',
      address: '0x000...0000',
      avatarInitials: 'GS',
      department: 'Unauthenticated Public Node',
      isAuthenticated: false
    }
  }),

  isSimulating: false,
  currentStageIdx: -1,
  stages: INITIAL_STAGES,
  logs: [
    {
      id: 'init-1',
      timestamp: dayjs().subtract(5, 'minute').format('HH:mm:ss.SSS'),
      stage: 'proof-submission',
      message: 'Autonomous Escrow Daemon initialized on SIH Sovereign L1 Consensus (#402). Status: OPTIMIZED ($0.05 USDC).',
      type: 'info'
    },
    {
      id: 'init-2',
      timestamp: dayjs().subtract(2, 'minute').format('HH:mm:ss.SSS'),
      stage: 'ai-processing',
      message: 'Connected to Palantir Gotham Telemetry stream. LiDAR + Infrared + EXIF defense active.',
      type: 'success',
      confidence: 99.4
    }
  ],
  activeDemoProject: MOCK_PROJECTS[0],
  
  totalProtectedValue: 965800000,
  activeProjectsCount: 240,
  aiAccuracyRate: 99.4,
  autonomousDecisionsCount: 2182,
  manualInterventions: 0,
  
  projects: MOCK_PROJECTS,
  externalServices: MOCK_SERVICES,
  
  addTerminalLog: (newLog) => set((state) => ({
    logs: [
      {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: dayjs().format('HH:mm:ss.SSS'),
        ...newLog,
      },
      ...state.logs
    ].slice(0, 100)
  })),
  
  resetSimulation: () => set({
    isSimulating: false,
    currentStageIdx: -1,
    stages: INITIAL_STAGES.map(s => ({ ...s, status: 'pending' })),
    logs: [
      {
        id: `reset-${Date.now()}`,
        timestamp: dayjs().format('HH:mm:ss.SSS'),
        stage: 'proof-submission',
        message: 'Simulation theater reset to idle operational baseline. Ready for new demonstration trigger.',
        type: 'info'
      }
    ]
  }),

  runLiveSimulation: (customProject) => {
    const state = get();
    if (state.isSimulating) return;
    
    const targetProject = customProject || state.activeDemoProject || state.projects[0];
    
    set({
      isSimulating: true,
      currentStageIdx: 0,
      activeDemoProject: targetProject,
      stages: INITIAL_STAGES.map((s, idx) => ({
        ...s,
        status: idx === 0 ? 'active' : 'pending'
      }))
    });

    const advanceStage = (idx: number, logMsg: string, logType: 'info' | 'success' | 'x402' | 'chain', confidence?: number, txHash?: string) => {
      set(s => ({
        currentStageIdx: idx,
        stages: s.stages.map((st, i) => i < idx ? { ...st, status: 'completed' } : i === idx ? { ...st, status: 'active' } : st)
      }));
      get().addTerminalLog({
        stage: INITIAL_STAGES[idx].id,
        message: logMsg,
        type: logType,
        confidence,
        txHash
      });
    };

    get().addTerminalLog({
      stage: 'proof-submitted',
      message: `[INITIATING DEMO] Uploading multi-angle 3D scans & drone imagery for ${targetProject.name}. Contractor: ${targetProject.contractor} (₹${(targetProject.budget / 100000).toFixed(1)} Lakhs).`,
      type: 'info'
    });

    const timers = [
      setTimeout(() => advanceStage(1, 'Running multi-modal AI ingest pipeline (LiDAR + RGB).', 'info'), 800),
      setTimeout(() => advanceStage(2, 'Vision verification: Analyzing structural integrity against engineering blueprints.', 'info'), 1600),
      setTimeout(() => advanceStage(3, 'Geospatial validation: EXIF geotag matching against ISRO radar boundaries.', 'info'), 2400),
      setTimeout(() => advanceStage(4, `Confidence Score Achieved: ${targetProject.aiScore || 98.4}%. Threshold > 90.0% satisfied.`, 'success', targetProject.aiScore || 98.4), 3200),
      setTimeout(() => advanceStage(5, 'HTTP 402 challenge requested from sovereign verification node.', 'x402'), 4000),
      setTimeout(() => advanceStage(6, 'Machine wallet signed and authorized $0.05 USDC payment.', 'info'), 4800),
      setTimeout(() => advanceStage(7, 'x402 verification gas settled via Lightning Macaroon.', 'x402'), 5600),
      setTimeout(() => advanceStage(8, 'Executing L1 Smart Contract for escrow release conditions.', 'chain'), 6400),
      setTimeout(() => advanceStage(9, `Unlocking ₹${((targetProject.lockedAmount || targetProject.budget) / 100000).toFixed(1)} Lakhs from Vault 0x7a8...`, 'chain'), 7200),
      setTimeout(() => advanceStage(10, 'Transaction finality reached. Funds disseminated to contractor.', 'chain', undefined, '0x8f9a2b7c402198e'), 8000),
      setTimeout(() => advanceStage(11, 'Immutable compliance audit record generated in Government Ledger.', 'success'), 8800),

      setTimeout(() => {
        set(s => ({
          isSimulating: false,
          currentStageIdx: 12,
          stages: s.stages.map((st) => ({ ...st, status: 'completed' })),
          totalProtectedValue: s.totalProtectedValue + (targetProject.lockedAmount || targetProject.budget),
          autonomousDecisionsCount: s.autonomousDecisionsCount + 1,
          projects: s.projects.map(p => p.id === targetProject.id ? {
            ...p,
            status: 'UNLOCKED' as const,
            releasedAmount: p.budget,
            lockedAmount: 0,
            lastUpdated: dayjs().format('YYYY-MM-DD HH:mm:ss')
          } : p)
        }));

        get().addTerminalLog({
          stage: 'audit-record',
          message: `🎉 [DEMO COMPLETE] Full 12-step autonomous escrow sequence executed in 9.5s.`,
          type: 'success'
        });

        try {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#06b6d4', '#10b981', '#a855f7', '#6366f1', '#eab308']
          });
        } catch (e) {}
      }, 9500)
    ];
  },

  toggleFreezeProject: (projectId) => {
    set(state => ({
      projects: state.projects.map(p => p.id === projectId ? {
        ...p,
        status: p.status === 'LOCKED' ? 'UNLOCKED' : 'LOCKED'
      } : p)
    }));
  },

  overrideDecision: (projectId, manualApprove) => {
    set(state => ({
      manualInterventions: state.manualInterventions + 1,
      projects: state.projects.map(p => p.id === projectId ? {
        ...p,
        status: manualApprove ? 'UNLOCKED' : 'LOCKED'
      } : p)
    }));
  }
}));
