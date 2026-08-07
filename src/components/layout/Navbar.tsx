import React from 'react';
import { Play, RefreshCw, Globe2, Sparkles } from 'lucide-react';
import { useEscrowStore } from '../../store/useEscrowStore';
import { HeaderSearch } from './HeaderSearch';
import { ThemeToggle } from './ThemeToggle';
import { NotificationCenter } from './NotificationCenter';
import { ProfileMenu } from './ProfileMenu';

export interface LayoutNavbarProps {
  onOpenPalette: () => void;
}

export const Navbar: React.FC<LayoutNavbarProps> = ({ onOpenPalette }) => {
  const { isSimulating, runLiveSimulation, resetSimulation, setCurrentPage, setLoginModalOpen, currentUser } = useEscrowStore();

  return (
    <header className="sticky top-0 z-50 bg-surface/92 backdrop-blur-2xl border-b border-subtle px-4 lg:px-6 py-3 transition-all shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 max-w-[1700px] mx-auto">
        
        {/* Left Logo (Mobile View) */}
        <div 
          onClick={() => setCurrentPage('landing')}
          className="lg:hidden flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-indigo via-blue-600 to-indigo-800 p-[2px] shadow-md">
            <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center">
              <Globe2 className="w-4 h-4 text-accent-indigo animate-spin-slow" />
            </div>
          </div>
          <span className="font-black text-primary text-sm font-sans tracking-tight">AI ESCROW OS</span>
        </div>

        {/* Center: Command Palette Search Trigger */}
        <div className="flex-1 flex justify-center max-w-md mx-auto">
          <HeaderSearch onOpenPalette={onOpenPalette} />
        </div>

        {/* Right: Simulation Theater Controls & Auth Strip */}
        <div className="flex items-center gap-2.5 ml-auto">
          
          {/* Prominent Login / Switch Persona Trigger */}
          <button
            onClick={() => setLoginModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-secondary hover:bg-subtle border border-subtle text-accent-indigo font-sans font-black text-xs transition-all shadow-sm hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-orange animate-bounce" />
            <span>{currentUser.isAuthenticated ? 'Switch Persona' : '🔐 Sign In / Auth'}</span>
          </button>

          {/* Run Demo Master Button */}
          <button
            onClick={() => runLiveSimulation()}
            disabled={isSimulating}
            className={`relative overflow-hidden px-5 sm:px-6 py-2 sm:py-2 rounded-xl font-black font-sans text-xs flex items-center gap-2 transition-all shadow-md select-none uppercase tracking-wider border ${
              isSimulating
                ? 'bg-accent-gold/20 text-accent-gold border-accent-gold cursor-not-allowed animate-pulse'
                : 'bg-accent-indigo text-white hover:bg-accent-indigo/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border-accent-indigo'
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'text-accent-gold' : 'animate-pulse'}`} />
            <span>{isSimulating ? 'Simulating...' : 'Run Live Demo'}</span>
          </button>

          <button
            onClick={() => resetSimulation()}
            title="Reset Simulation State"
            className="p-2.5 rounded-xl bg-surface-secondary hover:bg-subtle border border-subtle text-secondary hover:text-primary transition-all hover:rotate-180 shrink-0 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <div className="h-6 w-[1px] bg-subtle hidden sm:block mx-1" />

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          
          <NotificationCenter />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};
