import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subValue?: string;
  icon?: React.ReactNode;
  glowColor?: 'cyan' | 'emerald' | 'amber' | 'purple';
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  subValue,
  icon,
  glowColor = 'cyan',
  className = ''
}) => {
  const getBorderGlow = () => {
    switch (glowColor) {
      case 'emerald': return 'hover:border-emerald-500 hover:shadow-[0_15px_35px_-5px_rgba(4,120,87,0.15)] group-hover:bg-[#F2EFE8] text-emerald-700';
      case 'amber': return 'hover:border-amber-500 hover:shadow-[0_15px_35px_-5px_rgba(180,83,9,0.15)] group-hover:bg-[#F4F0E8] text-amber-700';
      case 'purple': return 'hover:border-purple-500 hover:shadow-[0_15px_35px_-5px_rgba(109,40,217,0.15)] group-hover:bg-[#F2EFF7] text-purple-700';
      case 'cyan':
      default: return 'hover:border-indigo-500 hover:shadow-[0_15px_35px_-5px_rgba(67,56,202,0.15)] group-hover:bg-[#F0EFF7] text-indigo-700';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.015 }}
      transition={{ type: 'spring', damping: 22, stiffness: 320 }}
      className={`bg-[#F7F5F0] border border-[#D6D0C4] rounded-2xl p-6 shadow-[0_6px_25px_-5px_rgba(28,25,23,0.07)] transition-all duration-300 relative overflow-hidden font-mono space-y-4 group ${getBorderGlow()} ${className}`}
    >
      {/* Top Banner with Icon & Title */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#57534E] truncate">
          {title}
        </span>
        <div className="p-2.5 rounded-xl bg-[#EAE5DC] border border-[#D6D0C4] text-indigo-700 shrink-0 shadow-xs transition-transform group-hover:scale-110">
          {icon || <Activity className="w-4 h-4 animate-pulse text-indigo-700" />}
        </div>
      </div>

      {/* Main KPI Value Display */}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight font-sans">
          {value}
        </h3>

        {change && (
          <span className={`inline-flex items-center text-xs font-extrabold px-2.5 py-1 rounded-full shadow-2xs ${
            isPositive ? 'bg-emerald-100/80 text-emerald-800 border border-emerald-300' : 'bg-rose-100/80 text-rose-800 border border-rose-300'
          }`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5 text-emerald-700 stroke-[3]" /> : <ArrowDownRight className="w-3 h-3 mr-0.5 text-rose-700 stroke-[3]" />}
            <span>{change}</span>
          </span>
        )}
      </div>

      {/* Optional Sub-Metric or Footer Comment */}
      {subValue && (
        <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between text-xs text-[#57534E] font-mono">
          <span>{subValue}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block ring-4 ring-emerald-100" />
        </div>
      )}

      {/* Delicate Studio Background Reflex */}
      <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-indigo-600/06 rounded-full blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-150" />
    </motion.div>
  );
};
