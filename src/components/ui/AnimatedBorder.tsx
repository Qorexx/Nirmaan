import React from 'react';

export interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderColor?: 'cyan-blue' | 'amber-gold' | 'purple-pink' | 'emerald';
  speed?: 'slow' | 'normal' | 'fast';
}

export const AnimatedBorder: React.FC<AnimatedBorderProps> = ({
  children,
  className = '',
  containerClassName = '',
  borderColor = 'cyan-blue',
}) => {
  const getGradient = () => {
    switch (borderColor) {
      case 'amber-gold': return 'from-amber-600 via-orange-600 to-yellow-500';
      case 'purple-pink': return 'from-purple-600 via-rose-600 to-indigo-600';
      case 'emerald': return 'from-emerald-600 via-teal-600 to-indigo-600';
      case 'cyan-blue':
      default: return 'from-indigo-600 via-blue-600 to-emerald-600';
    }
  };

  return (
    <div className={`relative p-[2px] rounded-3xl overflow-hidden ${containerClassName}`}>
      {/* Rotating conic gradient light layer */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getGradient()} animate-pulse shadow-md`} />
      
      {/* Inner Content Block */}
      <div className={`relative z-10 w-full h-full rounded-[22px] bg-[#F7F5F0] ${className}`}>
        {children}
      </div>
    </div>
  );
};
