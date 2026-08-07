import React from 'react';

export interface GradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  withGrid?: boolean;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  className = '',
  withGrid = true
}) => {
  return (
    <div className={`relative min-h-screen bg-[#F0EEE9] overflow-hidden text-primary ${className}`}>
      {/* Ambient Warm Oat & Indigo Mesh Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Subtle Studio Grid Texture Layer */}
      {withGrid && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c19170a_1px,transparent_1px),linear-gradient(to_bottom,#1c19170a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10" />
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
