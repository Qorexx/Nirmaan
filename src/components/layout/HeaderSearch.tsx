import React from 'react';
import { Search, Command } from 'lucide-react';

export interface HeaderSearchProps {
  onOpenPalette: () => void;
  className?: string;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({ onOpenPalette, className = '' }) => {
  return (
    <button
      onClick={onOpenPalette}
      className={`group relative flex items-center justify-between gap-4 w-full max-w-xs md:max-w-md bg-surface-secondary hover:bg-subtle text-secondary hover:text-primary px-3.5 py-2 rounded-xl border border-subtle hover:border-accent-indigo transition-all duration-200 shadow-sm select-none ${className}`}
    >
      <div className="flex items-center gap-2.5 truncate">
        <Search className="w-4 h-4 text-accent-indigo shrink-0 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-mono font-semibold truncate">Search vaults, tx proofs, OS commands...</span>
      </div>
      <div className="hidden sm:flex items-center gap-1 bg-surface px-2 py-0.5 rounded text-[10px] font-mono font-extrabold text-accent-indigo border border-subtle group-hover:bg-accent-indigo/10 transition-colors shrink-0 shadow-sm">
        <Command className="w-3 h-3" />
        <span>K</span>
      </div>
    </button>
  );
};
