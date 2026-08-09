'use client';
import React from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'busy' | 'offline' | 'none';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  role?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials = 'AI',
  size = 'md',
  status = 'online',
  role,
  className = ''
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8 text-xs';
      case 'lg': return 'w-12 h-12 text-base';
      case 'xl': return 'w-16 h-16 text-xl';
      case 'md':
      default: return 'w-10 h-10 text-sm';
    }
  };

  const getStatusStyles = () => {
    switch (status) {
      case 'online': return 'bg-emerald-600 shadow-xs';
      case 'busy': return 'bg-amber-600 shadow-xs';
      case 'offline': return 'bg-secondary';
      default: return 'hidden';
    }
  };

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      <div className={`relative rounded-xl overflow-hidden bg-gradient-to-tr from-indigo-700 via-blue-700 to-amber-600 p-[2px] shadow-xs shrink-0 ${getSizeStyles()}`}>
        <div className="w-full h-full bg-surface rounded-[10px] overflow-hidden flex items-center justify-center font-mono font-black text-indigo-950 uppercase select-none">
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          ) : (
            <span>{initials.slice(0, 2)}</span>
          )}
        </div>
        {status !== 'none' && (
          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#F7F5F0] ${getStatusStyles()}`} />
        )}
      </div>

      {role && (
        <div className="flex flex-col">
          <span className="text-xs font-black text-primary leading-tight font-heading">{alt}</span>
          <span className="text-[10px] font-mono font-bold uppercase text-secondary">{role}</span>
        </div>
      )}
    </div>
  );
};

