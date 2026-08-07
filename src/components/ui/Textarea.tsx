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
          <label className="block text-xs uppercase tracking-wider font-extrabold text-primary font-heading">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled}
          className={`w-full bg-surface-secondary text-primary placeholder-secondary/50 font-mono text-sm px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:bg-surface resize-y min-h-[90px] ${
            error
              ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20 text-rose-500'
              : 'border-subtle focus:border-accent-indigo focus:ring-accent-indigo/20 hover:border-accent-indigo/50 hover:shadow-sm'
          } ${
            disabled ? 'opacity-50 cursor-not-allowed bg-surface-secondary/50' : ''
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-[11px] text-rose-700 font-bold">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-secondary">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
