import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Cpu, 
  Layers, 
  Database, 
  Download, 
  FileText, 
  Filter, 
  RefreshCw, 
  Search, 
  MapPin, 
  Activity, 
  Check, 
  Lock, 
  Unlock, 
  Server, 
  Target, 
  PieChart as PieIcon, 
  Compass, 
  ExternalLink, 
  Flame, 
  Award 
} from 'lucide-react';
import { useEscrowStore } from '../store/useEscrowStore';
import { 
  Button, 
  Card, 
  GlassCard, 
  KPICard, 
  Badge, 
  Input, 
  StatCard, 
  AnimatedBorder, 
  NotificationCard,
  Skeleton
} from '../components/ui';

// ============================================================================
// MOCK ANALYTICS DATA SUITE
// ============================================================================

// AI Performance: Accuracy vs Speed vs Load Over Months
const aiPerformanceData = [
  { month: 'Jan', accuracy: 94.2, speed: 2.1, confidence: 92.4, failures: 1.8 },
  { month: 'Feb', accuracy: 95.5, speed: 1.9, confidence: 93.8, failures: 1.4 },
  { month: 'Mar', accuracy: 96.8, speed: 1.7, confidence: 95.1, failures: 1.0 },
  { month: 'Apr', accuracy: 97.4, speed: 1.6, confidence: 95.9, failures: 0.8 },
  { month: 'May', accuracy: 98.2, speed: 1.5, confidence: 96.4, failures: 0.5 },
  { month: 'Jun', accuracy: 98.9, speed: 1.4, confidence: 97.2, failures: 0.4 },
  { month: 'Jul (Current)', accuracy: 99.4, speed: 1.4, confidence: 97.8, failures: 0.2 },
];

// AI Confidence Distribution across thousands of analyzed structural proofs
const confidenceDistributionData = [
  { range: '98% - 100% (High Confidence)', count: 1420, percentage: '65%', color: '#10b981' },
  { range: '95% - 97% (Verified Clear)', count: 580, percentage: '26%', color: '#06b6d4' },
  { range: '90% - 94% (Borderline Pass)', count: 150, percentage: '7%', color: '#eab308' },
  { range: '< 90% (Manual Flag Trigger)', count: 32, percentage: '2%', color: '#ef4444' },
];

// AI Multi-Model Competency Radar
const modelRadarData = [
  { metric: 'LiDAR Crack Detection', score: 99.2, target: 95.0 },
  { metric: 'EXIF GPS Spoof Defense', score: 99.8, target: 95.0 },
  { metric: 'Concrete Hydration Analysis', score: 97.4, target: 92.0 },
  { metric: 'Steel Rebar Stress AI', score: 98.1, target: 94.0 },
  { metric: 'x402 Micro-Gas Latency', score: 99.9, target: 98.0 },
  { metric: 'Thermal Infrared Depth', score: 96.5, target: 90.0 },
];

// State-wise Project & Escrow Distribution
const stateDistributionData = [
  { state: 'Maharashtra', projects: 64, released: 18.4, locked: 22.1, riskScore: 12 },
  { state: 'Karnataka', projects: 52, released: 14.2, locked: 16.5, riskScore: 8 },
  { state: 'Gujarat', projects: 48, released: 12.8, locked: 14.2, riskScore: 5 },
  { state: 'Tamil Nadu', projects: 42, released: 10.5, locked: 12.0, riskScore: 14 },
  { state: 'Uttar Pradesh', projects: 34, released: 8.2, locked: 11.4, riskScore: 19 },
];

// Escrow Treasury Allocation & Daily Settlements
const dailySettlementsData = [
  { day: 'Mon', released: 2.1, count: 18, gasUsed: 14.2 },
  { day: 'Tue', released: 3.4, count: 26, gasUsed: 19.8 },
  { day: 'Wed', released: 1.8, count: 14, gasUsed: 11.0 },
  { day: 'Thu', released: 4.2, count: 32, gasUsed: 24.5 },
  { day: 'Fri', released: 3.8, count: 29, gasUsed: 22.1 },
  { day: 'Sat', released: 2.9, count: 22, gasUsed: 16.4 },
  { day: 'Sun (Live)', released: 2.4, count: 19, gasUsed: 14.8 },
];

// Top Contractors Analytics Table Data
const contractorAnalyticsData = [
  { id: 'c1', name: 'L&T Infra Solutions', projects: 14, successRate: 99.4, avgCompletion: '3.8 Weeks', totalSettled: '₹14.20 Cr', status: 'TIER-1 EXCELLENT', wallet: '0x402a...E819' },
  { id: 'c2', name: 'Tata Power Solar Systems', projects: 11, successRate: 98.9, avgCompletion: '4.1 Weeks', totalSettled: '₹11.80 Cr', status: 'TIER-1 EXCELLENT', wallet: '0x819b...C402' },
  { id: 'c3', name: 'AFCON-DMR Construction', projects: 9, successRate: 97.2, avgCompletion: '4.5 Weeks', totalSettled: '₹9.40 Cr', status: 'TIER-1 COMPLIANT', wallet: '0x301e...F910' },
  { id: 'c4', name: 'Shapoorji Pallonji Co.', projects: 8, successRate: 96.1, avgCompletion: '5.0 Weeks', totalSettled: '₹6.10 Cr', status: 'TIER-2 MONITORED', wallet: '0x501d...B220' },
  { id: 'c5', name: 'Voltas Electro-Mechanics', projects: 6, successRate: 99.1, avgCompletion: '3.9 Weeks', totalSettled: '₹2.68 Cr', status: 'TIER-1 EXCELLENT', wallet: '0x991b...A120' },
];

// Interactive Geographic District Heatmap Data
const projectHeatmapData = [
  { id: 'h1', district: 'Pune Ring Expressway Hub', state: 'Maharashtra', density: 'HIGH DENSITY (24 Projects)', budget: '₹18.4 Cr', status: 'NORMAL FLOW', risk: 'Low', color: 'emerald' },
  { id: 'h2', district: 'Bangalore Metro Corridor 4', state: 'Karnataka', density: 'CRITICAL HUB (19 Projects)', budget: '₹14.2 Cr', status: 'WEATHER ALERT', risk: 'Medium', color: 'amber' },
  { id: 'h3', district: 'Ahmedabad Dholera Solar Port', state: 'Gujarat', density: 'HIGH DENSITY (22 Projects)', budget: '₹12.8 Cr', status: 'NORMAL FLOW', risk: 'Low', color: 'emerald' },
  { id: 'h4', district: 'Chennai Southern Coastal Wall', state: 'Tamil Nadu', density: 'MEDIUM DENSITY (12 Projects)', budget: '₹10.5 Cr', status: 'SOIL FLAG SET', risk: 'High', color: 'blue' },
  { id: 'h5', district: 'Lucknow-Agra Heritage Link', state: 'Uttar Pradesh', density: 'HIGH DENSITY (18 Projects)', budget: '₹8.2 Cr', status: 'NORMAL FLOW', risk: 'Medium', color: 'amber' },
  { id: 'h6', district: 'Navi Mumbai Airport Link', state: 'Maharashtra', density: 'ULTRA DENSITY (28 Projects)', budget: '₹24.5 Cr', status: 'NORMAL FLOW', risk: 'Low', color: 'cyan' },
];

// AI Predictive Intelligence Cards
const predictiveInsightsData = [
  { id: 'p1', title: 'Potential Weather Delay Warning', category: 'MONSOON FORECAST', desc: 'AI Meteorological integration estimates heavy rain over NH-44 Sector 9. Advise extending Tranche 3 deadline buffer by 4 days.', severity: 'urgent' as const, confidence: '94.2% Certainty' },
  { id: 'p2', title: 'High-Risk Soil Settlement Flag', category: 'STRUCTURAL RISK AI', desc: 'Coastal Seawall Piling images reveal 2.4mm foundation drift. Automated pause triggered until deep soil sonic ultrasound is submitted.', severity: 'urgent' as const, confidence: '91.8% Confidence' },
  { id: 'p3', title: 'Tranche 4 Liquidity Forecast', category: 'BUDGET PREDICTION', desc: 'Based on multi-modal submission cadence, expect ₹8.4 Crores in autonomous x402 escrow payouts across 14 contractors next week.', severity: 'x402' as const, confidence: '98.9% Projection' },
  { id: 'p4', title: 'Model Optimization Opportunity', category: 'NEURAL VELOCITY', desc: 'Upgrading edge LiDAR inferencing to v4.2 will cut on-chain validation latency from 84ms down to an estimated 62ms.', severity: 'success' as const, confidence: '99.4% Efficiency' },
];

export const AnalyticsSuitePage: React.FC = () => {
  const { projects, aiAccuracyRate, autonomousDecisionsCount, runLiveSimulation } = useEscrowStore();

  // Local state for interactive filtering & tabs
  const [selectedTimeRange, setSelectedTimeRange] = useState('30D');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedProjectType, setSelectedProjectType] = useState('ALL');
  const [selectedConfidence, setSelectedConfidence] = useState('ALL');
  const [activeTab, setActiveTab] = useState<'ai' | 'escrow' | 'blockchain' | 'contractors' | 'heatmap' | 'predictive' | 'reports'>('ai');
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // Handle Export Report Simulation
  const handleExport = (type: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`✔ Successfully generated and exported ${type} report! Downloaded to your machine.`);
    }, 1200);
  };

  // Filtered state data based on dropdown selection
  const filteredStateData = useMemo(() => {
    if (selectedState === 'ALL') return stateDistributionData;
    return stateDistributionData.filter(s => s.state === selectedState);
  }, [selectedState]);

  return (
    <div className="space-y-10 font-mono pb-24 text-slate-100 selection:bg-cyan-400 selection:text-slate-950 max-w-[1750px] mx-auto">

      {/* ========================================================================= */}
      {/* 1. PALANTIR GOTHAM x STRIPE x VERCEL ANALYTICS HERO DECK */}
      {/* ========================================================================= */}
      <GlassCard intensity="high" className="relative overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.15)] bg-gradient-to-r from-[#07131F] via-[#0A1020] to-[#110D20]">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="cyan" icon={<Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />}>
                🧠 PALANTIR x STRIPE INTELLIGENCE TIER // SIH GOTHAM SUITE
              </Badge>
              <span className="text-[11px] font-mono text-emerald-300 font-extrabold bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                AI INFERENCE: ACTIVE (99.4% PRECISION)
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-primary font-heading tracking-tight leading-tight">
              National AI Efficiency & Predictive Analytics Center
            </h1>

            <p className="text-xs sm:text-sm text-primary font-mono leading-relaxed">
              Real-time telemetry and macroeconomic visualization engine demonstrating 4.2-second autonomous automated settlements versus legacy 30-to-90 day bureaucratic red tape.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <div className="px-5 py-3 rounded-2xl bg-surface border-2 border-cyan-500/40 text-center sm:text-right shadow-2xl w-full sm:w-auto">
              <span className="text-[10px] text-secondary uppercase font-bold block">Autonomous Clearance Rate</span>
              <span className="text-3xl font-black text-cyan-400 font-heading tracking-tight">90.8 <span className="text-xs font-mono text-primary">%</span></span>
            </div>
            <Button
              variant="x402"
              size="lg"
              onClick={() => runLiveSimulation()}
              icon={<RefreshCw className="w-5 h-5 fill-current animate-spin-slow" />}
              className="w-full sm:w-auto shadow-2xl font-heading font-black tracking-wider px-6 py-4"
            >
              ▶ Refresh Live Telemetry
            </Button>
          </div>
        </div>

        {/* Ambient background glows */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      </GlassCard>

      {/* ========================================================================= */}
      {/* 2. TOP KPI METRIC MATRIX (8 PREDICTIVE CARDS) */}
      {/* ========================================================================= */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <Card key={i} className="p-6 h-[160px] flex flex-col justify-between">
              <Skeleton className="w-3/4 h-4 rounded" />
              <Skeleton className="w-1/2 h-10 rounded-lg mt-2" />
              <Skeleton className="w-full h-3 rounded mt-auto" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          <KPICard
            title="Total Infrastructure Projects"
            value="240 Projects"
            change="+18 this month"
            isPositive={true}
            subValue="Across 5 Indian States"
            icon={<Layers className="w-4 h-4 text-cyan-400" />}
            glowColor="cyan"
          />
          <KPICard
            title="Autonomous AI Verified"
            value="218 Verified"
            change="90.8% Auto-Clearance"
            isPositive={true}
            subValue="Zero human bureaucracy hold"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            glowColor="emerald"
          />
          <KPICard
            title="Gaussian AI Precision"
            value="99.4% Accuracy"
            change="LiDAR + Thermal Vision"
            isPositive={true}
            subValue="0.6% false anomaly rate"
            icon={<Cpu className="w-4 h-4 text-purple-400" />}
            glowColor="purple"
          />
          <KPICard
            title="Average Verification Time"
            value="1.4 Seconds"
            change="vs 30 Days Legacy"
            isPositive={true}
            subValue="99.9% acceleration in payouts"
            icon={<Zap className="w-4 h-4 text-amber-400" />}
            glowColor="amber"
          />
          <KPICard
            title="Escrow Liquidity Released"
            value="₹44.18 Cr"
            change="84.3% Cleared Pool"
            isPositive={true}
            subValue="Instant Bank Account Transfer"
            icon={<Unlock className="w-4 h-4 text-emerald-400" />}
            glowColor="emerald"
          />
          <KPICard
            title="Locked Escrow Treasury"
            value="₹52.40 Cr"
            change="In Sovereign Vaults"
            isPositive={true}
            subValue="Zero admin pause backdoors"
            icon={<Lock className="w-4 h-4 text-cyan-400" />}
            glowColor="cyan"
          />
          <KPICard
            title="Active Onboarded Contractors"
            value="48 Active Firms"
            change="100% L402 Compliant"
            isPositive={true}
            subValue="Machine-to-machine enabled"
            icon={<Award className="w-4 h-4 text-purple-400" />}
            glowColor="purple"
          />
          <KPICard
            title="Avg Model Confidence Score"
            value="96.8% Score"
            change="Threshold > 90% Spec"
            isPositive={true}
            subValue="High confidence across feeds"
            icon={<Activity className="w-4 h-4 text-amber-400" />}
            glowColor="cyan"
            className="lg:col-span-1"
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. REAL-TIME FILTER AND SLICE COMMAND BAR */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl bg-surface border border-subtle shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-primary">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span className="uppercase tracking-wider">Telemetry Slicing Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Time Range Selector */}
          <div className="flex items-center gap-1.5 bg-surface-secondary p-1 rounded-xl border border-subtle text-xs">
            {['24H', '7D', '30D', 'Q3', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedTimeRange === range
                    ? 'bg-cyan-400 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* State Filter */}
          <div className="bg-surface-secondary px-3 py-1.5 rounded-xl border border-subtle text-xs flex items-center gap-1">
            <span className="text-secondary font-bold">State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent text-cyan-300 font-extrabold focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-surface-secondary text-primary">All Indian States</option>
              <option value="Maharashtra" className="bg-surface-secondary text-primary">Maharashtra (MH)</option>
              <option value="Karnataka" className="bg-surface-secondary text-primary">Karnataka (KA)</option>
              <option value="Gujarat" className="bg-surface-secondary text-primary">Gujarat (GU)</option>
              <option value="Tamil Nadu" className="bg-surface-secondary text-primary">Tamil Nadu (TN)</option>
              <option value="Uttar Pradesh" className="bg-surface-secondary text-primary">Uttar Pradesh (UP)</option>
            </select>
          </div>

          {/* Confidence Filter */}
          <div className="bg-surface-secondary px-3 py-1.5 rounded-xl border border-subtle text-xs flex items-center gap-1">
            <span className="text-secondary font-bold">AI Confidence:</span>
            <select
              value={selectedConfidence}
              onChange={(e) => setSelectedConfidence(e.target.value)}
              className="bg-transparent text-emerald-300 font-extrabold focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-surface-secondary text-primary">All Confidence Tiers</option>
              <option value="HIGH" className="bg-surface-secondary text-primary">&gt; 95% High Confidence</option>
              <option value="BORDERLINE" className="bg-surface-secondary text-primary">90% - 95% Verified Pass</option>
              <option value="FLAGGED" className="bg-surface-secondary text-primary">&lt; 90% Manual Flagged</option>
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MASTER INTERACTIVE TAB SELECTOR */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface p-2.5 rounded-2xl border border-subtle shadow-xl">
        <div className="flex items-center gap-2 overflow-x-auto w-full no-scrollbar">
          {[
            { id: 'ai' as const, label: '🤖 AI Performance & Vision Models', badge: '99.4% ACC' },
            { id: 'escrow' as const, label: '💰 Escrow & x402 Micropayments', badge: '₹96.58 CR' },
            { id: 'blockchain' as const, label: '⛓️ Blockchain Gas & Throughput', badge: '1,420 TPS' },
            { id: 'contractors' as const, label: '🏗️ Contractor Leaderboard', badge: '48 FIRMS' },
            { id: 'heatmap' as const, label: '🗺️ District Project Heatmap', badge: '6 HUBS' },
            { id: 'predictive' as const, label: '🔮 Predictive Intelligence Cards', badge: '4 AI INSIGHTS' },
            { id: 'reports' as const, label: '📑 Report Export & Compliance Hub', badge: '1-CLICK EXPORT' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap select-none ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-2 border-cyan-400 font-extrabold shadow-[0_0_25px_rgba(6,182,212,0.35)]'
                  : 'text-secondary hover:text-primary hover:bg-surface-secondary border border-transparent'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                activeTab === tab.id ? 'bg-cyan-400 text-slate-950 font-black' : 'bg-surface-secondary text-primary font-bold'
              }`}>
                {tab.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: AI PERFORMANCE & VISION MODEL ANALYTICS */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait">
        {activeTab === 'ai' && (
          <motion.div
            key="tab-ai"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Chart 1: Model Accuracy vs Verification Speed Trend */}
              <Card className="p-6 bg-surface border border-cyan-500/40 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-subtle pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-primary font-heading uppercase flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                      <span>Model Accuracy Trend vs. Inspection Velocity</span>
                    </h3>
                    <span className="text-xs text-secondary font-mono">Precision scaling upwards while inference times compress below 1.5s</span>
                  </div>
                  <Badge variant="cyan">99.4% PRECISION</Badge>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={aiPerformanceData}>
                      <defs>
                        <linearGradient id="accGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.4} />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[90, 100]} unit="%" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#06b6d4', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="accuracy" name="AI Precision (%)" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#accGlow)" />
                      <Line type="monotone" dataKey="confidence" name="Confidence Avg (%)" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Chart 2: Multi-Model Competency Radar */}
              <Card className="p-6 bg-surface border border-purple-500/40 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-subtle pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-primary font-heading uppercase flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-purple-400" />
                      <span>Multi-Model AI Competency Radar</span>
                    </h3>
                    <span className="text-xs text-secondary font-mono">Evaluating LiDAR, EXIF GPS, Concrete Hydration & x402 Gas</span>
                  </div>
                  <Badge variant="blue">ALL MODELS HEALTHY</Badge>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={modelRadarData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="metric" stroke="#cbd5e1" fontSize={10} fontWeight="bold" />
                      <PolarRadiusAxis stroke="#64748b" domain={[80, 100]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#a855f7', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}
                      />
                      <Radar name="Model Actual Score" dataKey="score" stroke="#a855f7" fill="#a855f7" fillOpacity={0.5} strokeWidth={2} />
                      <Radar name="SIH Required Target" dataKey="target" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} strokeWidth={1} strokeDasharray="4 4" />
                      <Legend iconType="circle" />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

            </div>

            {/* AI Confidence Distribution Breakdown Bar */}
            <Card className="p-6 bg-surface border border-subtle shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-subtle pb-3 flex-wrap gap-2">
                <h3 className="text-sm font-extrabold text-primary font-heading uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span>AI Structural Confidence Score Distribution (2,182 Total Analyses)</span>
                </h3>
                <span className="text-xs font-mono text-emerald-400 font-bold">98.5% Above Manual Hold Threshold</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {confidenceDistributionData.map((d, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-surface-secondary border border-subtle space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-secondary font-bold">{d.range}</span>
                      <span className="text-xs font-black px-2 py-0.5 rounded text-primary" style={{ backgroundColor: d.color }}>
                        {d.percentage}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-primary font-heading">
                      {d.count.toLocaleString()} <span className="text-xs font-mono text-secondary">Proofs</span>
                    </div>
                    <div className="w-full bg-surface-secondary h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: d.percentage, backgroundColor: d.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ESCROW & x402 MICROPAYMENTS ANALYTICS */}
        {/* ========================================================================= */}
        {activeTab === 'escrow' && (
          <motion.div
            key="tab-escrow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Daily Escrow Disbursements Bar Chart (2 cols) */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-surface border border-emerald-500/40 shadow-xl h-full space-y-6">
                  <div className="flex items-center justify-between border-b border-subtle pb-4">
                    <div>
                      <h3 className="text-base font-extrabold text-primary font-heading uppercase flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-emerald-400" />
                        <span>Daily Escrow Disbursements & Payout Count</span>
                      </h3>
                      <span className="text-xs text-secondary font-mono">Direct autonomous payouts to contractor commercial accounts</span>
                    </div>
                    <Badge variant="emerald">₹19.6 CR THIS WEEK</Badge>
                  </div>

                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dailySettlementsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.4} />
                        <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                        <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} unit=" Cr" />
                        <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} tickLine={false} unit=" Txns" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#10b981', borderRadius: '12px', fontSize: '12px' }}
                        />
                        <Bar yAxisId="left" dataKey="released" name="Released Liquidity (₹ Cr)" fill="#10b981" radius={[6, 6, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="count" name="Tranche Transactions" stroke="#06b6d4" strokeWidth={3} dot={{ r: 5 }} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* Escrow Pool Ratio Donut Card (1 col) */}
              <Card className="p-6 bg-surface border border-cyan-500/40 shadow-xl flex flex-col justify-between space-y-6">
                <div className="flex items-center justify-between border-b border-subtle pb-4">
                  <h3 className="text-base font-extrabold text-primary font-heading uppercase flex items-center gap-2">
                    <PieIcon className="w-5 h-5 text-cyan-400" />
                    <span>National Escrow Pool</span>
                  </h3>
                  <Badge variant="cyan">₹96.58 CR</Badge>
                </div>

                <div className="h-56 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Released Escrow', value: 44.18, color: '#10b981' },
                          { name: 'Locked Vaults', value: 52.40, color: '#06b6d4' },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell key="cell-0" fill="#10b981" stroke="#10b981" />
                        <Cell key="cell-1" fill="#06b6d4" stroke="#06b6d4" />
                      </Pie>
                      <Tooltip 
                        formatter={(val: number) => `₹${val} Cr`}
                        contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#06b6d4', borderRadius: '12px', fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3 font-mono text-xs border-t border-subtle pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-400 block" />
                      Released to Contractors:
                    </span>
                    <strong className="text-primary">₹44.18 Cr (45.7%)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-cyan-400 block" />
                      Locked in Smart Vaults:
                    </span>
                    <strong className="text-primary">₹52.40 Cr (54.3%)</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-secondary border border-subtle text-[11px] text-secondary leading-normal">
                    ⚡ All locked funds are governed entirely by autonomous smart contracts with zero human override privileges.
                  </div>
                </div>
              </Card>

            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: BLOCKCHAIN ANALYTICS (GAS & TPS) */}
        {/* ========================================================================= */}
        {activeTab === 'blockchain' && (
          <motion.div
            key="tab-blockchain"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-surface border border-yellow-500/40 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-subtle pb-4 flex-wrap gap-2">
                <div>
                  <h3 className="text-lg font-black text-primary font-heading uppercase flex items-center gap-2">
                    <Flame className="w-5 h-5 text-yellow-400 animate-bounce" />
                    <span>x402 Micro-Gas Optimization & Etherscan Throughput</span>
                  </h3>
                  <span className="text-xs text-secondary font-mono">Consistently clearing 1,420 TPS at $0.05 USDC per validation challenge</span>
                </div>
                <Badge variant="amber">GAS SAVINGS: 94.2%</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-surface border border-subtle space-y-2">
                  <span className="text-[10px] text-secondary uppercase font-bold">Total Smart Contract Calls</span>
                  <div className="text-3xl font-black text-yellow-400 font-heading">14,820 <span className="text-xs font-mono text-primary">Invocations</span></div>
                  <span className="text-xs text-emerald-400 block">100% On-Chain finality rate</span>
                </div>

                <div className="p-5 rounded-2xl bg-surface border border-subtle space-y-2">
                  <span className="text-[10px] text-secondary uppercase font-bold">Avg x402 Macaroon Gas Fee</span>
                  <div className="text-3xl font-black text-cyan-400 font-heading">$0.05 <span className="text-xs font-mono text-primary">USDC</span></div>
                  <span className="text-xs text-cyan-300 block">Zero banking transaction commissions</span>
                </div>

                <div className="p-5 rounded-2xl bg-surface border border-subtle space-y-2">
                  <span className="text-[10px] text-secondary uppercase font-bold">Immutable Receipt Stamping</span>
                  <div className="text-3xl font-black text-emerald-400 font-heading">100% <span className="text-xs font-mono text-primary">Sync Rate</span></div>
                  <span className="text-xs text-secondary block">RSA-4096 cryptographic signatures</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-secondary border border-subtle flex items-center justify-between text-xs">
                <span className="text-primary font-mono">
                  ⛓️ Active Consensus Layer: <strong className="text-yellow-400">SIH Sovereign L1 (Chain ID #402)</strong>
                </span>
                <Button variant="outline" size="sm" onClick={() => alert('Viewing live RPC validator endpoint status...')}>
                  Inspect RPC Validator Status
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CONTRACTOR LEADERBOARD & PERFORMANCE TABLE */}
        {/* ========================================================================= */}
        {activeTab === 'contractors' && (
          <motion.div
            key="tab-contractors"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-surface border border-purple-500/40 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-subtle pb-4 flex-wrap gap-2">
                <div>
                  <h3 className="text-base font-extrabold text-primary font-heading uppercase flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-400" />
                    <span>Contractor Performance & AI Clearance Leaderboard</span>
                  </h3>
                  <span className="text-xs text-secondary font-mono">Tracking proof quality, first-attempt verification rate, and execution speed</span>
                </div>
                <Badge variant="blue">48 ONBOARDED FIRMS</Badge>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-subtle text-secondary uppercase text-[10px]">
                      <th className="py-3 px-3 font-bold">Contractor Firm // Wallet</th>
                      <th className="py-3 px-3 font-bold">Assigned Projects</th>
                      <th className="py-3 px-3 font-bold">AI First-Try Success Rate</th>
                      <th className="py-3 px-3 font-bold">Avg Milestone Speed</th>
                      <th className="py-3 px-3 font-bold">Total Disbursed Volume</th>
                      <th className="py-3 px-3 font-bold text-right">Operational Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D6D0C4]">
                    {contractorAnalyticsData.map((c) => (
                      <tr key={c.id} className="hover:bg-purple-500/5 transition-colors">
                        <td className="py-4 px-3">
                          <span className="font-heading font-extrabold text-primary text-sm block">{c.name}</span>
                          <span className="text-[10px] text-cyan-400 font-mono block">{c.wallet}</span>
                        </td>
                        <td className="py-4 px-3 font-bold text-primary">
                          {c.projects} Active Corridors
                        </td>
                        <td className="py-4 px-3">
                          <span className={`font-black text-sm font-heading ${c.successRate > 98 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {c.successRate}%
                          </span>
                          <span className="text-[10px] text-secondary block">AI Confidence Pass</span>
                        </td>
                        <td className="py-4 px-3 font-extrabold text-primary">
                          {c.avgCompletion}
                        </td>
                        <td className="py-4 px-3 font-heading font-black text-emerald-400 text-base">
                          {c.totalSettled}
                        </td>
                        <td className="py-4 px-3 text-right">
                          <Badge variant={c.status.includes('EXCELLENT') ? 'emerald' : c.status.includes('COMPLIANT') ? 'blue' : 'amber'} size="sm">
                            {c.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: INTERACTIVE DISTRICT PROJECT HEATMAP */}
        {/* ========================================================================= */}
        {activeTab === 'heatmap' && (
          <motion.div
            key="tab-heatmap"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-surface border border-cyan-500/40 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-subtle pb-4 flex-wrap gap-2">
                <div>
                  <h3 className="text-base font-extrabold text-primary font-heading uppercase flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <span>Geographic Infrastructure Density & Corridor Heatmap</span>
                  </h3>
                  <span className="text-xs text-secondary font-mono">Interactive inspection of multi-crore investments across key Indian districts</span>
                </div>
                <Badge variant="cyan">6 CRITICAL HUBS ACTIVE</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectHeatmapData.map((h) => (
                  <div 
                    key={h.id} 
                    className="p-5 rounded-2xl bg-surface border border-subtle hover:border-cyan-500/50 transition-all shadow-lg flex flex-col justify-between space-y-4 group cursor-pointer"
                    onClick={() => alert(`Opening deep GIS telemetry map for ${h.district} (${h.state})...`)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant={h.color as any} size="sm">{h.density}</Badge>
                        <span className="text-secondary text-[10px] font-bold uppercase">{h.state}</span>
                      </div>
                      <h4 className="text-base font-heading font-extrabold text-primary group-hover:text-cyan-300 transition-colors">
                        {h.district}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-subtle flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-secondary block">Allocated Vault Budget:</span>
                        <strong className="text-emerald-400 font-black font-heading text-sm">{h.budget}</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-secondary block">Operational Status:</span>
                        <strong className={`font-mono text-[11px] ${h.status.includes('NORMAL') ? 'text-cyan-300' : 'text-amber-400'}`}>
                          ● {h.status}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: PREDICTIVE INTELLIGENCE CARDS (PALANTIR GOTHAM AI INSIGHTS) */}
        {/* ========================================================================= */}
        {activeTab === 'predictive' && (
          <motion.div
            key="tab-predictive"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between px-2">
              <div>
                <h3 className="text-xl font-black text-primary font-heading tracking-tight flex items-center gap-2.5">
                  <Flame className="w-6 h-6 text-amber-400 animate-bounce" />
                  <span>AI Predictive Foresight & Risk Horizon</span>
                </h3>
                <p className="text-xs text-secondary font-mono">
                  Autonomous deep learning models forecasting weather disruptions, structural wear, and future escrow disbursement trajectories.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => runLiveSimulation()} icon={<RefreshCw className="w-4 h-4 text-amber-400 animate-spin-slow" />}>
                Re-Run Forecast Models
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {predictiveInsightsData.map((ins) => (
                <NotificationCard
                  key={ins.id}
                  title={ins.title}
                  description={ins.desc}
                  timestamp={`AI CONFIDENCE: ${ins.confidence} // ${ins.category}`}
                  severity={ins.severity}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: REPORT CENTER & COMPLIANCE DOWNLOADING HUB */}
        {/* ========================================================================= */}
        {activeTab === 'reports' && (
          <motion.div
            key="tab-reports"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <Card className="p-8 bg-surface border border-emerald-500/40 shadow-2xl space-y-8">
              <div className="flex items-center justify-between border-b border-subtle pb-5 flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-black text-primary font-heading uppercase flex items-center gap-2.5">
                    <FileText className="w-6 h-6 text-emerald-400" />
                    <span>Executive Analytics Report & Export Center</span>
                  </h3>
                  <p className="text-xs text-secondary font-mono mt-1">
                    Generate digitally verified SIH inspection reports, raw dataset CSVs, and comprehensive PDF analytics decks.
                  </p>
                </div>
                <Badge variant="emerald">SIH AUDIT READY</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-surface border border-subtle space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black">
                      PDF
                    </div>
                    <h4 className="text-base font-heading font-extrabold text-primary">Executive SIH Deck (PDF)</h4>
                    <p className="text-xs text-secondary font-mono leading-relaxed">
                      Comprehensive graphical report featuring all Recharts model curves, contractor rankings, and national savings calculations.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    disabled={isExporting}
                    onClick={() => handleExport('Executive PDF Deck')}
                    icon={<Download className="w-4 h-4 text-primary" />}
                    className="w-full font-sans font-bold"
                  >
                    {isExporting ? 'Generating PDF...' : 'Download Executive PDF'}
                  </Button>
                </div>

                <div className="p-6 rounded-2xl bg-surface border border-subtle space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black">
                      CSV
                    </div>
                    <h4 className="text-base font-heading font-extrabold text-primary">Raw Telemetry Dataset (CSV)</h4>
                    <p className="text-xs text-secondary font-mono leading-relaxed">
                      Unfiltered tabular CSV feed of all 2,182 structural EXIF inspections, timestamps, gas fees, and hash signatures.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    disabled={isExporting}
                    onClick={() => handleExport('Raw Telemetry CSV')}
                    icon={<ExternalLink className="w-4 h-4 text-emerald-400" />}
                    className="w-full font-sans font-bold text-primary"
                  >
                    {isExporting ? 'Exporting CSV...' : 'Export Telemetry CSV'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};
