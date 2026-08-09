'use client';
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'x402' | 'ledger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-accent-indigo to-indigo-600 text-white font-heading font-black tracking-wider shadow-md hover:shadow-lg border border-accent-indigo/40';
      case 'secondary':
        return 'bg-surface-secondary hover:bg-subtle text-primary font-heading font-extrabold border border-subtle hover:border-accent-indigo/40 shadow-sm hover:shadow-md';
      case 'outline':
        return 'bg-transparent hover:bg-accent-indigo/10 text-accent-indigo font-sans font-bold border border-accent-indigo/50 hover:border-accent-indigo shadow-sm';
      case 'ghost':
        return 'bg-transparent hover:bg-surface-secondary text-secondary hover:text-primary font-sans font-semibold';
      case 'danger':
        return 'bg-gradient-to-r from-rose-600 to-red-500 text-white font-heading font-black shadow-md border border-rose-400/40 hover:shadow-lg';
      case 'x402':
        return 'bg-gradient-to-r from-accent-gold to-orange-500 text-white font-heading font-black shadow-md hover:shadow-lg border border-accent-gold/40';
      case 'ledger':
        return 'bg-surface-secondary text-accent-gold font-mono font-black border border-accent-gold/40 hover:border-accent-gold shadow-sm hover:bg-subtle';
      default:
        return 'bg-accent-indigo text-white font-sans font-bold shadow-md';
    }
  };

  const getSizeStyles = (): string => {
    switch (size) {
      case 'sm':
        return 'px-3.5 py-1.5 text-xs rounded-xl gap-1.5';
      case 'md':
        return 'px-5 py-2.5 text-sm rounded-2xl gap-2';
      case 'lg':
        return 'px-7 py-3.5 text-base rounded-2xl gap-2.5';
      default:
        return 'px-5 py-2.5 text-sm rounded-2xl gap-2';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.025, translateY: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.975 }}
      transition={{ type: 'spring', damping: 20, stiffness: 350 }}
      className={`
        inline-flex items-center justify-center select-none
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-accent-indigo/40 focus:ring-offset-2 focus:ring-offset-surface
        disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children && <span>{children}</span>}
        </>
      )}
    </motion.button>
  );
};

