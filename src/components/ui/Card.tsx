import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
  className?: string;
  isInteractive?: boolean;
  glowColor?: 'cyan' | 'emerald' | 'amber' | 'blue' | 'none';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  isInteractive = false,
  glowColor = 'none',
  ...props
}) => {
  const getGlowStyles = () => {
    switch (glowColor) {
      case 'cyan':
      case 'blue':
        return 'hover:border-accent-indigo hover:shadow-md';
      case 'emerald':
        return 'hover:border-accent-emerald hover:shadow-md';
      case 'amber':
        return 'hover:border-accent-gold hover:shadow-md';
      default:
        return 'hover:border-subtle hover:shadow-md';
    }
  };

  return (
    <motion.div
      whileHover={isInteractive ? { y: -3, scale: 1.01 } : {}}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`bg-surface border border-subtle rounded-2xl p-6 text-primary shadow-sm transition-all duration-300 relative overflow-hidden ${
        isInteractive ? `cursor-pointer ${getGlowStyles()}` : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`flex flex-col space-y-1.5 mb-4 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-lg sm:text-xl font-black font-heading text-primary tracking-tight leading-none ${className}`}>{children}</h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-xs sm:text-sm font-mono text-secondary leading-relaxed ${className}`}>{children}</p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`space-y-4 ${className}`}>{children}</div>
);
