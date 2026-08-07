import React from 'react';
import { motion } from 'framer-motion';

export interface StatCardProps {
  title: string;
  number: string | number;
  unit?: string;
  footnote?: string;
  accentColor?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  number,
  unit,
  footnote,
  accentColor = 'from-indigo-600 via-blue-600 to-indigo-700',
  className = ''
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative bg-[#F7F5F0] border border-[#D6D0C4] rounded-2xl p-6 overflow-hidden group shadow-[0_6px_20px_rgba(28,25,23,0.06)] text-[#1C1917] ${className}`}
    >
      {/* Accent Gradient Line at bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accentColor} opacity-75 group-hover:opacity-100 group-hover:h-1 transition-all duration-300`} />

      <div className="space-y-2 font-mono">
        <span className="text-xs uppercase tracking-widest text-[#57534E] font-extrabold font-sans">
          {title}
        </span>
        
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl sm:text-4xl font-black text-[#1C1917] tracking-tight font-sans">
            {number}
          </h3>
          {unit && (
            <span className="text-sm font-black font-mono text-indigo-700 uppercase">
              {unit}
            </span>
          )}
        </div>

        {footnote && (
          <p className="text-xs text-[#57534E] font-mono mt-1 font-semibold">
            {footnote}
          </p>
        )}
      </div>
    </motion.div>
  );
};
