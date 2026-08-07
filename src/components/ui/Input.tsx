import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', disabled, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 font-mono">
        {label && (
          <label className="block text-xs uppercase tracking-wider font-extrabold text-primary font-heading">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-secondary flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={`w-full bg-surface-secondary text-primary placeholder-secondary/50 font-mono text-sm px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:bg-surface ${
              leftIcon ? 'pl-11' : 'pl-4'
            } ${
              rightIcon ? 'pr-11' : 'pr-4'
            } ${
              error
                ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20 text-rose-500'
                : 'border-subtle focus:border-accent-indigo focus:ring-accent-indigo/20 hover:border-accent-indigo/50 hover:shadow-sm'
            } ${
              disabled ? 'opacity-50 cursor-not-allowed bg-surface-secondary/50' : ''
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-secondary flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-[11px] text-rose-700 font-bold">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-secondary">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
