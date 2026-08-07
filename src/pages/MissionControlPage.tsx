import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Terminal as TerminalIcon, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Zap, 
  Radio, 
  Play, 
  RefreshCw, 
  ExternalLink, 
  Lock, 
  Unlock, 
  Wifi, 
  ShieldCheck, 
  Sliders, 
  Globe2, 
  Layers, 
  ArrowRight, 
  Database, 
  Server, 
  Key, 
  Compass, 
  Flame, 
  DollarSign, 
  ShieldAlert
} from 'lucide-react';
import { useEscrowStore } from '../store/useEscrowStore';
import { HorizontalStagePipeline } from '../components/workflow/HorizontalStagePipeline';
import { 
  Button, 
  Card, 
  GlassCard, 
  Badge, 
  ProgressBar, 
  Timeline, 
  AnimatedBorder, 
  KPICard,
  StatCard
} from '../components/ui';

export const MissionControlPage: React.FC = () => {
  const { 
    stages, 
    logs, 
    currentStageIdx, 
    isSimulating, 
    runLiveSimulation, 
    resetSimulation, 
    activeDemoProject, 
    externalServices,
    projects,
    aiAccuracyRate,
    totalProtectedValue
  } = useEscrowStore();

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const logEndRef = useRef<HTMLDivElement | null>(null);
  const activeProject = activeDemoProject || projects[selectedProjectIndex] || projects[0];

  // Auto-scroll logs to bottom during live stream
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Derive simulation status flags for dramatic glowing UI updates
  const isComplete = currentStageIdx >= 11 || (!isSimulating && logs.length > 11);
  const activeStageObject = stages[currentStageIdx] || stages[11];
  const isPaymentStage = currentStageIdx >= 5 && currentStageIdx <= 7;
  const isChainStage = currentStageIdx >= 8 && currentStageIdx <= 11;
  const isAiStage = currentStageIdx >= 1 && currentStageIdx <= 4;

  return (
    <div className="space-y-8 font-mono pb-16 text-slate-100 selection:bg-cyan-500 selection:text-obsidian">

      {/* ========================================================================= */}
      {/* 1. NASA MISSION CONTROL x PALANTIR GOTHAM HERO DECK */}
      {/* ========================================================================= */}
      <GlassCard intensity="high" borderGradient={true} className="relative overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_90px_rgba(6,182,212,0.25)]">
        {/* Animated radar grid overlay background */}
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/50 text-xs font-black uppercase animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                <Radio className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                <span>PALANTIR // NASA GOTHAM COMMAND HUD</span>
              </span>
              <Badge variant="cyan" icon={<Wifi className="w-3 h-3 text-cyan-400 animate-pulse" />}>
                SOVEREIGN TELEMETRY: 4.2ms PING
              </Badge>
              <Badge variant="gold">
                L402 MACHINE PROTOCOL
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-[#1C1917] font-sans tracking-tight leading-none uppercase drop-shadow-[0_2px_15px_rgba(0,242,255,0.3)]">
              Live Mission Control
            </h1>

            <p className="text-xs sm:text-sm text-[#44403C] font-mono leading-relaxed max-w-2xl">
              Real-time surveillance over AI computer vision extraction, automated HTTP 402 machine-to-machine gas payments ($0.05 USDC), and tamper-proof smart contract escrow vault disbursements. Zero manual bureaucracy.
            </p>
          </div>

          {/* Prominent Simulation Controls Theater */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0 bg-surface-secondary/90 p-4 rounded-3xl border border-subtle shadow-2xl">
            <AnimatedBorder borderColor={isSimulating ? 'amber-gold' : 'cyan-blue'} containerClassName="w-full sm:w-auto">
              <Button
                variant={isSimulating ? 'x402' : 'primary'}
                size="lg"
                onClick={() => runLiveSimulation()}
                disabled={isSimulating}
                icon={<Play className={`w-6 h-6 fill-current ${isSimulating ? 'animate-bounce text-slate-950' : 'text-slate-950'}`} />}
                className="w-full sm:w-auto text-base sm:text-lg font-black tracking-wider px-8 py-4 shadow-2xl"
              >
                {isSimulating ? '▶ SIMULATION ACTIVE...' : '▶ RUN LIVE DEMO'}
              </Button>
            </AnimatedBorder>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => resetSimulation()}
              title="Reset state and return to Stage 1"
              icon={<RefreshCw className="w-5 h-5 text-secondary hover:rotate-180 transition-transform" />}
              className="w-full sm:w-auto py-4"
            >
              Reset HUD
            </Button>
          </div>
        </div>

        {/* Live System Status Ticker */}
        <div className="relative z-10 mt-6 pt-4 border-t border-subtle grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
            <span>AI ENGINE: <strong className="text-primary">ONLINE (97.2%)</strong></span>
          </div>
          <div className="flex items-center gap-2 text-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F2FF]" />
            <span>ESCROW VAULTS: <strong className="text-primary">₹52.4M LOCKED</strong></span>
          </div>
          <div className="flex items-center gap-2 text-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
            <span>X402 GAS WALLET: <strong className="text-primary">500 USDC</strong></span>
          </div>
          <div className="flex items-center gap-2 text-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#A855F7]" />
            <span>HUMAN HOLDS: <strong className="text-emerald-400 font-extrabold">0 (AUTONOMOUS)</strong></span>
          </div>
        </div>
      </GlassCard>

      {/* ========================================================================= */}
      {/* 2. LIVE 6-STAGE WORKFLOW THEATER PIPELINE */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-black text-primary font-sans tracking-tight uppercase">
              Autonomous Escrow Workflow Pipeline
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-secondary">Target Digital Twin:</span>
            <span className="bg-blue-500/20 text-cyan-300 px-3 py-1 rounded-lg border border-blue-500/30 font-extrabold">
              {activeProject.name} ({activeProject.location})
            </span>
          </div>
        </div>

        {/* Master Pipeline Component */}
        <Card className="p-6 sm:p-8 bg-surface-secondary/95 border-2 border-cyan-500/40 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          <HorizontalStagePipeline />
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 3. THREE-COLUMN COMMAND CONSOLE (TERMINAL // WALLET // BLOCKCHAIN) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* COLUMN 1: NASA CRYPTOGRAPHIC TERMINAL STREAM */}
        <Card className="p-0 bg-surface border border-cyan-500/40 shadow-2xl flex flex-col h-[500px] overflow-hidden">
          <div className="px-5 py-3.5 bg-surface border-b border-subtle flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-extrabold text-primary uppercase tracking-wider">Autonomous Execution Stream</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
              LIVE TTY // 0x402A
            </span>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-3 font-mono text-xs text-secondary no-scrollbar select-all bg-surface/95">
            <div className="text-secondary opacity-70 border-b border-subtle pb-2 text-[11px]">
              [SYSTEM] Initializing Smart India Hackathon Autonomous Escrow OS v2.4... <br />
              [SYSTEM] Connected to Sovereign Treasury Vault: <span className="text-amber-400">0x9a4F...3B9c</span>
            </div>

            {logs.length === 0 ? (
              <div className="py-20 text-center text-secondary opacity-70 space-y-2">
                <Radio className="w-8 h-8 text-secondary animate-bounce mx-auto" />
                <p>Awaiting simulation demo trigger...</p>
                <span className="text-[11px] text-cyan-400 block">Click ▶ RUN LIVE DEMO to ignite pipeline</span>
              </div>
            ) : (
              logs.map((lg, i) => (
                <motion.div
                  key={lg.id || i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 rounded-xl border space-y-1.5 ${
                    lg.type === 'x402' ? 'bg-accent-gold/10 border-amber-500/50 text-amber-500' :
                    lg.type === 'success' ? 'bg-accent-emerald/10 border-emerald-500/50 text-emerald-500' :
                    lg.type === 'chain' ? 'bg-purple-500/10 border-purple-500/50 text-purple-500' :
                    'bg-surface-secondary border-cyan-500/30 text-primary'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
                    <span className="font-extrabold uppercase tracking-wide text-cyan-500">[{lg.stage}]</span>
                    <span>{lg.timestamp}</span>
                  </div>
                  <p className="text-xs leading-snug font-bold">{lg.message}</p>
                  {lg.txHash && (
                    <div className="text-[10px] text-emerald-500 font-mono flex items-center gap-1 pt-1 border-t border-subtle/30">
                      <span>Tx Receipt:</span> <strong className="select-all">{lg.txHash}</strong>
                    </div>
                  )}
                  {lg.confidence && (
                    <div className="text-[10px] text-purple-500 font-mono flex items-center gap-1 pt-1">
                      <span>Vision Confidence:</span> <strong>{lg.confidence}%</strong>
                    </div>
                  )}
                </motion.div>
              ))
            )}
            <div ref={logEndRef} />
          </div>

          <div className="px-4 py-2.5 bg-surface border-t border-subtle text-xs text-secondary flex items-center justify-between shrink-0">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="animate-pulse">●</span> TTY_402: READY
            </span>
            <span>ENCRYPTION: RSA_4096_L402</span>
          </div>
        </Card>

        {/* COLUMN 2: HTTP 402 MICROPAYMENT & MACHINE WALLET DECK */}
        <Card className={`p-6 border-2 transition-all duration-500 flex flex-col justify-between ${
          isPaymentStage ? 'bg-accent-gold/5 border-accent-gold shadow-[0_0_60px_rgba(245,158,11,0.3)] scale-102' : 'bg-surface border-subtle shadow-xl'
        }`}>
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-subtle">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-accent-gold/20 text-accent-gold border border-accent-gold/30">
                  <Zap className="w-5 h-5 fill-current animate-bounce" />
                </div>
                <div>
                  <h3 className="text-base font-black text-primary font-sans uppercase tracking-tight">HTTP 402 Machine Wallet</h3>
                  <span className="text-[10px] font-mono text-secondary block">L402 Macaroon Micro-gas protocol</span>
                </div>
              </div>
              <Badge variant="amber" size="sm">M2M ENABLED</Badge>
            </div>

            {/* Wallet Address & Liquidity Box */}
            <div className="bg-surface p-4 rounded-2xl border border-accent-gold/30 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-secondary font-mono">Agent Wallet ID:</span>
                <span className="text-accent-gold font-bold select-all font-mono">0x402A...E810</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-secondary font-mono">Available Gas Pool:</span>
                <span className="text-xl font-black text-primary font-sans">500.00 USDC</span>
              </div>
              <ProgressBar
                percentage={96.4}
                label="Macaroon Token Validity:"
                subValue="96.4% Reserve"
                color="amber"
                heightClass="h-2"
              />
            </div>

            {/* Live 402 Challenge Step Simulator */}
            <div className="space-y-2 font-mono text-xs">
              <span className="text-secondary text-[10px] font-bold uppercase block">Current Stage Challenge Status:</span>
              
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                currentStageIdx >= 7 ? 'bg-accent-emerald/10 border-accent-emerald/50 text-accent-emerald' : 'bg-surface-secondary border-subtle text-secondary'
              }`}>
                <span className="flex items-center gap-2 font-bold">
                  {currentStageIdx >= 7 ? <CheckCircle2 className="w-4 h-4 text-accent-emerald" /> : <Lock className="w-4 h-4 text-accent-gold" />}
                  <span>$0.05 USDC AI Verification Fee</span>
                </span>
                <span className="font-mono text-[10px] font-black">{currentStageIdx >= 7 ? '84 ms SETTLED' : 'CHALLENGE PENDING'}</span>
              </div>

              <p className="text-[11px] text-secondary leading-relaxed pt-1">
                When Vision AI verification initiates, an HTTP 402 status code is returned. The machine wallet presents an L402 Macaroon proof, completing the transaction autonomously without bank holds.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-subtle flex items-center justify-between text-xs text-secondary">
            <span>Protocol: <strong>Lightning L402</strong></span>
            <span className="text-accent-gold font-bold">0 Human Intervention</span>
          </div>
        </Card>

        {/* COLUMN 3: BLOCKCHAIN SETTLEMENT & ESCROW UNLOCK THEATER */}
        <Card className={`p-6 border-2 transition-all duration-500 flex flex-col justify-between ${
          isChainStage || isComplete ? 'bg-surface border-accent-emerald shadow-[0_0_60px_rgba(16,185,129,0.3)] scale-102' : 'bg-surface border-subtle shadow-xl'
        }`}>
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-subtle">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30">
                  <ShieldCheck className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-black text-primary font-sans uppercase tracking-tight">Sovereign Vault Status</h3>
                  <span className="text-[10px] font-mono text-secondary block">Immutable Blockchain Settlement</span>
                </div>
              </div>
              <Badge variant={isComplete || currentStageIdx >= 9 ? 'emerald' : 'rose'}>
                {isComplete || currentStageIdx >= 9 ? 'VAULT UNLOCKED' : 'VAULT LOCKED'}
              </Badge>
            </div>

            {/* Dramatic Lock / Unlock Animated Indicator Box */}
            <div className={`p-6 rounded-2xl border text-center space-y-3 transition-all ${
              isComplete || currentStageIdx >= 9 
                ? 'bg-gradient-to-br from-accent-emerald/20 via-surface to-surface border-accent-emerald/60 shadow-[0_0_35px_rgba(16,185,129,0.2)]'
                : 'bg-gradient-to-br from-rose-500/10 via-surface to-surface border-rose-500/30'
            }`}>
              <motion.div 
                key={isComplete || currentStageIdx >= 9 ? 'unlocked' : 'locked'}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-14 h-14 rounded-2xl bg-surface/50 border border-subtle flex items-center justify-center mx-auto shadow-lg"
              >
                {isComplete || currentStageIdx >= 9 ? (
                  <Unlock className="w-8 h-8 text-accent-emerald animate-bounce" />
                ) : (
                  <Lock className="w-8 h-8 text-rose-500" />
                )}
              </motion.div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary block">
                  {isComplete || currentStageIdx >= 9 ? 'MILESTONE PAYOUT RELEASED:' : 'FUNDS LOCKED IN TRANSIT:'}
                </span>
                <div className="text-3xl font-black text-primary font-sans mt-1 tracking-tight">
                  ₹{activeProject.budget.toLocaleString()}
                </div>
                <span className={`text-xs font-mono font-bold mt-1 block ${isComplete || currentStageIdx >= 9 ? 'text-accent-emerald' : 'text-accent-gold'}`}>
                  {isComplete || currentStageIdx >= 9 ? '✔ Transferred to Contractor Bank Wallet' : '⏳ Awaiting AI Structural Consensus'}
                </span>
              </div>
            </div>

            {/* On-Chain Receipt Details */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-secondary">
                <span className="text-secondary/70">Target Project:</span>
                <strong className="text-primary truncate max-w-[170px]">{activeProject.name}</strong>
              </div>
              <div className="flex items-center justify-between text-secondary">
                <span className="text-secondary/70">AI Vision Score:</span>
                <strong className="text-purple-500">{activeProject.aiScore || 97.2}% Precision</strong>
              </div>
              <div className="flex items-center justify-between text-secondary">
                <span className="text-secondary/70">Block Height:</span>
                <strong className="text-cyan-500">#19,482,904</strong>
              </div>
              <div className="flex items-center justify-between text-secondary">
                <span className="text-secondary/70">Tx Hash Stamp:</span>
                <span className="text-accent-emerald bg-surface-secondary px-2 py-0.5 rounded select-all text-[11px]">
                  {currentStageIdx >= 10 ? '0x7ab982...C420' : 'Pending...'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-subtle flex items-center justify-between text-xs text-secondary">
            <span>Verification: <strong>Zero-Knowledge L402</strong></span>
            <span className="text-cyan-500 font-bold">100% Finality</span>
          </div>
        </Card>

      </div>

      {/* ========================================================================= */}
      {/* 4. PALANTIR INFRASTRUCTURE SATELLITE FEED & HEALTH METRICS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard
          title="Vision AI Extraction"
          value="1.4 s"
          change="97.2% ACCURACY"
          isPositive={true}
          subValue="Gaussian Noise Removal + GIS Bounding"
          icon={<Cpu className="w-5 h-5 text-purple-400" />}
          glowColor="purple"
        />
        <KPICard
          title="x402 Micro-settlement"
          value="84 ms"
          change="HTTP 402 CLEARED"
          isPositive={true}
          subValue="$0.05 USDC Machine Gas Token"
          icon={<Zap className="w-5 h-5 text-amber-400 fill-current" />}
          glowColor="amber"
        />
        <KPICard
          title="Sovereign Ledger Sync"
          value="4.2 ms"
          change="100% UPTIME"
          isPositive={true}
          subValue="Block #19,482,904 finalized"
          icon={<Database className="w-5 h-5 text-emerald-400" />}
          glowColor="emerald"
        />
        <KPICard
          title="Human Bureaucracy Hold"
          value="0.00 s"
          change="100% AUTONOMIZED"
          isPositive={true}
          subValue="Zero manual inspection delays"
          icon={<ShieldCheck className="w-5 h-5 text-cyan-400" />}
          glowColor="cyan"
        />
      </div>

      {/* Footer Banner */}
      <div className="p-6 rounded-2xl bg-surface border border-subtle flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-secondary">
        <div className="flex items-center gap-3">
          <Globe2 className="w-5 h-5 text-cyan-500 animate-spin" style={{ animationDuration: '30s' }} />
          <span>MISSION CONTROL ARCHITECTURE CERTIFIED FOR SMART INDIA HACKATHON ENTERPRISE EXCELLENCE.</span>
        </div>
        <div className="flex items-center gap-4 text-primary font-bold">
          <span>SYSTEM LATENCY: <strong className="text-accent-emerald">4ms</strong></span>
          <span>•</span>
          <span>ARBITER PROTOCOL: <strong className="text-cyan-500">v2.4 LTS</strong></span>
        </div>
      </div>

    </div>
  );
};
