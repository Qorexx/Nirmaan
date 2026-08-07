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
      <div className={`w-full h-full bg-[#F7F5F0]/90 backdrop-blur-2xl border border-[#D6D0C4] rounded-[23px] p-6 sm:p-10 text-[#1C1917] ${className}`}>
        {children}
      </div>
    </div>
  );
};
