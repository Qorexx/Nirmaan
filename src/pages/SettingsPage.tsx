import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Sliders, ShieldCheck, Save, RefreshCw, Lock, Cpu, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useEscrowStore } from '../store/useEscrowStore';
import { Button, Card, GlassCard, Badge, Input } from '../components/ui';

export const SettingsPage: React.FC = () => {
  const { resetSimulation } = useEscrowStore();
  const [threshold, setThreshold] = useState(95.0);
  const [maxPayout, setMaxPayout] = useState(25000000);
  const [autoSettle, setAutoSettle] = useState(true);
  const [x402GasLimit, setX402GasLimit] = useState('0.10');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    alert('✔ Sovereign OS Policies and AI Thresholds successfully compiled and committed to Smart Contract consensus!');
  };

  return (
    <div className="space-y-10 font-mono pb-24 text-slate-100 selection:bg-cyan-400 selection:text-slate-950 max-w-4xl mx-auto">
      
      {/* 1. HERO CONFIG DECK */}
      <GlassCard intensity="high" className="p-8 border-2 border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.15)] bg-gradient-to-r from-[#07131F] via-[#0A1020] to-[#110D20]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <Badge variant="cyan" icon={<Settings className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />}>
              ⚙️ SOVEREIGN KERNEL CONFIGURATION // SIH ROOT ADMIN
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
              AI & Autonomous Escrow Policy Suite
            </h1>
            <p className="text-xs sm:text-sm text-primary font-mono leading-relaxed">
              Adjust global computer vision confidence thresholds, configure zero-latency maximum payout ceilings, and manage HTTP 402 micro-gas limits.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* 2. MASTER SETTINGS FORMS */}
      <Card className="p-8 bg-surface border border-subtle shadow-2xl space-y-8">
        
        {/* Section A: AI Confidence Threshold */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-extrabold text-primary font-heading uppercase flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span>Vision AI Minimum Confidence Threshold</span>
            </label>
            <Badge variant="emerald" size="md">{threshold}% CONFIDENCE</Badge>
          </div>
          <p className="text-xs text-secondary font-mono leading-relaxed">
            If an autonomous computer vision inspection scores below this threshold, automatic bank transfers halt immediately and trigger an anomaly flag for human oversight.
          </p>
          <div className="pt-2">
            <input 
              type="range" min="80" max="99" step="0.5" value={threshold} 
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full cursor-pointer accent-cyan-400 h-2 bg-surface-secondary rounded-lg shadow-inner" 
            />
            <div className="flex justify-between text-[10px] text-secondary font-bold mt-1">
              <span>80.0% (Lenient)</span>
              <span>90.0% (SIH Target)</span>
              <span>95.0% (Strict Enterprise)</span>
              <span>99.0% (Ultra Secure)</span>
            </div>
          </div>
        </div>

        {/* Section B: Automated Payout Ceiling */}
        <div className="space-y-3 pt-6 border-t border-subtle">
          <div className="flex items-center justify-between">
            <label className="text-sm font-extrabold text-primary font-heading uppercase flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-400" />
              <span>Maximum Automated Zero-Latency Payout Ceiling</span>
            </label>
            <Badge variant="amber" size="md">₹{(maxPayout/100000).toFixed(2)} LAKHS</Badge>
          </div>
          <p className="text-xs text-secondary font-mono leading-relaxed">
            Any single tranche disbursement exceeding this ceiling will require multi-signature cryptographic authorization from the Ministry Governance Council before funds unlock.
          </p>
          <Input
            type="number"
            value={maxPayout}
            onChange={(e) => setMaxPayout(Number(e.target.value))}
            className="text-amber-400 font-bold font-sans text-base"
          />
        </div>

        {/* Section C: x402 Macaroon Gas Ceiling */}
        <div className="space-y-3 pt-6 border-t border-subtle">
          <div className="flex items-center justify-between">
            <label className="text-sm font-extrabold text-primary font-heading uppercase flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400 animate-bounce" />
              <span>HTTP 402 Machine Validation Gas Cap (USDC)</span>
            </label>
            <Badge variant="cyan" size="md">${x402GasLimit} USDC / PROOF</Badge>
          </div>
          <p className="text-xs text-secondary font-mono leading-relaxed">
            Set the maximum micro-payment fee allowed per automated LiDAR or drone photographic validation challenge.
          </p>
          <Input
            type="text"
            value={x402GasLimit}
            onChange={(e) => setX402GasLimit(e.target.value)}
            placeholder="0.10"
          />
        </div>

        {/* Action Button Strip */}
        <div className="pt-6 border-t border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="outline"
            size="md"
            onClick={() => resetSimulation()}
            icon={<RefreshCw className="w-4 h-4 text-primary" />}
          >
            Reset All Simulation Telemetry to Default
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            icon={isSaved ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Save className="w-5 h-5 text-yellow-400" />}
            className="w-full sm:w-auto font-heading font-black tracking-wider px-8"
          >
            {isSaved ? '✔ Policies Committed' : 'Commit Changes to OS Kernel'}
          </Button>
        </div>

      </Card>

    </div>
  );
};
