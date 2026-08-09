'use client';
import React from 'react';
import { motion } from 'framer-motion';

export interface ProgressBarProps {
  percentage: number;
  label?: string;
  subValue?: string;
  color?: 'cyan' | 'emerald' | 'amber' | 'gradient' | 'blue';
  heightClass?: string;
  showPercentage?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  subValue,
  color = 'gradient',
  heightClass = 'h-3',
  showPercentage = true,
  className = ''
}) => {
  const boundedPercentage = Math.min(Math.max(percentage, 0), 100);

  const getColorStyles = () => {
    switch (color) {
      case 'cyan': return 'bg-indigo-600 shadow-sm';
      case 'emerald': return 'bg-emerald-600 shadow-sm';
      case 'amber': return 'bg-amber-600 shadow-sm';
      case 'blue': return 'bg-blue-600 shadow-sm';
      case 'gradient':
      default:
        return 'bg-gradient-to-r from-emerald-600 via-indigo-600 to-blue-600 shadow-sm';
    }
  };

  return (
    <div className={`w-full space-y-2 font-mono text-primary ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs sm:text-sm font-black text-primary font-heading">
          <span>{label}</span>
          <div className="flex items-center gap-2">
            {subValue && <span className="text-secondary text-xs font-bold font-mono">{subValue}</span>}
            {showPercentage && <span className="text-indigo-700 font-mono font-extrabold">{boundedPercentage.toFixed(1)}%</span>}
          </div>
        </div>
      )}

      {/* Bar Container */}
      <div className={`w-full ${heightClass} bg-surface-secondary border border-subtle rounded-full overflow-hidden p-[2px] relative shadow-inner`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${boundedPercentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full transition-all ${getColorStyles()}`}
        />
      </div>
    </div>
  );
};

