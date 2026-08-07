import React from 'react';

export interface MetricCardProps {
  label: string;
  primaryValue: string;
  secondaryLabel?: string;
  secondaryValue?: string;
  statusText?: string;
  statusColor?: 'cyan' | 'emerald' | 'amber' | 'blue';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  primaryValue,
  secondaryLabel,
  secondaryValue,
  statusText,
  statusColor = 'cyan',
  className = ''
}) => {
  const getStatusBg = () => {
    switch (statusColor) {
      case 'emerald': return 'bg-emerald-600 shadow-2xs';
      case 'amber': return 'bg-amber-600 shadow-2xs';
      case 'blue': return 'bg-blue-600 shadow-2xs';
      case 'cyan':
      default: return 'bg-indigo-600 shadow-2xs';
    }
  };

  return (
    <div className={`bg-surface border border-subtle rounded-2xl p-5 shadow-[0_6px_20px_rgba(28,25,23,0.05)] hover:border-[#818CF8] transition-all duration-200 font-mono space-y-3 text-primary ${className}`}>
      <div className="flex items-center justify-between text-xs text-secondary font-extrabold uppercase font-heading">
        <span>{label}</span>
        {statusText && (
          <span className="flex items-center gap-1.5 text-primary font-bold">
            <span className={`w-2 h-2 rounded-full ${getStatusBg()}`} />
            <span>{statusText}</span>
          </span>
        )}
      </div>

      <div className="text-xl sm:text-2xl font-black text-primary tracking-tight font-heading">
        {primaryValue}
      </div>

      {(secondaryLabel || secondaryValue) && (
        <div className="pt-2 border-t border-subtle flex items-center justify-between text-xs text-secondary">
          {secondaryLabel && <span className="text-secondary font-semibold">{secondaryLabel}</span>}
          {secondaryValue && <span className="font-extrabold text-indigo-700">{secondaryValue}</span>}
        </div>
      )}
    </div>
  );
};
