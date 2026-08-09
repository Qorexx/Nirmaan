'use client';
import React from 'react';

export interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className = '',
  maxWidth = 'xl'
}) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm': return 'max-w-2xl';
      case 'md': return 'max-w-4xl';
      case 'lg': return 'max-w-6xl';
      case '2xl': return 'max-w-[1700px]';
      case 'full': return 'max-w-full';
      case 'xl':
      default: return 'max-w-7xl';
    }
  };

  return (
    <div className={`w-full mx-auto p-[1px] bg-gradient-to-br from-[#D6D0C4] via-[#C9C2B4] to-transparent rounded-3xl shadow-[0_15px_40px_rgba(28,25,23,0.06)] ${getMaxWidthClass()}`}>
      <div className={`w-full h-full bg-surface/90 backdrop-blur-2xl border border-subtle rounded-[23px] p-6 sm:p-10 text-primary ${className}`}>
        {children}
      </div>
    </div>
  );
};

