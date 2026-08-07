import React from 'react';
import { useEscrowStore } from '../../store/useEscrowStore';
import { Check, ArrowRight, Activity, ShieldCheck } from 'lucide-react';

export const HorizontalStagePipeline: React.FC = () => {
  const { stages, currentStageIdx } = useEscrowStore();

  const getLayerColors = (layer: string, status: string) => {
    if (status === 'active') {
      return 'border-accent-indigo shadow-[0_15px_40px_rgba(79,70,229,0.18)] bg-accent-indigo/10 scale-[1.03] z-20';
    }
    if (status === 'completed') {
      return 'border-accent-emerald bg-accent-emerald/10 shadow-[0_10px_25px_rgba(16,185,129,0.12)]';
    }
    switch (layer) {
      case 'contractor': return 'border-subtle hover:border-accent-indigo bg-surface';
      case 'ai': return 'border-subtle hover:border-purple-500 bg-surface';
      case 'verify': return 'border-subtle hover:border-accent-emerald bg-surface';
      case 'x402': return 'border-subtle hover:border-accent-gold bg-surface';
      case 'chain': return 'border-subtle hover:border-accent-gold bg-surface';
      case 'db': return 'border-subtle hover:border-blue-500 bg-surface';
      default: return 'border-subtle bg-surface';
    }
  };

  const getBadgeStyle = (layer: string) => {
    switch (layer) {
      case 'contractor': return 'bg-accent-indigo/20 text-accent-indigo border-accent-indigo/50';
      case 'ai': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'verify': return 'bg-accent-emerald/20 text-accent-emerald border-accent-emerald/50';
      case 'x402': return 'bg-accent-gold/20 text-accent-gold border-accent-gold/50';
      case 'chain': return 'bg-accent-gold/20 text-accent-gold border-accent-gold/50';
      case 'db': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-surface-secondary text-secondary border-subtle';
    }
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 font-mono text-primary">
      <div className="max-w-[1700px] mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-mono uppercase tracking-wider text-accent-indigo font-black flex items-center gap-2.5">
              <Activity className="w-5 h-5 animate-pulse text-accent-indigo" />
              <span>AI Escrow Lifecycle // Autonomous Escrow Workflow</span>
            </h3>
            <p className="text-sm text-secondary font-mono mt-1 font-bold">
              12-Stage real-time architectural verification choreography powered by x402 Micropayments & Vision AI
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono font-extrabold">
            <span className="flex items-center gap-1.5 text-secondary"><span className="w-3 h-3 rounded-full bg-subtle" /> Pending</span>
            <span className="flex items-center gap-1.5 text-accent-indigo"><span className="w-3 h-3 rounded-full bg-accent-indigo animate-pulse shadow-sm" /> Processing</span>
            <span className="flex items-center gap-1.5 text-accent-emerald"><span className="w-3 h-3 rounded-full bg-accent-emerald shadow-sm" /> Settled</span>
          </div>
        </div>

        {/* WIDE-SPANNING GOVERNMENT COMMAND SUITE OVERVIEW */}
        <div className="w-full bg-surface-secondary border border-subtle rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-primary">
          <div className="flex items-center gap-4 z-10">
            <div className="p-3 bg-surface border border-subtle rounded-xl text-accent-indigo shadow-sm">
              <ShieldCheck className="w-8 h-8 text-accent-indigo" />
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-black text-primary tracking-wide flex items-center gap-2 font-heading">
                🏛 Government Command Suite
              </h4>
              <p className="text-xs font-mono text-secondary font-bold">
                Sovereign Infrastructure Oversight & Automated Policy Release Deck
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-sm font-heading font-black text-primary z-10">
            <span className="px-3 py-1 bg-surface hover:bg-accent-indigo/10 rounded-lg border border-subtle transition-colors shadow-sm">📁 Projects</span>
            <span className="text-accent-indigo">•</span>
            <span className="px-3 py-1 bg-surface hover:bg-accent-indigo/10 rounded-lg border border-subtle transition-colors shadow-sm">💰 Escrow</span>
            <span className="text-accent-indigo">•</span>
            <span className="px-3 py-1 bg-surface hover:bg-accent-indigo/10 rounded-lg border border-subtle transition-colors shadow-sm">📈 Analytics</span>
            <span className="text-accent-indigo">•</span>
            <span className="px-3 py-1 bg-surface hover:bg-accent-indigo/10 rounded-lg border border-subtle transition-colors shadow-sm">⚙ Policies</span>
            <span className="text-accent-indigo">•</span>
            <span className="px-3 py-1 bg-surface hover:bg-accent-indigo/10 rounded-lg border border-subtle transition-colors shadow-sm">🔔 Alerts</span>
            <span className="text-accent-indigo">•</span>
            <span className="px-3 py-1 bg-surface hover:bg-accent-indigo/10 rounded-lg border border-subtle transition-colors shadow-sm">📜 Audit</span>
          </div>
        </div>

        {/* ENLARGED 12-STAGE WORKFLOW CARDS WITH KPIS */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 relative pb-8 no-scrollbar items-stretch min-h-[360px]">
          {stages.map((stage, idx) => {
            const isActive = stage.status === 'active';
            const isCompleted = stage.status === 'completed';

            return (
              <div key={stage.id} className="flex flex-col relative group shrink-0 w-[300px] snap-center">
                
                {/* Connector Arrow */}
                {idx < stages.length - 1 && (
                  <div className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 text-secondary w-4 flex justify-center">
                    <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${
                      idx < currentStageIdx ? 'text-accent-emerald scale-125 animate-bounce stroke-[3]' : 
                      idx === currentStageIdx ? 'text-accent-indigo scale-125 animate-pulse stroke-[3]' : 'text-subtle'
                    }`} />
                  </div>
                )}

                {/* Stage Card */}
                <div className={`h-full rounded-2xl p-5 border-2 transition-all duration-300 flex flex-col justify-between ${getLayerColors(stage.layer, stage.status)}`}>
                  <div>
                    {/* Header Banner */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl filter drop-shadow-sm">{stage.icon}</span>
                      <span className={`text-[10px] font-mono font-black px-2 py-1 rounded-md uppercase tracking-wider border ${getBadgeStyle(stage.layer)}`}>
                        Stage {stage.stageNumber}
                      </span>
                    </div>

                    <h4 className="font-black text-base text-primary font-heading tracking-tight flex items-center justify-between line-clamp-2">
                      <span className="leading-tight">{stage.name}</span>
                      {isCompleted && (
                        <span className="shrink-0 w-5 h-5 rounded-full bg-accent-emerald/20 text-accent-emerald flex items-center justify-center border border-accent-emerald/50 ml-2">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                      {isActive && (
                        <span className="shrink-0 flex h-3 w-3 relative ml-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-indigo opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-indigo"></span>
                        </span>
                      )}
                    </h4>

                    <p className="text-[10px] font-mono text-secondary mt-1 pb-3 border-b border-subtle font-bold">
                      {stage.subtitle}
                    </p>

                    {/* LIVE ON-CARD KPI BOX */}
                    {stage.kpiMetric && (
                      <div className={`mt-3 mb-3 p-2 rounded-lg border font-mono text-[10px] font-black flex items-center justify-between transition-colors shadow-sm ${
                        isCompleted ? 'bg-accent-emerald/20 text-accent-emerald border-accent-emerald/50' :
                        isActive ? 'bg-accent-indigo/20 text-accent-indigo border-accent-indigo/50' :
                        'bg-surface-secondary text-primary border-subtle'
                      }`}>
                        <span className="truncate">{stage.kpiMetric}</span>
                      </div>
                    )}

                    {/* Stage Sub-Nodes / Features */}
                    <ul className="space-y-2">
                      {stage.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-[11px] flex items-start gap-2 font-mono text-secondary font-bold">
                          <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            isCompleted ? 'bg-accent-emerald' : 
                            isActive ? 'bg-accent-indigo' : 'bg-subtle'
                          }`} />
                          <span className="leading-snug">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Status Bar */}
                  <div className="mt-4 pt-3 border-t border-subtle flex items-center justify-between text-[10px] font-mono">
                    <span className="text-secondary uppercase font-extrabold">State:</span>
                    <span className={`font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                      isCompleted ? 'bg-accent-emerald/20 text-accent-emerald border-accent-emerald/50' :
                      isActive ? 'bg-accent-indigo/20 text-accent-indigo animate-pulse border-accent-indigo/50' : 'text-secondary bg-surface-secondary border-subtle'
                    }`}>
                      {stage.status === 'active' ? '● PROCESSING' : stage.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ENTERPRISE LEGEND */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-secondary">
            🎨 Enterprise Layer Legend:
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono font-extrabold">
            <span className="px-3 py-1 rounded-lg bg-accent-indigo/20 border border-accent-indigo/50 text-accent-indigo flex items-center gap-1.5 shadow-sm">
              <span className="w-2.5 h-2.5 rounded bg-accent-indigo" /> Platform
            </span>
            <span className="px-3 py-1 rounded-lg bg-purple-500/20 border border-purple-500/50 text-purple-400 flex items-center gap-1.5 shadow-sm">
              <span className="w-2.5 h-2.5 rounded bg-purple-500" /> AI Vision
            </span>
            <span className="px-3 py-1 rounded-lg bg-accent-emerald/20 border border-accent-emerald/50 text-accent-emerald flex items-center gap-1.5 shadow-sm">
              <span className="w-2.5 h-2.5 rounded bg-accent-emerald" /> Verification
            </span>
            <span className="px-3 py-1 rounded-lg bg-accent-gold/20 border border-accent-gold/50 text-accent-gold flex items-center gap-1.5 shadow-sm">
              <span className="w-2.5 h-2.5 rounded bg-accent-gold" /> Payments & Chain
            </span>
            <span className="px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-500/50 text-blue-400 flex items-center gap-1.5 shadow-sm">
              <span className="w-2.5 h-2.5 rounded bg-blue-500" /> Database
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
