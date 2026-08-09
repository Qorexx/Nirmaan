'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Download, CheckCircle2, Lock, Cpu, Search, Filter, Layers, Award, ExternalLink, RefreshCw } from 'lucide-react';
import { useEscrowStore } from '@/lib/store';
import { Button, Card, GlassCard, KPICard, Badge, Input } from '@/components/ui';

const ComplianceDashboardPage: React.FC = () => {
  const { projects, autonomousDecisionsCount } = useEscrowStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const auditDossiers = [
    { id: 'AUD-2026-081', project: 'NH-44 Highway Expansion & Sector 9 Culvert', hash: '0x8f2c7a91b4e0d3f2c5a718b2019c4021', score: 98.4, status: 'VERIFIED TAMPER-PROOF', date: 'August 2026', inspector: 'Sovereign AI Node #01' },
    { id: 'AUD-2026-082', project: 'SunGrid Phase II Micro-Power Junctions', hash: '0x3c9a1b82f4e910c8e7a1b2d010048bc2', score: 99.1, status: 'VERIFIED TAMPER-PROOF', date: 'July 2026', inspector: 'Sovereign AI Node #04' },
    { id: 'AUD-2026-083', project: 'Metro Line 4 Elevated Station Pillars', hash: '0x9a8b7c6d5e4f3a2b1c0d9e80209ab910', score: 97.8, status: 'VERIFIED TAMPER-PROOF', date: 'July 2026', inspector: 'Sovereign AI Node #02' },
    { id: 'AUD-2026-084', project: 'Southern Coastal Seawall Reinforcement', hash: '0x1290ab4810298440bc90184a00918002', score: 96.5, status: 'VERIFIED TAMPER-PROOF', date: 'June 2026', inspector: 'Sovereign AI Node #01' },
    { id: 'AUD-2026-085', project: 'Smart Water IoT Valve Retrofitting', hash: '0x55018cb9010488219ab9021811802bc9', score: 99.5, status: 'VERIFIED TAMPER-PROOF', date: 'June 2026', inspector: 'Sovereign AI Node #03' }
  ];

  const filteredDossiers = auditDossiers.filter(d => 
    d.project.toLowerCase().includes(searchQuery.toLowerCase()) || d.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 font-mono pb-24 text-primary max-w-[1750px] mx-auto">

      {/* 1. HERO COMPLIANCE SUITE */}
      <GlassCard intensity="high" className="relative overflow-hidden border-2 border-emerald-500/40 shadow-[0_0_80px_rgba(16,185,129,0.15)] bg-gradient-to-r from-[#061413] via-[#0A181C] to-[#0A0D18]">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="emerald" icon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}>
                📜 IMMUTABLE AUDIT & COMPLIANCE TIER // NATIONAL LEDGER
              </Badge>
              <span className="text-[11px] font-mono text-accent-cyan font-extrabold bg-cyan-500/10 px-3 py-1 rounded-md border border-cyan-500/30">
                ANTI-CORRUPTION PROTOCOL: 100% SECURED
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-primary font-heading tracking-tight leading-tight">
              Sovereign Regulatory & Anti-Corruption Registry
            </h1>

            <p className="text-xs sm:text-sm text-primary font-mono leading-relaxed">
              Tamper-proof cryptographic inspection dossiers, historical EXIF GPS binding signatures, and real-time oversight verification ensuring complete governmental transparency without human bureaucratic manipulation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <div className="px-5 py-3 rounded-2xl bg-surface border-2 border-emerald-500/40 text-center sm:text-right shadow-2xl w-full sm:w-auto">
              <span className="text-[10px] text-secondary uppercase font-bold block">Archived Audit Records</span>
              <span className="text-3xl font-black text-emerald-400 font-heading tracking-tight">{autonomousDecisionsCount.toLocaleString()} <span className="text-xs font-mono text-primary">Dossiers</span></span>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => alert('Downloading National Gov Regulatory Master Archive (GZIP Bundle)...')}
              icon={<Download className="w-5 h-5 text-emerald-400" />}
              className="w-full sm:w-auto font-heading font-black px-6 py-4 border-emerald-500/50 text-accent-emerald"
            >
              Export Master Archive
            </Button>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </GlassCard>

      {/* 2. OVERVIEW KPI DECK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Cryptographic Dossiers"
          value="2,182 Records"
          change="100% Immutable Sync"
          isPositive={true}
          subValue="Zero modification privileges"
          icon={<FileText className="w-4 h-4 text-emerald-400" />}
          glowColor="emerald"
        />
        <KPICard
          title="Anti-Corruption Index"
          value="100.0% Verified"
          change="Zero Human Intermission"
          isPositive={true}
          subValue="Direct AI to x402 consensus"
          icon={<ShieldCheck className="w-4 h-4 text-cyan-400" />}
          glowColor="cyan"
        />
        <KPICard
          title="National Oversight Grade"
          value="Tier-1 Superior"
          change="Gov Standard Met"
          isPositive={true}
          subValue="Ministry inspection approved"
          icon={<Award className="w-4 h-4 text-amber-400" />}
          glowColor="amber"
        />
      </div>

      {/* 3. MASTER REGULATORY DOSSIERS REGISTER */}
      <Card className="p-6 bg-surface border border-emerald-500/40 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-subtle pb-5">
          <div>
            <h3 className="text-lg font-black text-primary font-heading uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>Signed Regulatory Audit Dossiers Register</span>
            </h3>
            <span className="text-xs text-secondary font-mono">Select any cryptographic record to download official state-verified PDF audit bundles</span>
          </div>

          <div className="w-full sm:w-80">
            <Input
              placeholder="Search by Dossier ID or Project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-emerald-400" />}
            />
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {filteredDossiers.map((item, idx) => (
            <div key={item.id} className="p-5 rounded-2xl bg-surface border border-subtle hover:border-emerald-500/40 transition-all shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 font-extrabold border border-emerald-500/30 text-xs">
                    #{idx + 1} // {item.id}
                  </span>
                  <span className="font-heading font-extrabold text-primary text-base group-hover:text-accent-emerald transition-colors">
                    {item.project}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-secondary text-[11px]">
                  <span>Cryptographic Hash: <strong className="text-accent-cyan select-all">{item.hash}</strong></span>
                  <span>•</span>
                  <span>Inspector: <strong className="text-primary">{item.inspector}</strong> ({item.date})</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end shrink-0">
                <div className="text-right hidden md:block mr-2">
                  <span className="text-emerald-400 font-black text-sm block font-heading">{item.score}% Pass</span>
                  <span className="text-[9px] text-emerald-400 font-bold uppercase">{item.status}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Downloading signed PDF dossier for ${item.id} (${item.project})...`)}
                  icon={<Download className="w-4 h-4 text-emerald-400" />}
                  className="w-full sm:w-auto text-xs border-subtle hover:border-emerald-400 text-primary"
                >
                  Download PDF Dossier
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};



export default ComplianceDashboardPage;

