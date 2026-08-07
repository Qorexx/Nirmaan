import React from 'react';
import { motion } from 'framer-motion';

export interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  borderGradient?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  intensity = 'medium',
  borderGradient = true,
}) => {
  const getBlurIntensity = () => {
    switch (intensity) {
      case 'low':
        return 'backdrop-blur-md bg-surface-secondary/70';
      case 'medium':
        return 'backdrop-blur-2xl bg-surface/90';
      case 'high':
        return 'backdrop-blur-3xl bg-surface/96';
      default:
        return 'backdrop-blur-2xl bg-surface/90';
    }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.002, translateY: -3 }}
      transition={{ type: 'spring', damping: 25, stiffness: 280 }}
      className={`relative rounded-3xl p-[1px] overflow-hidden transition-all duration-500 group ${
      borderGradient 
        ? 'bg-gradient-to-br from-subtle/40 via-subtle/20 to-subtle/10 shadow-[0_12px_40px_-5px_rgba(28,25,23,0.08)] hover:shadow-[0_18px_50px_-5px_rgba(67,56,202,0.14)] hover:shadow-accent-indigo/20' 
        : 'border border-subtle shadow-md'
    }`}>
      <div
        className={`rounded-[23px] h-full w-full p-6 sm:p-8 relative overflow-hidden text-primary transition-opacity duration-300 opacity-95 group-hover:opacity-100 ${getBlurIntensity()} ${className}`}
      >
        {/* Warm Studio Ambient Light Reflexes */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/06 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-600/06 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-600/05 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
