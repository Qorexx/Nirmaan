import React from 'react';
import { useEscrowStore } from '../store/useEscrowStore';
import { AnimatedGlobe } from '../components/globe/AnimatedGlobe';
import { HorizontalStagePipeline } from '../components/workflow/HorizontalStagePipeline';
import { BeforeAfterSlider } from '../components/digital-twin/BeforeAfterSlider';
import { 
  Play, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Cpu, 
  Award, 
  CheckCircle, 
  Lock, 
  Zap, 
  ChevronRight, 
  ExternalLink, 
  Sparkles 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { 
    runLiveSimulation, 
    setCurrentPage, 
    totalProtectedValue, 
    activeProjectsCount, 
    aiAccuracyRate, 
    autonomousDecisionsCount, 
    manualInterventions,
    projects
  } = useEscrowStore();

  const activeDemo = projects[0];

  return (
    <div className="min-h-screen pb-20 overflow-hidden text-slate-800">
      
      {/* 1. Apple-Inspired Cinematic Hero Section */}
      <section className="relative pt-12 sm:pt-16 pb-12 px-4 sm:px-6 max-w-[1700px] mx-auto flex flex-col items-center text-center">
        
        {/* Background Studio Light Diffusions */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/07 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/07 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center space-x-2.5 bg-surface border border-slate-200/90 px-4 py-1.5 rounded-full text-xs font-mono font-extrabold text-indigo-700 mb-6 shadow-sm hover:shadow-md hover:scale-105 transition-all">
          <Award className="w-4 h-4 text-amber-500" />
          <span className="tracking-tight">SMART INDIA HACKATHON (SIH) SOVEREIGN EXECUTIVE EDITION</span>
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 font-heading tracking-tight max-w-5xl leading-[1.08]">
          The <span className="text-gradient-cyan">Autonomous Infrastructure</span> Operating System
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-600 font-heading font-normal max-w-3xl mt-6 leading-relaxed">
          AI-powered civil verification, zero-latency <strong className="text-indigo-600 font-mono font-bold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">x402 machine-to-machine payments</strong>, blockchain-backed trust escrow, and transparent sovereign infrastructure governance.
        </p>

        {/* Animated Globe Canvas Centerpiece */}
        <div className="my-6 -mt-2">
          <AnimatedGlobe />
        </div>

        {/* High-Impact SIH Stat Cascade (Apple Cupertino Grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-6xl mt-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-200/90 bg-surface text-center hover:scale-105 transition-transform shadow-xs">
            <div className="text-3xl sm:text-4xl font-black font-heading text-emerald-600">
              ₹{(totalProtectedValue / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs font-mono text-secondary mt-1 uppercase font-extrabold">Protected Escrow</div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200/90 bg-surface text-center hover:scale-105 transition-transform shadow-xs">
            <div className="text-3xl sm:text-4xl font-black font-heading text-indigo-600">
              {activeProjectsCount}
            </div>
            <div className="text-xs font-mono text-secondary mt-1 uppercase font-extrabold">Active Projects</div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200/90 bg-surface text-center hover:scale-105 transition-transform shadow-xs">
            <div className="text-3xl sm:text-4xl font-black font-heading text-blue-600">
              {aiAccuracyRate}%
            </div>
            <div className="text-xs font-mono text-secondary mt-1 uppercase font-extrabold">AI Vision Accuracy</div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200/90 bg-surface text-center hover:scale-105 transition-transform shadow-xs">
            <div className="text-3xl sm:text-4xl font-black font-heading text-amber-600">
              {autonomousDecisionsCount.toLocaleString()}
            </div>
            <div className="text-xs font-mono text-secondary mt-1 uppercase font-extrabold">x402 Decisions</div>
          </div>

          <div className="col-span-2 lg:col-span-1 glass-card p-6 rounded-3xl border border-slate-200/90 bg-surface text-center hover:scale-105 transition-transform shadow-xs">
            <div className="text-3xl sm:text-4xl font-black font-heading text-purple-600">
              {manualInterventions}
            </div>
            <div className="text-xs font-mono text-secondary mt-1 uppercase font-extrabold">Manual Interventions</div>
          </div>
        </div>

        {/* Primary Hero CTA Trigger */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <button
            onClick={() => runLiveSimulation()}
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white font-black font-heading text-lg sm:text-xl shadow-[0_10px_30px_rgba(79,70,229,0.35)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 border border-indigo-400/20"
          >
            <span className="p-1.5 rounded-full bg-surface/20 text-primary group-hover:scale-125 transition-transform shadow-sm">
              <Play className="w-5 h-5 fill-current text-primary animate-pulse" />
            </span>
            <span className="tracking-wide uppercase">Run Live Simulation</span>
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </button>

          <button
            onClick={() => setCurrentPage('command-center')}
            className="px-8 py-4 rounded-2xl bg-surface border border-slate-200/90 hover:border-indigo-300 text-slate-800 font-extrabold font-heading text-base transition-all hover:bg-slate-50 flex items-center gap-2.5 shadow-sm hover:shadow-md"
          >
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>Enter Command Center</span>
          </button>
        </div>
      </section>

      {/* 2. Interactive Horizontal Architecture Pipeline */}
      <section className="py-10 border-t border-b border-slate-200/80 bg-slate-50/70">
        <HorizontalStagePipeline />
      </section>

      {/* 3. WOW Showcase: The Digital Twin Preview */}
      <section className="py-16 px-4 sm:px-6 max-w-[1700px] mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-black mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500 animate-bounce" />
              <span>THE HACKATHON WINNING WOW-FEATURE</span>
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 tracking-tight">
              Interactive Digital Twin Inspection Suite
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-sans mt-2 max-w-2xl mx-auto">
              Judges don't just inspect static documents—they wipe smoothly between raw terrain and finished infrastructure with live AI surface density telemetry.
            </p>
          </div>

          <div className="p-2 rounded-[32px] bg-surface border border-slate-200 shadow-xl">
            <BeforeAfterSlider 
              beforeImage={activeDemo.beforeImageUrl} 
              afterImage={activeDemo.afterImageUrl}
              title={`${activeDemo.id} — ${activeDemo.name}`}
              confidence={activeDemo.aiScore || 97.2}
              location={`Contractor: ${activeDemo.contractor} | GPS: [${activeDemo.gpsCoords.lat}, ${activeDemo.gpsCoords.lng}]`}
            />
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setCurrentPage('projects')}
              className="text-sm font-heading font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center gap-2 underline tracking-tight hover:scale-105 transition-transform"
            >
              <span>Explore all 128 active infrastructure projects in Digital Twin Grid</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Operating System App Grid Launcher */}
      <section className="py-16 px-4 sm:px-6 max-w-[1700px] mx-auto border-t border-slate-200 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
              COMPLETE 10-PAGE ENTERPRISE OS SUITE
            </h2>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 mt-1">Select an application module to begin demonstration</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { id: 'command-center', title: '🏛️ Government Command', desc: 'Create projects, approve budgets, monitor vaults, override AI decisions, and set sovereign policies.', badge: 'Oversight', color: 'border-slate-200 text-indigo-600 hover:border-indigo-400' },
              { id: 'mission-control', title: '🛰️ Mission Control', desc: 'The demo highlight! Full-screen NASA-style live terminal with real-time 6-stage telemetry & logs.', badge: 'Hero Page', color: 'border-rose-200 text-rose-600 hover:border-rose-400' },
              { id: 'workspace', title: '🏗️ Contractor Workspace', desc: 'Software portal for submitting images, video streams, GPS coordinates, and inspection reports.', badge: 'Uploads', color: 'border-emerald-200 text-emerald-600 hover:border-emerald-400' },
              { id: 'explorer', title: '⛓️ Trust & x402 Layer', desc: 'Inspect zero-latency machine-to-machine HTTP 402 micropayments and immutable on-chain tx receipts.', badge: 'Ledger', color: 'border-amber-200 text-amber-600 hover:border-amber-400' },
              { id: 'analytics', title: '📈 Analytics Database', desc: 'Examine long-term national data showing 4.2-second automated settlements over legacy 30-day delays.', badge: 'Insights', color: 'border-purple-200 text-purple-600 hover:border-purple-400' },
              { id: 'compliance', title: '📜 Audit & Compliance', desc: 'Tamper-proof regulatory dossiers, anti-corruption verification logs, and national executive archives.', badge: 'Registry', color: 'border-blue-200 text-blue-600 hover:border-blue-400' },
            ].map((app, idx) => (
              <div 
                key={idx}
                onClick={() => setCurrentPage(app.id as any)}
                className={`p-6 rounded-3xl bg-surface border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:scale-105 shadow-sm hover:shadow-xl group ${app.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700">{app.badge}</span>
                  </div>
                  <h4 className="font-black font-heading text-lg text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{app.title}</h4>
                  <p className="text-xs text-secondary font-mono leading-relaxed">{app.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-heading font-extrabold text-slate-600 group-hover:text-indigo-600 transition-colors">
                  <span>Open Application →</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
