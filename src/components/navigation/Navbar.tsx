import React from 'react';
import { useEscrowStore } from '../../store/useEscrowStore';
import { PageRoute } from '../../types';
import { 
  Home, 
  ShieldCheck, 
  Layers, 
  HardHat, 
  Activity, 
  Wallet, 
  Cpu, 
  BarChart3, 
  FileText, 
  Settings, 
  Play, 
  RefreshCw, 
  Globe2,
  MonitorPlay
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    isSimulating, 
    runLiveSimulation, 
    resetSimulation,
    totalProtectedValue,
    aiAccuracyRate,
    autonomousDecisionsCount,
    isPresentationMode,
    setPresentationMode
  } = useEscrowStore();

  const navItems: { id: PageRoute; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'landing', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'architecture', label: 'Architecture', icon: <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />, badge: 'NEW' },
    { id: 'command-center', label: 'Command Center', icon: <ShieldCheck className="w-4 h-4 text-blue-400" />, badge: 'Gov' },
    { id: 'projects', label: 'Projects', icon: <Layers className="w-4 h-4 text-cyan-400" /> },
    { id: 'workspace', label: 'Workspace', icon: <HardHat className="w-4 h-4 text-sky-400" /> },
    { id: 'mission-control', label: 'Mission Control', icon: <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />, badge: 'LIVE' },
    { id: 'treasury', label: 'Treasury', icon: <Wallet className="w-4 h-4 text-amber-400" /> },
    { id: 'explorer', label: 'Trust Layer', icon: <Cpu className="w-4 h-4 text-yellow-400" />, badge: 'x402' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4 text-purple-400" /> },
    { id: 'compliance', label: 'Compliance', icon: <FileText className="w-4 h-4 text-primary" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4 text-secondary" /> },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-subtle px-4 lg:px-6 py-3 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-[1700px] mx-auto">
        
        {/* Left: Branding OS Logo */}
        <div 
          onClick={() => setCurrentPage('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ai via-ai-cyan to-blue-600 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-surface-secondary rounded-[10px] flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-ai-cyan animate-spin" style={{ animationDuration: '20s' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold tracking-tight text-gradient-cyan text-base lg:text-lg">
                AI ESCROW ORCHESTRATOR
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                OS v2.4
              </span>
              {isPresentationMode && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 text-accent-indigo text-[9px] font-black tracking-widest animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo" />
                  PRESENTATION
                </span>
              )}
            </div>
            <p className="text-xs text-secondary font-mono">Autonomous Infrastructure Operating System</p>
          </div>
        </div>

        {/* Center: Live Real-Time Telemetry Bar (Hidden in Presentation Mode) */}
        {!isPresentationMode && (
          <div className="hidden xl:flex items-center space-x-6 bg-slatenavy/60 px-5 py-2 rounded-2xl border border-subtle text-xs font-mono transition-opacity duration-300">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-secondary">Protected Vault:</span>
              <span className="text-emerald-400 font-bold">₹{(totalProtectedValue / 1000000).toFixed(1)}M</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-700" />
            <div>
              <span className="text-secondary">AI Precision: </span>
              <span className="text-cyan-400 font-bold">{aiAccuracyRate}%</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-700" />
            <div>
              <span className="text-secondary">M2M Executions: </span>
              <span className="text-amber-400 font-bold">{autonomousDecisionsCount.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Right: Action Buttons (Run Live Simulation & Reset) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => runLiveSimulation()}
            disabled={isSimulating}
            className={`relative group overflow-hidden px-5 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2.5 transition-all shadow-lg ${
              isSimulating 
                ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50 cursor-not-allowed' 
                : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian hover:shadow-cyan-500/40 hover:scale-105 active:scale-95'
            }`}
          >
            <Play className={`w-4 h-4 fill-current ${isSimulating ? 'animate-pulse text-amber-400' : 'text-obsidian'}`} />
            <span className="tracking-wide font-semibold text-primary">
              {isSimulating ? 'SIMULATION IN PROGRESS...' : '▶ RUN LIVE SIMULATION'}
            </span>
            {!isSimulating && (
              <span className="absolute inset-0 w-full h-full bg-surface/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            )}
          </button>

          <button
            onClick={() => resetSimulation()}
            title="Reset Simulation State"
            className="p-2.5 rounded-xl bg-surface-secondary hover:bg-surface-secondary border border-subtle hover:border-subtle text-primary transition-all hover:rotate-180"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setPresentationMode(!isPresentationMode)}
            title={isPresentationMode ? "Exit Presentation Mode" : "Enter Presentation Mode"}
            className={`p-2.5 rounded-xl border transition-all flex items-center justify-center gap-2 ${
              isPresentationMode 
                ? 'bg-accent-indigo text-white border-accent-indigo shadow-md shadow-accent-indigo/20' 
                : 'bg-surface-secondary hover:bg-surface text-secondary hover:text-primary border-subtle'
            }`}
          >
            <MonitorPlay className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation App Desktop Ribbon (Hidden in Presentation Mode) */}
      {!isPresentationMode && (
        <div className="mt-3 pt-3 border-t border-subtle flex items-center justify-start lg:justify-center overflow-x-auto gap-1 sm:gap-2 pb-1 no-scrollbar transition-all duration-300">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-surface-secondary text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10' 
                    : 'text-secondary hover:text-primary hover:bg-surface-secondary'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    item.badge === 'LIVE' ? 'bg-emerald-500/20 text-emerald-400 animate-pulse border border-emerald-500/30' :
                    item.badge === 'Gov' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    item.badge === 'NEW' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
