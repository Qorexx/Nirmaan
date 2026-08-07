import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Eye, 
  Search, 
  Filter, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  ExternalLink, 
  Activity, 
  Cpu, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  Zap,
  ArrowRight,
  ShieldAlert,
  Wallet
} from 'lucide-react';
import { useEscrowStore } from '../store/useEscrowStore';
import { BeforeAfterSlider } from '../components/digital-twin/BeforeAfterSlider';
import { 
  Button, 
  Card, 
  GlassCard, 
  KPICard, 
  Badge, 
  Input, 
  Dropdown, 
  ProgressBar, 
  Timeline, 
  Modal, 
  NotificationCard,
  StatCard
} from '../components/ui';
import { Project } from '../types';

// Mock Data for Charts & Analytics
const fundingVelocityData = [
  { month: 'Jan', locked: 42.5, released: 18.2, speed: 84 },
  { month: 'Feb', locked: 45.1, released: 24.8, speed: 79 },
  { month: 'Mar', locked: 48.7, released: 31.4, speed: 82 },
  { month: 'Apr', locked: 50.2, released: 38.9, speed: 75 },
  { month: 'May', locked: 51.8, released: 44.2, speed: 71 },
  { month: 'Jun (Current)', locked: 52.4, released: 49.6, speed: 68 },
];

const riskRadarData = [
  { subject: 'Material Quality', score: 98, threshold: 80 },
  { subject: 'Road Crack Density', score: 96, threshold: 85 },
  { subject: 'GPS Geo-Boundary', score: 100, threshold: 90 },
  { subject: 'Contractor Reputation', score: 92, threshold: 75 },
  { subject: 'L402 Macaroon Proof', score: 99, threshold: 95 },
  { subject: 'On-Chain Finality', score: 100, threshold: 95 },
];

const aiAutomationStatusData = [
  { category: 'Stage 1: Submission', autonomous: 128, flagged: 0 },
  { category: 'Stage 2: Vision AI', autonomous: 126, flagged: 2 },
  { category: 'Stage 3: Verification', autonomous: 125, flagged: 3 },
  { category: 'Stage 4: x402 Payment', autonomous: 128, flagged: 0 },
  { category: 'Stage 5: Blockchain', autonomous: 128, flagged: 0 },
];

const recentActivityLogs = [
  { id: '1', timestamp: '12 seconds ago', title: '₹14,50,000 Payout Released Automatically', description: 'NH-44 Highway Mile 32 proof passed Vision AI crack evaluation with 98.2% score. $0.05 USDC verification fee settled.', status: 'completed' as const, meta: 'x402 // 84ms' },
  { id: '2', timestamp: '4 minutes ago', title: 'Anomaly Warning: Sub-grade Moisture Detected', description: 'Pune Metro Line 3 pier excavation scan indicates 4.2% water seepage. Auto-withheld 15% escrow buffer pending re-test.', status: 'error' as const, meta: 'AI VISION' },
  { id: '3', timestamp: '18 minutes ago', title: 'L402 Machine Wallet Re-charged', description: 'Sovereign Treasury Vault 0x9a4F... transferred 500 USDC gas reserve to Autonomous Verification Engine.', status: 'completed' as const, meta: 'LEDGER TX' },
  { id: '4', timestamp: '1 hour ago', title: 'Smart City Solar Grid 100% Settled', description: 'Bangalore Sector 4 substation digital twin verified via high-res satellite cross-referencing. Final escrow tranche closed.', status: 'completed' as const, meta: 'AUDITOR VERIFIED' },
];

export const GovernmentCommandCenterPage: React.FC = () => {
  const { 
    projects, 
    toggleFreezeProject, 
    overrideDecision, 
    totalProtectedValue, 
    runLiveSimulation,
    aiAccuracyRate
  } = useEscrowStore();

  const [activeTab, setActiveTab] = useState<'projects' | 'analytics' | 'escrow' | 'risk'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
  const [overrideModalOpen, setOverrideModalOpen] = useState(false);
  const [targetOverrideProject, setTargetOverrideProject] = useState<Project | null>(null);

  // Filtered projects based on search and category
  const filteredProjects = projects.filter(p => {
    const isFrozen = p.status === 'FROZEN';
    const score = p.aiScore || 96;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.contractor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || 
                            (filterCategory === 'frozen' && isFrozen) || 
                            (filterCategory === 'active' && !isFrozen) ||
                            (filterCategory === 'high-risk' && score < 90);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 font-mono pb-12 text-slate-100">

      {/* 1. EXECUTIVE COMMAND HEADER BANNER */}
      <GlassCard className="relative overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_80px_rgba(6,182,212,0.2)]">
        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="pulse" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                🏛️ GOV CHIEF ARBITER COMMAND SUITE
              </Badge>
              <span className="text-[11px] font-mono text-cyan-300 font-extrabold bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/30">
                SOVEREIGN-402 PROTOCOL ONLINE
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-primary font-heading tracking-tight leading-none">
              Government Command Center
            </h1>
            <p className="text-xs sm:text-sm text-primary font-mono leading-relaxed">
              Oversee multi-million dollar public infrastructure escrow vaults, analyze real-time Vision AI anomaly reports, inspect GPS digital twins, and execute emergency governance overrides.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button
              variant="x402"
              size="lg"
              icon={<Zap className="w-5 h-5 fill-current animate-bounce" />}
              onClick={() => runLiveSimulation()}
              className="w-full sm:w-auto shadow-2xl"
            >
              ▶ Test Sovereign Payout Simulation
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<FileText className="w-4 h-4 text-cyan-400" />}
              onClick={() => window.print()}
              className="w-full sm:w-auto"
            >
              Export Audit Summary
            </Button>
          </div>
        </div>

        {/* Ambient background light glows */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 top-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      </GlassCard>

      {/* 2. ENTERPRISE KPI CARDS DECK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Total Treasury Escrow"
          value={`₹${(totalProtectedValue / 1000000).toFixed(2)}M`}
          change="+14.8% QoQ"
          isPositive={true}
          subValue="100% locked in smart contract vaults"
          icon={<Wallet className="w-5 h-5" />}
          glowColor="cyan"
        />
        <KPICard
          title="Active Mega-Projects"
          value={projects.length.toString()}
          change="↑ 4 This Month"
          isPositive={true}
          subValue="NHAI & Smart Cities Mission"
          icon={<Layers className="w-5 h-5 text-emerald-400" />}
          glowColor="emerald"
        />
        <KPICard
          title="Escrow In Transit"
          value="₹18.4M"
          change="₹4.2M Settled Today"
          isPositive={true}
          subValue="0 Manual human bottlenecks"
          icon={<Cpu className="w-5 h-5 text-purple-400" />}
          glowColor="purple"
        />
        <KPICard
          title="AI Precision Rate"
          value={`${aiAccuracyRate}%`}
          change="1.4s AVG Latency"
          isPositive={true}
          subValue="L402 Macaroon machine verified"
          icon={<Activity className="w-5 h-5 text-amber-400" />}
          glowColor="amber"
        />
        <KPICard
          title="Corruption & Fraud Risk"
          value="0.04%"
          change="100% Containment"
          isPositive={true}
          subValue="0 Corrupt claims accepted to date"
          icon={<ShieldAlert className="w-5 h-5 text-rose-400" />}
          glowColor="cyan"
        />
      </div>

      {/* 3. INTERACTIVE PORTAL TABS & CONTROL RIBBON */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface p-3 rounded-2xl border border-subtle">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1 sm:pb-0">
          {[
            { id: 'projects' as const, label: '📁 Active Projects Deck', badge: projects.length },
            { id: 'analytics' as const, label: '📈 AI & Telemetry Analytics', badge: 'LIVE' },
            { id: 'escrow' as const, label: '💰 Escrow Vault & Funding', badge: '₹52.4M' },
            { id: 'risk' as const, label: '⚙️ Risk Matrix & Alerts', badge: '0 Hold' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap select-none ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] font-extrabold scale-102'
                  : 'text-secondary hover:text-primary hover:bg-surface-secondary border border-transparent'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                activeTab === tab.id ? 'bg-cyan-400 text-slate-950 font-black' : 'bg-surface-secondary text-primary'
              }`}>
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-secondary w-full sm:w-auto justify-end">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Governance Override Status: <strong className="text-emerald-400">UNRESTRICTED</strong></span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ACTIVE PROJECTS DECK & DIGITAL TWINS */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait">
        {activeTab === 'projects' && (
          <motion.div
            key="tab-projects"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-surface p-4 rounded-2xl border border-subtle shadow-lg">
              <div className="flex-1 min-w-[280px] max-w-md">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by project name, contractor, or location..."
                  leftIcon={<Search className="w-4 h-4 text-cyan-400" />}
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="w-48">
                  <Dropdown
                    value={filterCategory}
                    onChange={setFilterCategory}
                    options={[
                      { value: 'all', label: 'All Projects Deck', badge: 'ALL' },
                      { value: 'active', label: 'Active Autonomous', badge: 'AI' },
                      { value: 'frozen', label: 'Emergency Frozen', badge: 'HOLD' },
                      { value: 'high-risk', label: 'High Risk (Score < 90)', badge: 'WARN' },
                    ]}
                  />
                </div>
                <Button variant="ghost" size="sm" icon={<Filter className="w-4 h-4 text-secondary" />} onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}>
                  Reset
                </Button>
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((p) => {
                const isFrozen = p.status === 'FROZEN';
                const score = p.aiScore || 96;
                return (
                  <Card
                    key={p.id}
                    glowColor={isFrozen ? 'amber' : score > 92 ? 'emerald' : 'cyan'}
                    className="flex flex-col justify-between space-y-4 relative overflow-hidden"
                  >
                    {/* Top Status & Location Badge */}
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-subtle">
                        <div className="flex items-center gap-1.5 text-secondary text-xs truncate">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="font-mono font-bold truncate">{p.location}</span>
                        </div>
                        <Badge
                          variant={isFrozen ? 'rose' : 'emerald'}
                          icon={isFrozen ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                        >
                          {isFrozen ? 'VAULT FROZEN' : 'ACTIVE ESCROW'}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-extrabold text-primary font-heading tracking-tight mt-3 truncate">
                        {p.name}
                      </h3>
                      <p className="text-xs text-secondary font-mono mt-1 truncate">
                        Category: <strong className="text-cyan-300">{p.category}</strong> • Updated {p.lastUpdated}
                      </p>
                    </div>

                    {/* Financial & AI Health Specs */}
                    <div className="bg-surface p-4 rounded-xl border border-subtle space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-secondary font-mono">Contractor Lead:</span>
                        <span className="text-cyan-300 font-bold truncate max-w-[150px]">{p.contractor}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-secondary font-mono">Total Vault Escrow:</span>
                        <span className="text-base font-black text-primary font-heading">₹{p.budget.toLocaleString()}</span>
                      </div>

                      <ProgressBar
                        percentage={(p.releasedAmount / (p.lockedAmount + p.releasedAmount || 1)) * 100}
                        label="Released via L402 Automation:"
                        subValue={`₹${p.releasedAmount.toLocaleString()} settled`}
                        color={isFrozen ? 'amber' : 'gradient'}
                        heightClass="h-2"
                      />
                    </div>

                    {/* AI Vision Score Chip */}
                    <div className="flex items-center justify-between gap-2 bg-surface px-4 py-2.5 rounded-xl border border-subtle">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />
                        <span className="text-xs font-bold text-primary">Vision AI Score:</span>
                      </div>
                      <span className={`font-extrabold font-mono text-sm px-2 py-0.5 rounded ${
                        score > 92 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {score}%
                      </span>
                    </div>

                    {/* Action Button Controls */}
                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-subtle">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => setSelectedProjectForModal(p)}
                        className="flex-1 text-[11px]"
                      >
                        Inspect Digital Twin
                      </Button>
                      
                      <Button
                        variant={isFrozen ? 'primary' : 'danger'}
                        size="sm"
                        icon={isFrozen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        onClick={() => toggleFreezeProject(p.id)}
                        title="Emergency freeze or unfreeze smart contract payouts"
                        className="shrink-0"
                      >
                        {isFrozen ? 'Unfreeze' : 'Freeze'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Enterprise Data Table View */}
            <Card className="p-0 overflow-hidden border border-cyan-500/30 shadow-2xl mt-8">
              <div className="p-6 bg-surface border-b border-subtle flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-primary font-heading uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-5 h-5 text-cyan-400" />
                    <span>Sovereign Ledger Execution Table</span>
                  </h3>
                  <p className="text-xs text-secondary font-mono mt-0.5">Live immutable feed of contractor proof evaluations and automated x402 bank disbursements.</p>
                </div>
                <Badge variant="cyan">LIVE SOVEREIGN FEED // L402 MACAROON</Badge>
              </div>

              <div className="overflow-x-auto font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface text-secondary font-bold border-b border-subtle uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-6">Project Name // Location</th>
                      <th className="py-3.5 px-6">Contractor Wallet</th>
                      <th className="py-3.5 px-6">Escrow Vault Size</th>
                      <th className="py-3.5 px-6">AI Confidence</th>
                      <th className="py-3.5 px-6">Vault Status</th>
                      <th className="py-3.5 px-6 text-right">Governance Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D6D0C4]">
                    {filteredProjects.map((proj) => {
                      const isFrozen = proj.status === 'FROZEN';
                      const score = proj.aiScore || 96;
                      return (
                        <tr key={proj.id} className="hover:bg-surface-secondary transition-colors group">
                          <td className="py-4 px-6 font-bold text-primary">
                            <div className="flex flex-col">
                              <span className="text-sm font-extrabold group-hover:text-cyan-300 transition-colors">{proj.name}</span>
                              <span className="text-[10px] text-secondary font-normal">{proj.location} • {proj.category}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-primary font-mono">
                            <span className="bg-surface px-2 py-1 rounded text-cyan-300 border border-subtle select-all">
                              {proj.txHash || '0x402a...E819'}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-mono font-black text-primary">
                            ₹{proj.budget.toLocaleString()}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${score > 92 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                              <span className="font-bold text-primary">{score}% Precision</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <Badge variant={isFrozen ? 'rose' : 'emerald'}>
                              {isFrozen ? 'EMERGENCY HOLD' : 'AUTO-RELEASE ONLINE'}
                            </Badge>
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => setSelectedProjectForModal(proj)}
                              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 transition-all"
                            >
                              Inspect Twin
                            </button>
                            <button
                              onClick={() => {
                                setTargetOverrideProject(proj);
                                setOverrideModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-surface-secondary hover:bg-slate-700 text-primary font-bold border border-subtle transition-all"
                            >
                              Override
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: AI & TELEMETRY ANALYTICS (RECHARTS) */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <motion.div
            key="tab-analytics"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Chart 1: AI Stage Settlement Automation */}
              <GlassCard intensity="medium" className="space-y-4 border border-subtle">
                <div className="flex items-center justify-between border-b border-subtle pb-4">
                  <div>
                    <h3 className="text-lg font-black text-primary font-heading uppercase tracking-tight flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-cyan-400" />
                      <span>6-Stage Autonomous Settlement Volume</span>
                    </h3>
                    <p className="text-xs text-secondary font-mono">Zero bureaucratic latency across 128 active highway proofs.</p>
                  </div>
                  <Badge variant="cyan">98.4% AUTO RATE</Badge>
                </div>

                <div className="h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={aiAutomationStatusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F2A44" vertical={false} />
                      <XAxis dataKey="category" stroke="#64748B" fontSize={10} tickLine={false} />
                      <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0B1120', borderColor: '#06B6D4', borderRadius: '12px', color: '#fff', fontSize: '12px', fontFamily: 'monospace' }}
                        itemStyle={{ color: '#00F2FF' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', color: '#CBD5E1', paddingTop: '10px' }} />
                      <Bar dataKey="autonomous" name="Autonomous Settled (1.4s)" fill="#06B6D4" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="flagged" name="Manual Inspection Required" fill="#F43F5E" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              {/* Chart 2: Risk Analysis Radar Matrix */}
              <GlassCard intensity="medium" className="space-y-4 border border-subtle">
                <div className="flex items-center justify-between border-b border-subtle pb-4">
                  <div>
                    <h3 className="text-lg font-black text-primary font-heading uppercase tracking-tight flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-amber-400" />
                      <span>Sovereign Risk Analysis Radar</span>
                    </h3>
                    <p className="text-xs text-secondary font-mono">6-dimensional anti-corruption structural threshold indexing.</p>
                  </div>
                  <Badge variant="amber">100% SECURED</Badge>
                </div>

                <div className="h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={riskRadarData}>
                      <PolarGrid stroke="#22304E" />
                      <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={11} fontFamily="monospace" />
                      <PolarRadiusAxis stroke="#475569" angle={30} domain={[0, 100]} fontSize={9} />
                      <Radar name="Live AI Proof Score" dataKey="score" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
                      <Radar name="Min Safety Threshold" dataKey="threshold" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.15} />
                      <Tooltip contentStyle={{ backgroundColor: '#0B1120', borderColor: '#10B981', borderRadius: '12px', fontSize: '12px' }} />
                      <Legend wrapperStyle={{ fontSize: '11px', color: '#CBD5E1' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>

            {/* AI Algorithmic Pipeline Telemetry */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard
                title="Preprocessing & Noise Removal"
                number="42 ms"
                unit="LATENCY"
                footnote="Gaussian filtering + Perspective correction active"
                accentColor="from-purple-500 to-indigo-600"
              />
              <StatCard
                title="L402 Macaroon Authorization"
                number="$0.05"
                unit="USDC GAS"
                footnote="Machine-to-machine HTTP 402 instant execution"
                accentColor="from-amber-400 to-orange-500"
              />
              <StatCard
                title="Tamper Containment Rate"
                number="100%"
                unit="SUCCESS"
                footnote="0 Corrupt payments released to date across India"
                accentColor="from-emerald-400 to-cyan-500"
              />
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ESCROW VAULT & FUNDING LIQUIDITY */}
        {/* ========================================================================= */}
        {activeTab === 'escrow' && (
          <motion.div
            key="tab-escrow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <GlassCard className="space-y-6 border border-cyan-500/40">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-subtle pb-4">
                <div>
                  <h3 className="text-xl font-black text-primary font-heading uppercase tracking-tight flex items-center gap-2">
                    <Wallet className="w-6 h-6 text-cyan-400" />
                    <span>Treasury Escrow Liquidity Velocity (₹ Millions)</span>
                  </h3>
                  <p className="text-xs text-secondary font-mono mt-1">Comparison of total locked government capital vs. automated L402 milestone disbursements.</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                    <span className="w-3 h-3 rounded bg-cyan-400" /> Total Locked capital (₹52.4M)
                  </span>
                  <span className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                    <span className="w-3 h-3 rounded bg-emerald-400" /> Automated Payouts (₹49.6M)
                  </span>
                </div>
              </div>

              <div className="h-96 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fundingVelocityData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorLocked" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorReleased" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1D2A44" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} unit="M" />
                    <Tooltip contentStyle={{ backgroundColor: '#0A1120', borderColor: '#00F2FF', borderRadius: '16px', color: '#fff' }} />
                    <Area type="monotone" dataKey="locked" stroke="#06B6D4" strokeWidth={3} fillOpacity={1} fill="url(#colorLocked)" name="Locked Treasury capital (₹M)" />
                    <Area type="monotone" dataKey="released" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorReleased)" name="Released via AI (₹M)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            {/* Treasury Category Allocations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-subtle space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary font-bold uppercase">NHAI Highway Corridor</span>
                  <Badge variant="cyan">₹28.4M LOCKED</Badge>
                </div>
                <h4 className="text-lg font-black text-primary">48 Expressways Online</h4>
                <ProgressBar percentage={88.2} label="Milestone Completion:" subValue="88.2% Auto-Paid" color="cyan" heightClass="h-2" />
              </Card>

              <Card className="border border-subtle space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary font-bold uppercase">Smart City Bridges</span>
                  <Badge variant="emerald">₹14.2M LOCKED</Badge>
                </div>
                <h4 className="text-lg font-black text-primary">32 Bridges Audited</h4>
                <ProgressBar percentage={94.5} label="Milestone Completion:" subValue="94.5% Auto-Paid" color="emerald" heightClass="h-2" />
              </Card>

              <Card className="border border-subtle space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary font-bold uppercase">Metro Rail Tunnels</span>
                  <Badge variant="gold">₹9.8M LOCKED</Badge>
                </div>
                <h4 className="text-lg font-black text-primary">42 Tunnel Sectors</h4>
                <ProgressBar percentage={72.0} label="Milestone Completion:" subValue="72.0% Auto-Paid" color="gradient" heightClass="h-2" />
              </Card>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: RISK MATRIX & NOTIFICATIONS LOG */}
        {/* ========================================================================= */}
        {activeTab === 'risk' && (
          <motion.div
            key="tab-risk"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left 2 Cols: Recent Autonomous Activity Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 border border-subtle space-y-6">
                <div className="flex items-center justify-between border-b border-subtle pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-primary font-heading uppercase tracking-tight">
                      Chronological Autonomous Execution Trail
                    </h3>
                    <p className="text-xs text-secondary font-mono">Real-time immutable receipts generated by machine verification wallets.</p>
                  </div>
                  <Badge variant="pulse">SYNCED TO LEDGER</Badge>
                </div>

                <Timeline items={recentActivityLogs} />
              </Card>
            </div>

            {/* Right 1 Col: High Priority Alert Cards */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-primary uppercase tracking-widest px-1">
                Active Anomaly Notifications
              </h3>

              <NotificationCard
                title="Sub-grade Seepage Held"
                description="Pune Metro Line 3 pier sector flagged by Vision AI. Automatic withholding of 15% tranche active."
                severity="urgent"
                timestamp="4m ago"
                actionText="View Radar Proof"
                onAction={() => setActiveTab('projects')}
              />

              <NotificationCard
                title="$0.05 x402 Micropayment"
                description="L402 Macaroon proof settled via machine wallet 0x402A... in 84ms without manual intervention."
                severity="x402"
                timestamp="12s ago"
                actionText="Verify on Ledger"
                onAction={() => window.open('https://smartindia.gov.in', '_blank')}
              />

              <NotificationCard
                title="Sovereign Vault Audited"
                description="Annual anti-corruption tamper compliance scan verified 128/128 project balances."
                severity="success"
                timestamp="1h ago"
                actionText="Export PDF"
                onAction={() => window.print()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 1: DIGITAL TWIN INSPECTION THEATER */}
      {/* ========================================================================= */}
      {selectedProjectForModal && (
        <Modal
          isOpen={!!selectedProjectForModal}
          onClose={() => setSelectedProjectForModal(null)}
          title={`Digital Twin Inspection // ${selectedProjectForModal.name}`}
          subtitle={`GPS Location: ${selectedProjectForModal.location} • Contractor: ${selectedProjectForModal.contractor}`}
          size="xl"
          headerBadge="VISION AI VERIFIED"
        >
          <div className="space-y-6 font-mono">
            {/* Before / After Slider Component */}
            <div className="p-4 rounded-2xl bg-surface border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400 font-bold uppercase flex items-center gap-2">
                  <Eye className="w-4 h-4 animate-pulse" />
                  <span>Interactive Surface Density Scan (Before vs. After Repair)</span>
                </span>
                <span className="text-secondary text-[11px]">Resolution: 4K Sub-millimeter GIS</span>
              </div>
              <BeforeAfterSlider
                beforeImage={selectedProjectForModal.beforeImageUrl}
                afterImage={selectedProjectForModal.afterImageUrl}
                title={selectedProjectForModal.name}
              />
            </div>

            {/* AI Structural Telemetry Readout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-surface p-4 rounded-xl border border-subtle space-y-1">
                <span className="text-secondary block font-bold uppercase text-[10px]">Crack & Defect Index:</span>
                <span className="text-emerald-400 text-lg font-black block">0.02% (Passed)</span>
                <span className="text-[10px] text-secondary block">Threshold: &lt; 2.5%</span>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-subtle space-y-1">
                <span className="text-secondary block font-bold uppercase text-[10px]">GPS Geo-Fencing:</span>
                <span className="text-cyan-300 text-lg font-black block">100% Boundary Sync</span>
                <span className="text-[10px] text-secondary block">Lat: 18.5204° N, Long: 73.8567° E</span>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-subtle space-y-1">
                <span className="text-secondary block font-bold uppercase text-[10px]">x402 Micropayment Gas:</span>
                <span className="text-amber-400 text-lg font-black block">$0.05 USDC (84ms)</span>
                <span className="text-[10px] text-secondary block">HTTP 402 Challenge Cleared</span>
              </div>
            </div>

            <div className="pt-4 border-t border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-secondary">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sovereign Smart Contract: <strong className="text-primary">Approved for Automated Disbursement</strong></span>
              </div>
              <Button variant="primary" onClick={() => setSelectedProjectForModal(null)}>
                Close Digital Twin Preview
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: GOVERNANCE OVERRIDE DIALOG */}
      {/* ========================================================================= */}
      {overrideModalOpen && targetOverrideProject && (
        <Modal
          isOpen={overrideModalOpen}
          onClose={() => { setOverrideModalOpen(false); setTargetOverrideProject(null); }}
          title="Executive Governance Override"
          subtitle={`Target Project: ${targetOverrideProject.name} (${targetOverrideProject.id})`}
          size="md"
          headerBadge="EMERGENCY ARBITER CONTROL"
        >
          <div className="space-y-5 font-mono">
            <div className="p-4 rounded-2xl bg-surface-secondary border border-rose-500/50 text-rose-200 text-xs flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-extrabold block text-primary text-sm">Caution: Overriding Autonomous Decisions</span>
                <p className="opacity-90 leading-relaxed">
                  Executing a manual arbitration override will record your sovereign government signature on the immutable ledger for audit compliance under Smart India Hackathon regulatory mandates.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-primary uppercase">Select Override Action:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    overrideDecision(targetOverrideProject.id, true);
                    setOverrideModalOpen(false);
                  }}
                  className="p-4 rounded-xl bg-surface hover:bg-surface-secondary border border-emerald-500/50 text-emerald-300 font-extrabold text-xs text-center transition-all shadow-lg hover:scale-102"
                >
                  ✅ FORCE APPROVE & PAY OUT
                </button>
                <button
                  onClick={() => {
                    overrideDecision(targetOverrideProject.id, false);
                    setOverrideModalOpen(false);
                  }}
                  className="p-4 rounded-xl bg-surface-secondary hover:bg-[#351420] border border-rose-500/50 text-rose-300 font-extrabold text-xs text-center transition-all shadow-lg hover:scale-102"
                >
                  ⛔ REJECT EVIDENCE & HOLD
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-subtle flex justify-end">
              <Button variant="ghost" onClick={() => setOverrideModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
