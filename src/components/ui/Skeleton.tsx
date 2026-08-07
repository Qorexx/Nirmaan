import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular': return 'rounded-full';
      case 'text': return 'rounded-md h-4 w-3/4';
      case 'rectangular':
      default: return 'rounded-2xl';
    }
  };

  return (
    <div
      style={{ width, height }}
      className={`bg-gradient-to-r from-[#EAE5DC] via-[#DFD9CD] to-[#EAE5DC] bg-[length:200%_100%] animate-pulse border border-[#D6D0C4] ${getVariantClasses()} ${className}`}
    />
  );
};

export const SkeletonCard: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="bg-[#F7F5F0] border border-[#D6D0C4] rounded-2xl p-6 space-y-4 shadow-xs">
    <div className="flex items-center gap-3">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" className="h-3" />
      </div>
    </div>
    <div className="space-y-2 pt-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} variant="text" width={i === lines - 1 ? '75%' : '100%'} />
      ))}
    </div>
  </div>
);
