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
          <label className="block text-xs uppercase tracking-wider font-extrabold text-[#44403C] font-sans">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-[#57534E] flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={`w-full bg-[#EAE5DC] text-[#1C1917] placeholder-[#78716C] font-mono text-sm px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-[#F7F5F0] ${
              leftIcon ? 'pl-11' : 'pl-4'
            } ${
              rightIcon ? 'pr-11' : 'pr-4'
            } ${
              error
                ? 'border-rose-500/60 focus:border-rose-600 focus:ring-rose-500/20 text-rose-900'
                : 'border-[#C9C2B4] focus:border-[#4338CA] focus:ring-[#4338CA]/20 hover:border-[#A8A193]'
            } ${
              disabled ? 'opacity-50 cursor-not-allowed bg-[#D6D0C4]' : ''
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-[#57534E] flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-[11px] text-rose-700 font-bold">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-[#57534E]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
