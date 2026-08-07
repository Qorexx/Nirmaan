import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { 
  Cpu, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Zap, 
  ExternalLink, 
  ShieldCheck, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Clock, 
  Activity, 
  Layers, 
  Hash, 
  Copy, 
  Check, 
  FileCheck2, 
  Terminal, 
  Server, 
  RefreshCw, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Database, 
  Eye, 
  AlertCircle, 
  TrendingUp, 
  BarChart2, 
  Globe 
} from 'lucide-react';
import { useEscrowStore } from '../store/useEscrowStore';
import { 
  Button, 
  Card, 
  GlassCard, 
  KPICard, 
  Badge, 
  Input, 
  Timeline, 
  Modal, 
  StatCard, 
  AnimatedBorder, 
  NotificationCard,
  Skeleton 
} from '../components/ui';

// ============================================================================
// INTERFACE DEFINITIONS
// ============================================================================
interface BlockchainTransaction {
  id: string;
  hash: string;
  project: string;
  contractor: string;
  contractorWallet: string;
  amount: number;
  gasFee: string;
  timestamp: string;
  status: 'CONFIRMED' | 'SETTLED' | 'PROCESSING' | 'FAILED';
  confirmations: number;
  blockNumber: number;
  method: string;
  nonce: number;
  receiptSig: string;
  eventLog: string;
}

interface LiveBlock {
  blockNumber: number;
  miner: string;
  txCount: number;
  gasUsed: string;
  timeAgo: string;
  reward: string;
}

// ============================================================================
// MOCK ON-CHAIN REGISTRY DATA
// ============================================================================
const initialTransactions: BlockchainTransaction[] = [
  {
    id: 'tx-101',
    hash: '0x8f2a9c4021e902b3c4f928e391aa8920114b301c',
    project: 'NH-44 Expressway Re-surfacing & Bridge',
    contractor: 'L&T Infra Solutions',
    contractorWallet: '0x402a...E819',
    amount: 1450000,
    gasFee: '$0.05 USDC (x402)',
    timestamp: '2 mins ago',
    status: 'SETTLED',
    confirmations: 142,
    blockNumber: 19482904,
    method: 'autoSettleTranche(uint256 trancheId)',
    nonce: 42,
    receiptSig: 'x402-MACAROON-SIG-90a8e31b78219dcc4012019ab',
    eventLog: 'EscrowUnlocked(amount=1450000, recipient=0x402a...E819, confidence=98.4%)'
  },
  {
    id: 'tx-102',
    hash: '0x3c91e4b8022a1048bc0284e311902047291a104c',
    project: 'Solar Grid Micro-Power Junctions',
    contractor: 'Tata Power Solar Systems',
    contractorWallet: '0x819b...C402',
    amount: 820000,
    gasFee: '$0.04 USDC (x402)',
    timestamp: '14 mins ago',
    status: 'CONFIRMED',
    confirmations: 310,
    blockNumber: 19482889,
    method: 'verifyProofAndPay(bytes32 exifHash)',
    nonce: 19,
    receiptSig: 'x402-MACAROON-SIG-148bc88201a004812bc900f12',
    eventLog: 'ProofVerified(aiScore=99.1%, gasSettled=0.04USDC)'
  },
  {
    id: 'tx-103',
    hash: '0x7120ae837bc20149bb892401712bb982049102ca',
    project: 'Metro Line 4 Elevated Station Pillars',
    contractor: 'AFCON-DMR Construction',
    contractorWallet: '0x301e...F910',
    amount: 2150000,
    gasFee: '$0.06 USDC (x402)',
    timestamp: '48 mins ago',
    status: 'SETTLED',
    confirmations: 940,
    blockNumber: 19482810,
    method: 'releaseEscrowTranche(address payable contractor)',
    nonce: 87,
    receiptSig: 'x402-MACAROON-SIG-7721bc901aab9018442220199',
    eventLog: 'EscrowUnlocked(amount=2150000, recipient=0x301e...F910, confidence=97.8%)'
  },
  {
    id: 'tx-104',
    hash: '0x99102cba72018890bc892104ab8839201bc99201',
    project: 'Smart Water IoT Valve Retrofitting',
    contractor: 'Voltas Electro-Mechanics',
    contractorWallet: '0x991b...A120',
    amount: 450000,
    gasFee: '$0.03 USDC (x402)',
    timestamp: '2 hours ago',
    status: 'SETTLED',
    confirmations: 2410,
    blockNumber: 19482650,
    method: 'autoSettleTranche(uint256 trancheId)',
    nonce: 12,
    receiptSig: 'x402-MACAROON-SIG-2019bc900192abbc77112000a',
    eventLog: 'EscrowUnlocked(amount=450000, recipient=0x991b...A120, confidence=99.5%)'
  },
  {
    id: 'tx-105',
    hash: '0x1290ab4810298440bc90184aa8910029bc019924',
    project: 'NH-44 Expressway Sector 9 Culverts',
    contractor: 'L&T Infra Solutions',
    contractorWallet: '0x402a...E819',
    amount: 1100000,
    gasFee: '$0.05 USDC (x402)',
    timestamp: '3 hours ago',
    status: 'PROCESSING',
    confirmations: 6,
    blockNumber: 19482905,
    method: 'verifyProofAndPay(bytes32 exifHash)',
    nonce: 43,
    receiptSig: 'x402-MACAROON-SIG-PENDING-MINING-CONSENSUS',
    eventLog: 'Awaiting Consensus Confirmation (6 / 12 block depth)'
  },
  {
    id: 'tx-106',
    hash: '0x55018cb9010488219ab90218821ab00198c77201',
    project: 'Southern Coastal Seawall Reinforcement',
    contractor: 'Shapoorji Pallonji Co.',
    contractorWallet: '0x501d...B220',
    amount: 3400000,
    gasFee: '$0.08 USDC (x402)',
    timestamp: '5 hours ago',
    status: 'CONFIRMED',
    confirmations: 4890,
    blockNumber: 19482100,
    method: 'releaseEscrowTranche(address payable contractor)',
    nonce: 104,
    receiptSig: 'x402-MACAROON-SIG-8876aabc0102030099182bb3',
    eventLog: 'EscrowUnlocked(amount=3400000, recipient=0x501d...B220, confidence=96.5%)'
  },
  {
    id: 'tx-107',
    hash: '0x44210ab8901239921c8872a001928bc900199201',
    project: 'Airport Terminal 3 Runway Resurfacing',
    contractor: 'GMR Aviation Infra Pvt',
    contractorWallet: '0x711c...E901',
    amount: 6200000,
    gasFee: '$0.12 USDC (x402)',
    timestamp: '8 hours ago',
    status: 'SETTLED',
    confirmations: 8200,
    blockNumber: 19481500,
    method: 'autoSettleTranche(uint256 trancheId)',
    nonce: 312,
    receiptSig: 'x402-MACAROON-SIG-6651ab90183bb90218bc00918',
    eventLog: 'EscrowUnlocked(amount=6200000, recipient=0x711c...E901, confidence=98.9%)'
  }
];

const initialLiveBlocks: LiveBlock[] = [
  { blockNumber: 19482904, miner: 'Validator-NHAI-Gov-01', txCount: 18, gasUsed: '1,420,109 Gwei', timeAgo: '4s ago', reward: '$0.14 USDC' },
  { blockNumber: 19482903, miner: 'Validator-Ministry-04', txCount: 24, gasUsed: '2,110,880 Gwei', timeAgo: '12s ago', reward: '$0.19 USDC' },
  { blockNumber: 19482902, miner: 'Validator-SIH-Master', txCount: 9, gasUsed: '984,200 Gwei', timeAgo: '20s ago', reward: '$0.08 USDC' },
  { blockNumber: 19482901, miner: 'Validator-NHAI-Gov-01', txCount: 31, gasUsed: '3,410,000 Gwei', timeAgo: '28s ago', reward: '$0.28 USDC' },
];

const latencyChartData = [
  { time: '10:00', latency: 89, tps: 1140, settled: 14.5 },
  { time: '10:30', latency: 82, tps: 1280, settled: 22.1 },
  { time: '11:00', latency: 95, tps: 1090, settled: 18.0 },
  { time: '11:30', latency: 78, tps: 1410, settled: 28.4 },
  { time: '12:00', latency: 84, tps: 1350, settled: 31.0 },
  { time: '12:30', latency: 81, tps: 1490, settled: 38.2 },
  { time: '13:00 (LIVE)', latency: 84, tps: 1420, settled: 44.18 }
];

export const TrustExplorerPage: React.FC = () => {
  const { runLiveSimulation } = useEscrowStore();

  // Local interaction states
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>(initialTransactions);
  const [liveBlocks, setLiveBlocks] = useState<LiveBlock[]>(initialLiveBlocks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'latest' | 'amount' | 'confirmations'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTx, setSelectedTx] = useState<BlockchainTransaction | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'registry' | 'timeline' | 'network' | 'audit'>('registry');
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 5;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  // Handle Copy to Clipboard
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Simulate incoming Etherscan block updates every few seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveBlocks((prev) => {
        const nextBlockNum = prev[0].blockNumber + 1;
        const miners = ['Validator-NHAI-Gov-01', 'Validator-Ministry-04', 'Validator-SIH-Master', 'Validator-Gov-Node'];
        const newBlock: LiveBlock = {
          blockNumber: nextBlockNum,
          miner: miners[Math.floor(Math.random() * miners.length)],
          txCount: Math.floor(Math.random() * 25) + 8,
          gasUsed: `${(Math.random() * 2 + 1).toFixed(2)}M Gwei`,
          timeAgo: 'Just now',
          reward: `$0.${Math.floor(Math.random() * 20) + 10} USDC`
        };
        return [newBlock, ...prev.slice(0, 3)].map((b, i) => i === 1 ? { ...b, timeAgo: '8s ago' } : i === 2 ? { ...b, timeAgo: '16s ago' } : i === 3 ? { ...b, timeAgo: '24s ago' } : b);
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Filtered and Sorted transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = 
        tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.contractor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.contractorWallet.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'ALL' || tx.status === statusFilter;

      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'confirmations') return b.confirmations - a.confirmations;
      return 0; // retain chronological order for latest
    });
  }, [transactions, searchQuery, statusFilter, sortBy]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Helper type for timeline status
  type StatusType = 'completed' | 'pending' | 'active';

  // Blockchain 7-stage cryptographic audit timeline
  const blockchainTimelineSteps = [
    { id: 'b1', timestamp: 'Block #19,482,900', title: '1. Multi-Modal Proof Uploaded & Encrypted', description: 'LiDAR drone feeds and EXIF GPS coordinates hashed via SHA-256 client encryption.', status: 'completed' as StatusType, meta: 'HASH STORED' },
    { id: 'b2', timestamp: 'Block #19,482,901', title: '2. Autonomous AI Verification Passed', description: 'Computer vision evaluates structural crack density at 98.4% accuracy (Threshold > 90%).', status: 'completed' as StatusType, meta: 'AI CONFIRMED' },
    { id: 'b3', timestamp: 'Block #19,482,902', title: '3. HTTP 402 Macaroon Gas Fee Settled', description: 'Machine-to-machine wallet presents L402 challenge proof. $0.05 USDC verification fee paid.', status: 'completed' as StatusType, meta: 'x402 GAS CLEARED' },
    { id: 'b4', timestamp: 'Block #19,482,903', title: '4. Sovereign Smart Contract Executed', description: 'Function releaseEscrowTranche(address payable contractor) triggered directly by AI engine.', status: 'completed' as StatusType, meta: 'METHOD INVOKED' },
    { id: 'b5', timestamp: 'Block #19,482,904', title: '5. Mined & Confirmed in Consensus Block', description: 'Mined by Validator-NHAI-Gov-01 with zero admin pause intervention or banking holds.', status: 'completed' as StatusType, meta: '128 CONFS' },
    { id: 'b6', timestamp: 'Block #19,482,904', title: '6. ₹14,50,000 Escrow Liquidity Released', description: 'Instantaneous direct transfer from Sovereign Vault 0x7a8...E391 to contractor banking account.', status: 'completed' as StatusType, meta: 'FUNDS TRANSFERRED' },
    { id: 'b7', timestamp: 'Registry Immutable Sync', title: '7. Audit Receipt & Digital Certificate Stamped', description: 'Cryptographic receipt permanently stored in Ministry of Road Transport oversight ledger.', status: 'completed' as StatusType, meta: 'AUDIT STAMPED' },
  ];

  return (
    <div className="space-y-10 font-mono pb-24 text-primary max-w-[1750px] mx-auto">

      {/* ========================================================================= */}
      {/* 1. ETHERSCAN x STRIPE x PALANTIR HERO DECK */}
      {/* ========================================================================= */}
      <GlassCard intensity="high" className="relative overflow-hidden border-2 border-yellow-500/40 shadow-[0_0_80px_rgba(234,179,8,0.15)] bg-gradient-to-r from-[#12100A] via-[#101420] to-[#0A0D18]">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="amber" icon={<Layers className="w-3.5 h-3.5 text-yellow-400" />}>
                ⛓️ SOVEREIGN BLOCKCHAIN EXPLORER // CHAIN ID #402
              </Badge>
              <span className="text-[11px] font-mono text-accent-emerald font-extrabold bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                NETWORK: SIH SOVEREIGN LAYER-1 (1,420 TPS)
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-primary font-heading tracking-tight leading-tight">
              Sovereign Trust Ledger & x402 Macaroon Registry
            </h1>

            <p className="text-xs sm:text-sm text-primary font-mono leading-relaxed">
              Real-time architectural proof engine displaying immutable Etherscan-grade cryptographic receipts, machine-to-machine HTTP 402 gas executions, and instantaneous zero-human-hold smart vault settlements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <div className="px-5 py-3 rounded-2xl bg-surface border-2 border-yellow-500/40 text-center sm:text-right shadow-2xl w-full sm:w-auto">
              <span className="text-[10px] text-secondary uppercase font-bold block">On-Chain Settlement Latency</span>
              <span className="text-3xl font-black text-yellow-400 font-heading tracking-tight">84 <span className="text-xs font-mono text-primary">ms</span></span>
            </div>
            <Button
              variant="x402"
              size="lg"
              onClick={() => runLiveSimulation()}
              icon={<Zap className="w-5 h-5 fill-current animate-bounce" />}
              className="w-full sm:w-auto shadow-2xl font-heading font-black tracking-wider px-6 py-4"
            >
              ▶ Test On-Chain Payout
            </Button>
          </div>
        </div>

        {/* Ambient background glows */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      </GlassCard>

      {/* ========================================================================= */}
      {/* 2. OVERVIEW KPI METRICS (STRIPE / ETHERSCAN STYLE) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total Transactions"
          value="1,482 Txns"
          change="+24 today"
          isPositive={true}
          subValue="100% On-chain finality"
          icon={<Hash className="w-4 h-4 text-cyan-400" />}
          glowColor="cyan"
        />
        <KPICard
          title="Locked Escrow Vaults"
          value="₹52.40 Cr"
          change="0x7a8...E391"
          isPositive={true}
          subValue="Zero admin pause backdoors"
          icon={<Lock className="w-4 h-4 text-amber-400" />}
          glowColor="amber"
        />
        <KPICard
          title="Released to Contractors"
          value="₹44.18 Cr"
          change="84.3% Cleared"
          isPositive={true}
          subValue="Zero human bureaucracy delay"
          icon={<Unlock className="w-4 h-4 text-emerald-400" />}
          glowColor="emerald"
        />
        <KPICard
          title="Pending AI Contracts"
          value="12 Tranches"
          change="Tranche 3 Active"
          isPositive={true}
          subValue="Awaiting EXIF proof submission"
          icon={<Clock className="w-4 h-4 text-blue-400" />}
          glowColor="cyan"
        />
        <KPICard
          title="Average Latency"
          value="84 ms"
          change="Sub-100ms SIH Spec"
          isPositive={true}
          subValue="x402 protocol execution"
          icon={<Activity className="w-4 h-4 text-yellow-400" />}
          glowColor="amber"
        />
        <KPICard
          title="Today's Settled Volume"
          value="₹2.40 Cr"
          change="4 Corridors"
          isPositive={true}
          subValue="142 block confirmations avg"
          icon={<TrendingUp className="w-4 h-4 text-purple-400" />}
          glowColor="purple"
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE TAB SELECTOR */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface p-2.5 rounded-2xl border border-subtle shadow-xl">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {[
            { id: 'registry' as const, label: '🔍 Transaction Registry Table', badge: '7 TXNS' },
            { id: 'timeline' as const, label: '⏱️ 7-Stage Cryptographic Timeline', badge: 'VERIFIED' },
            { id: 'network' as const, label: '📈 Network Health & Live Blocks', badge: '1,420 TPS' },
            { id: 'audit' as const, label: '🏛️ Audit Compliance Export Hub', badge: 'SIH READY' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap select-none ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-accent-gold border-2 border-yellow-400 font-extrabold shadow-[0_0_25px_rgba(234,179,8,0.35)]'
                  : 'text-secondary hover:text-primary hover:bg-surface-secondary border border-transparent'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                activeTab === tab.id ? 'bg-yellow-400 text-slate-950 font-black' : 'bg-surface-secondary text-primary font-bold'
              }`}>
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-primary px-4 py-1.5 bg-surface-secondary rounded-xl border border-subtle">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          <span>Latest Mined Block: <strong className="text-accent-gold">#{liveBlocks[0].blockNumber}</strong></span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TRANSACTION TABLE (ETHERSCAN x STRIPE) & SMART CONTRACT INSPECTOR */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait">
        {activeTab === 'registry' && (
          <motion.div
            key="tab-registry"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* LEFT 2 COLS: SEARCH, FILTER, AND MASTER TABLE */}
            <div className="xl:col-span-2 space-y-4">
              <Card className="p-6 border border-yellow-500/40 bg-surface shadow-2xl space-y-6">
                
                {/* Search and Filters Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-subtle pb-5">
                  <div className="w-full sm:max-w-md relative">
                    <Input
                      placeholder="Search Txn Hash, Project, Contractor Wallet..."
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                      leftIcon={<Search className="w-4 h-4 text-yellow-400" />}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                    <div className="flex items-center gap-1.5 bg-surface-secondary p-1 rounded-xl border border-subtle text-xs">
                      {['ALL', 'SETTLED', 'CONFIRMED', 'PROCESSING'].map((status) => (
                        <button
                          key={status}
                          onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                          className={`px-3 py-1 rounded-lg font-bold transition-all ${
                            statusFilter === status
                              ? 'bg-yellow-400 text-slate-950 font-black'
                              : 'text-secondary hover:text-primary'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 bg-surface-secondary px-3 py-1.5 rounded-xl border border-subtle text-xs text-primary">
                      <ArrowUpDown className="w-3.5 h-3.5 text-yellow-400" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'latest' | 'amount' | 'confirmations')}
                        className="bg-transparent text-primary font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="latest" className="bg-surface-secondary text-primary">Sort: Latest Timestamp</option>
                        <option value="amount" className="bg-surface-secondary text-primary">Sort: Highest Escrow Payout</option>
                        <option value="confirmations" className="bg-surface-secondary text-primary">Sort: Most Confirmations</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Etherscan Table View */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-subtle text-secondary uppercase text-[10px]">
                        <th className="py-3 px-3 font-bold">Transaction Hash & Method</th>
                        <th className="py-3 px-3 font-bold">Project // Contractor Wallet</th>
                        <th className="py-3 px-3 font-bold">Escrow Amount // Gas</th>
                        <th className="py-3 px-3 font-bold">Block // Confs</th>
                        <th className="py-3 px-3 font-bold text-right">Status // Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D6D0C4]">
                      {paginatedTransactions.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-secondary font-mono">
                            No blockchain transactions matched your search query "{searchQuery}".
                          </td>
                        </tr>
                      ) : (
                        paginatedTransactions.map((tx) => (
                          <tr
                            key={tx.id}
                            className="hover:bg-yellow-500/5 transition-colors group cursor-pointer"
                            onClick={() => setSelectedTx(tx)}
                          >
                            <td className="py-4 px-3">
                              <div className="flex items-center gap-2">
                                <span className="p-1.5 rounded-lg bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
                                  <Hash className="w-3.5 h-3.5" />
                                </span>
                                <div>
                                  <span className="text-yellow-400 font-bold hover:underline select-all block truncate max-w-[150px] sm:max-w-[180px]">
                                    {tx.hash}
                                  </span>
                                  <span className="text-[10px] text-secondary bg-surface-secondary px-1.5 py-0.5 rounded border border-subtle mt-0.5 inline-block truncate max-w-[170px]">
                                    {tx.method}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-3">
                              <div className="font-heading font-extrabold text-primary text-sm max-w-[200px] truncate">
                                {tx.project}
                              </div>
                              <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                                <span>{tx.contractor} ({tx.contractorWallet})</span>
                              </div>
                            </td>

                            <td className="py-4 px-3">
                              <div className="text-base font-black text-primary font-heading">
                                ₹{(tx.amount / 100000).toFixed(2)} Lakhs
                              </div>
                              <div className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                                <Zap className="w-2.5 h-2.5 fill-current" />
                                <span>Gas: {tx.gasFee}</span>
                              </div>
                            </td>

                            <td className="py-4 px-3">
                              <div className="text-accent-cyan font-extrabold text-xs">
                                #{tx.blockNumber}
                              </div>
                              <div className="text-[10px] text-secondary">
                                {tx.confirmations} confs • {tx.timestamp}
                              </div>
                            </td>

                            <td className="py-4 px-3 text-right">
                              <div className="flex flex-col items-end gap-2">
                                <Badge
                                  variant={tx.status === 'SETTLED' ? 'emerald' : tx.status === 'CONFIRMED' ? 'blue' : 'amber'}
                                  size="sm"
                                >
                                  {tx.status === 'SETTLED' ? '✔ SETTLED' : tx.status === 'CONFIRMED' ? '✔ CONFIRMED' : '⚙ PROCESSING'}
                                </Badge>
                                <span className="text-[10px] text-secondary group-hover:text-accent-gold flex items-center gap-1 underline transition-colors">
                                  Inspect Receipt <Eye className="w-3 h-3" />
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-subtle text-xs">
                  <span className="text-secondary">
                    Showing <strong className="text-primary">{paginatedTransactions.length}</strong> of <strong className="text-primary">{filteredTransactions.length}</strong> cryptographic executions
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      icon={<ChevronLeft className="w-4 h-4" />}
                    >
                      Previous
                    </Button>
                    <span className="px-4 py-1.5 bg-surface-secondary rounded-xl border border-subtle font-bold text-yellow-400">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>

              </Card>
            </div>

            {/* RIGHT 1 COL: SMART CONTRACT INSPECTOR & PALANTIR GOTHAM SPEC DECK */}
            <div className="space-y-6">
              
              {/* Palantir Inspector Box */}
              <Card className="p-6 bg-surface border border-yellow-500/40 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-subtle pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-primary font-heading uppercase tracking-wider flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-yellow-400" />
                      <span>Smart Contract Inspector</span>
                    </h3>
                    <span className="text-xs text-secondary font-mono">Sovereign Escrow Vault Spec</span>
                  </div>
                  <Badge variant="amber" size="sm">SIH LAYER-1</Badge>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {/* Contract Address */}
                  <div className="p-3 rounded-xl bg-surface border border-subtle space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-secondary uppercase font-bold">
                      <span>Contract Address:</span>
                      <button
                        onClick={() => handleCopy('0x7a892b1029384c5021e902b3c4f928e391aa8920', 'contract')}
                        className="text-yellow-400 hover:text-accent-gold flex items-center gap-1 font-bold"
                      >
                        {copiedText === 'contract' ? <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Copied!</span> : <><Copy className="w-3 h-3" /> Copy Address</>}
                      </button>
                    </div>
                    <div className="text-accent-cyan text-xs font-bold font-mono select-all truncate break-all">
                      0x7a892b1029384c5021e902b3c4f928e391aa8920
                    </div>
                  </div>

                  {/* Network Details Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-surface-secondary border border-subtle space-y-1">
                      <span className="text-[10px] text-secondary uppercase font-bold block">Network Architecture:</span>
                      <strong className="text-primary text-xs block font-sans">Sovereign SIH Layer-1</strong>
                      <span className="text-[9px] text-yellow-400 block">Chain ID: #402 (L402)</span>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-secondary border border-subtle space-y-1">
                      <span className="text-[10px] text-secondary uppercase font-bold block">Gas Consumed:</span>
                      <strong className="text-amber-400 font-black text-xs font-mono block">42,109 Gwei</strong>
                      <span className="text-[9px] text-secondary block">$0.05 USDC Avg Fee</span>
                    </div>
                  </div>

                  {/* Contract Operational Status */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 flex items-center gap-3">
                    <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0 animate-pulse" />
                    <div className="space-y-0.5">
                      <span className="text-xs font-black text-primary font-heading block uppercase">
                        ✔ ACTIVE & AUDIT VERIFIED
                      </span>
                      <p className="text-[10px] text-accent-emerald/90 leading-tight">
                        Zero admin pause backdoors. Autonomous execution rights restricted exclusively to verified Gaussian Vision AI signature.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-subtle text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Execution Latency:</span>
                      <strong className="text-yellow-400 font-bold">84 milliseconds</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Governance Owner:</span>
                      <span className="text-accent-cyan font-bold">NHAI Council (0xGOV...9901)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Security Compiler:</span>
                      <span className="text-primary">Solidity v0.8.26 + Zk-SNARKs</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="md"
                    icon={<ExternalLink className="w-4 h-4 text-yellow-400" />}
                    onClick={() => alert('Opening raw Etherscan byte-code debugger...')}
                    className="w-full text-xs"
                  >
                    View Compiled EVM Bytecode
                  </Button>
                </div>
              </Card>

              {/* Live Etherscan Block Feed Stream */}
              <Card className="p-5 bg-surface border border-subtle space-y-4">
                <div className="flex items-center justify-between border-b border-subtle pb-3">
                  <h4 className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>Live Consensus Blocks Feed</span>
                  </h4>
                  <span className="text-[10px] text-secondary font-mono">UPDATES EVERY 6S</span>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  {isLoading ? (
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
                    </div>
                  ) : (
                    liveBlocks.map((blk) => (
                      <div key={blk.blockNumber} className="p-3 rounded-xl bg-surface-secondary border border-subtle flex items-center justify-between hover:border-yellow-500/30 transition-all">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-surface-secondary text-yellow-400 flex items-center justify-center font-black text-xs border border-subtle">
                            Bk
                          </div>
                          <div>
                            <span className="text-yellow-400 font-bold text-xs block">#{blk.blockNumber}</span>
                            <span className="text-[9px] text-secondary block">Miner: {blk.miner}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-primary font-bold text-[11px] block">{blk.txCount} txns</span>
                          <span className="text-[9px] text-emerald-400 block">{blk.timeAgo} ({blk.reward})</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>

            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BLOCKCHAIN TIMELINE (ANIMATED VERTICAL TRAIL) */}
        {/* ========================================================================= */}
        {activeTab === 'timeline' && (
          <motion.div
            key="tab-timeline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <Card className="p-8 border border-yellow-500/40 bg-surface shadow-2xl space-y-8">
              <div className="flex items-center justify-between border-b border-subtle pb-5 flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-black text-primary font-heading uppercase tracking-tight flex items-center gap-2.5">
                    <Clock className="w-6 h-6 text-yellow-400" />
                    <span>7-Stage Autonomous Blockchain Execution Trail</span>
                  </h3>
                  <p className="text-xs text-secondary font-mono mt-1">
                    Step-by-step audit verification proving how multi-modal field proofs trigger 84ms zero-human-hold bank payouts.
                  </p>
                </div>
                <Badge variant="emerald">IMMUTABLE BLOCK TRAIL</Badge>
              </div>

              {/* Master Vertical Timeline */}
              <div className="px-2">
                <Timeline items={blockchainTimelineSteps} />
              </div>

              <div className="p-5 rounded-2xl bg-surface border border-yellow-500/30 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3 text-xs text-primary">
                  <span className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                  <span>Next Block Consensus Cycle: <strong className="text-primary">2.0s Heartbeat Active</strong></span>
                </div>
                <Button
                  variant="x402"
                  size="sm"
                  onClick={() => runLiveSimulation()}
                >
                  ▶ Trigger Live Tranche Settlement
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: NETWORK HEALTH & REAL-TIME CHARTS (RECHARTS) */}
        {/* ========================================================================= */}
        {activeTab === 'network' && (
          <motion.div
            key="tab-network"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Chart 1: Sub-100ms Latency & Real-time Throughput */}
              <Card className="p-6 bg-surface border border-yellow-500/40 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-subtle pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-primary font-heading uppercase flex items-center gap-2">
                      <BarChart2 className="w-5 h-5 text-yellow-400" />
                      <span>On-Chain Settlement Latency vs. TPS</span>
                    </h3>
                    <span className="text-xs text-secondary font-mono">Consistently sub-100ms across all active tranches</span>
                  </div>
                  <Badge variant="amber">84ms AVG</Badge>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={latencyChartData}>
                      <defs>
                        <linearGradient id="latencyGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#eab308" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#eab308" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.4} />
                      <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit=" ms" domain={[60, 120]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#eab308', borderRadius: '12px', fontSize: '12px' }}
                        labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                      />
                      <ReferenceLine y={100} label={{ value: '100ms SIH Threshold', fill: '#ef4444', fontSize: 10 }} stroke="#ef4444" strokeDasharray="4 4" />
                      <Area type="monotone" dataKey="latency" name="Settlement Latency (ms)" stroke="#eab308" strokeWidth={3} fillOpacity={1} fill="url(#latencyGlow)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Chart 2: Cumulative Settled Volume vs Throughput */}
              <Card className="p-6 bg-surface border border-cyan-500/40 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-subtle pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-primary font-heading uppercase flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                      <span>Cumulative Settled Escrow Volume</span>
                    </h3>
                    <span className="text-xs text-secondary font-mono">₹44.18 Crores unlocked directly to bank wallets</span>
                  </div>
                  <Badge variant="cyan">₹2.4M TODAY</Badge>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={latencyChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.4} />
                      <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit=" Cr" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#06b6d4', borderRadius: '12px', fontSize: '12px' }}
                      />
                      <Bar dataKey="settled" name="Settled Liquidity (₹ Crores)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: AUDIT CENTER & COMPLIANCE CERTIFYING HUB */}
        {/* ========================================================================= */}
        {activeTab === 'audit' && (
          <motion.div
            key="tab-audit"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <Card className="p-8 bg-surface border border-yellow-500/40 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-subtle pb-4 flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-black text-primary font-heading uppercase flex items-center gap-2.5">
                    <FileCheck2 className="w-6 h-6 text-yellow-400" />
                    <span>Ministry Compliance & Immutable Audit Export Hub</span>
                  </h3>
                  <p className="text-xs text-secondary font-mono mt-1">
                    Generate digitally verified SIH inspection logs and cryptographic compliance certificates for national auditing.
                  </p>
                </div>
                <Badge variant="emerald">RSA-4096 SIGNED</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-6 rounded-2xl bg-surface border border-subtle space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                      <Download className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-extrabold text-primary font-heading">Full SIH Ledger JSON / CSV Export</h4>
                    <p className="text-xs text-secondary font-mono leading-relaxed">
                      Includes all 1,482 timestamped transaction hashes, EXIF GPS binding anchors, and computer vision crack confidence logs.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    icon={<Download className="w-4 h-4 text-yellow-400" />}
                    onClick={() => alert('Downloading complete sovereign audit ledger JSON (1,482 txns)...')}
                    className="w-full font-sans font-bold"
                  >
                    Download Audit Report Bundle
                  </Button>
                </div>

                <div className="p-6 rounded-2xl bg-surface border border-subtle space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-extrabold text-primary font-heading">Cryptographic Proof Certificate PDF</h4>
                    <p className="text-xs text-secondary font-mono leading-relaxed">
                      Official government oversight compliance certificate verifying zero human holds and automated x402 financial finality.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    icon={<ExternalLink className="w-4 h-4 text-emerald-400" />}
                    onClick={() => alert('Generating cryptographic PDF certificate stamped by Ministry root key...')}
                    className="w-full font-sans font-bold"
                  >
                    Generate Certificate PDF
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ========================================================================= */}
      {/* TRANSACTION INSPECTOR MODAL (OPENED BY CLICKING ANY TABLE ROW) */}
      {/* ========================================================================= */}
      {selectedTx && (
        <Modal
          isOpen={!!selectedTx}
          onClose={() => setSelectedTx(null)}
          title={`Etherscan Transaction Inspector // #${selectedTx.nonce}`}
          subtitle={`Hash: ${selectedTx.hash}`}
          size="xl"
          headerBadge={selectedTx.status === 'SETTLED' ? 'SETTLED ON-CHAIN' : 'CONFIRMED'}
        >
          <div className="space-y-6 font-mono text-xs">
            
            {/* Top overview stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-surface border border-subtle space-y-1">
                <span className="text-[10px] text-secondary uppercase font-bold block">Status:</span>
                <Badge variant={selectedTx.status === 'SETTLED' ? 'emerald' : 'blue'}>✔ {selectedTx.status}</Badge>
              </div>
              <div className="p-3.5 rounded-xl bg-surface border border-subtle space-y-1">
                <span className="text-[10px] text-secondary uppercase font-bold block">Mined Block:</span>
                <strong className="text-accent-cyan font-bold text-sm block font-sans">#{selectedTx.blockNumber}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-surface border border-subtle space-y-1">
                <span className="text-[10px] text-secondary uppercase font-bold block">Confirmations:</span>
                <strong className="text-primary font-bold text-sm block font-sans">{selectedTx.confirmations} Confs</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-surface border border-subtle space-y-1">
                <span className="text-[10px] text-secondary uppercase font-bold block">Gas Fee:</span>
                <strong className="text-yellow-400 font-bold text-xs block">{selectedTx.gasFee}</strong>
              </div>
            </div>

            {/* Comprehensive Technical Field Specifications */}
            <div className="p-5 rounded-2xl bg-surface border border-subtle space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-subtle">
                <span className="font-bold text-primary uppercase tracking-wider">Cryptographic Execution Payload</span>
                <span className="text-emerald-400 font-bold text-[10px]">VERIFIED BY VISION AI</span>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-secondary font-bold">Target Mega-Project:</span>
                  <strong className="sm:col-span-2 text-primary font-heading font-black">{selectedTx.project}</strong>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-secondary font-bold">Contractor Recipient:</span>
                  <strong className="sm:col-span-2 text-accent-cyan">{selectedTx.contractor} ({selectedTx.contractorWallet})</strong>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-secondary font-bold">Disbursement Amount:</span>
                  <strong className="sm:col-span-2 text-emerald-400 text-base font-heading font-black">₹{(selectedTx.amount / 100000).toFixed(2)} Lakhs USDC</strong>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-secondary font-bold">Smart Method Invoked:</span>
                  <span className="sm:col-span-2 text-accent-gold bg-surface-secondary p-2 rounded border border-yellow-500/20 select-all font-bold">
                    {selectedTx.method}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-secondary font-bold">x402 Macaroon Receipt:</span>
                  <span className="sm:col-span-2 text-primary bg-surface-secondary p-2 rounded border border-subtle select-all text-[11px] truncate">
                    {selectedTx.receiptSig}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-subtle">
                  <span className="text-secondary font-bold block">On-Chain Event Logs (Solidity Emit):</span>
                  <div className="p-3 rounded-xl bg-surface-secondary border border-emerald-500/30 text-accent-emerald font-mono text-[11px]">
                    <code>{selectedTx.eventLog}</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-subtle flex items-center justify-between gap-4">
              <span className="text-[11px] text-secondary">Timestamp: {selectedTx.timestamp} // Zero admin pause applied</span>
              <Button variant="primary" onClick={() => setSelectedTx(null)}>
                Close Etherscan Inspector
              </Button>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};
