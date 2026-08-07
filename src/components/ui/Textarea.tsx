import React, { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', disabled, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 font-mono">
        {label && (
          <label className="block text-xs uppercase tracking-wider font-extrabold text-[#44403C] font-sans">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled}
          className={`w-full bg-[#EAE5DC] text-[#1C1917] placeholder-[#78716C] font-mono text-sm p-4 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-[#F7F5F0] resize-y min-h-[90px] ${
            error
              ? 'border-rose-500 focus:border-rose-600 focus:ring-rose-500/20 text-rose-950'
              : 'border-[#C9C2B4] focus:border-[#4338CA] focus:ring-[#4338CA]/20 hover:border-[#A8A193]'
          } ${
            disabled ? 'opacity-50 cursor-not-allowed bg-[#D6D0C4]' : ''
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-[11px] text-rose-700 font-bold">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-[#57534E]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
