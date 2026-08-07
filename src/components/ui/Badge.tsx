import React from 'react';

export type BadgeVariant = 'cyan' | 'emerald' | 'amber' | 'gold' | 'blue' | 'rose' | 'neutral' | 'pulse';

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  icon,
  className = '',
  size = 'md',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'cyan':
      case 'blue':
        return 'bg-accent-indigo/10 text-accent-indigo border-accent-indigo/30 shadow-sm font-extrabold';
      case 'emerald':
        return 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/30 shadow-sm font-extrabold';
      case 'amber':
      case 'gold':
        return 'bg-accent-gold/10 text-accent-gold border-accent-gold/30 shadow-sm font-extrabold';
      case 'rose':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/30 shadow-sm font-extrabold';
      case 'pulse':
        return 'bg-accent-indigo/10 text-accent-indigo border-accent-indigo/50 animate-pulse shadow-sm font-black';
      case 'neutral':
      default:
        return 'bg-surface-secondary text-secondary border-subtle font-bold';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return 'px-2 py-0.5 text-[10px] gap-1';
      case 'lg': return 'px-3.5 py-1 text-xs sm:text-sm gap-2';
      case 'md':
      default: return 'px-2.5 py-1 text-xs gap-1.5';
    }
  };

  return (
    <span
      className={`inline-flex items-center font-mono uppercase tracking-wider rounded-md border select-none ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </span>
  );
};
