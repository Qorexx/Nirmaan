'use client';

import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple' | 'blue' | 'orange' | 'gray';
  size?: 'xs' | 'sm' | 'md';
  pulse?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const variantClasses: Record<string, string> = {
  default: 'bg-[var(--color-bg-surface-secondary)] text-[var(--color-text-primary)] border-[var(--color-border-subtle)]',
  indigo: 'bg-[var(--color-accent-indigo)]/10 text-[var(--color-accent-indigo)] border-[var(--color-accent-indigo)]/20',
  emerald: 'bg-[var(--color-accent-emerald)]/10 text-[var(--color-accent-emerald)] border-[var(--color-accent-emerald)]/20',
  amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  rose: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  cyan: 'bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] border-[var(--color-accent-cyan)]/20',
  purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  orange: 'bg-[var(--color-accent-orange)]/10 text-[var(--color-accent-orange)] border-[var(--color-accent-orange)]/20',
  gray: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

const sizeClasses: Record<string, string> = {
  xs: 'text-[9px] px-1.5 py-0.5',
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'sm', pulse = false, icon, className }) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 font-mono font-bold uppercase rounded-full border whitespace-nowrap',
        variantClasses[variant],
        sizeClasses[size],
        pulse && 'animate-pulse',
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
