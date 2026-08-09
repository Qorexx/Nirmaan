'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, AlertTriangle } from 'lucide-react';

export interface TimelineItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending' | 'error';
  meta?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  const getIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4 text-emerald-950 stroke-[3]" />;
      case 'active':
        return <Clock className="w-4 h-4 text-accent-indigo animate-spin" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'pending':
      default:
        return <span className="w-2.5 h-2.5 rounded-full bg-secondary" />;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-accent-emerald/20 border-accent-emerald/50 shadow-2xs';
      case 'active': return 'bg-accent-indigo/15 border-accent-indigo shadow-xs';
      case 'error': return 'bg-rose-500/15 border-rose-500 shadow-2xs';
      case 'pending':
      default: return 'bg-surface-secondary border-subtle';
    }
  };

  return (
    <div className={`relative pl-6 font-mono space-y-8 text-primary ${className}`}>
      {/* Vertical Connection Guideline */}
      <div className="absolute left-3.5 top-2 bottom-2 w-[2px] bg-surface-secondary" />

      {items.map((item, idx) => (
        <motion.div
          key={item.id || idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          className="relative group"
        >
          {/* Node Icon */}
          <div className={`absolute -left-[29px] top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 z-10 ${getStatusBg(item.status)}`}>
            {getIcon(item.status)}
          </div>

          <div className="bg-surface hover:bg-surface-secondary/80 border border-subtle hover:border-[#818CF8] rounded-2xl p-4 transition-all shadow-xs space-y-1.5 text-primary">
            <div className="flex items-center justify-between text-xs text-secondary font-mono">
              <span className="text-indigo-700 font-extrabold">[{item.timestamp}]</span>
              {item.meta && (
                <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-extrabold uppercase text-[10px] border border-indigo-300">
                  {item.meta}
                </span>
              )}
            </div>

            <h4 className="text-base font-black text-primary font-heading tracking-tight">{item.title}</h4>
            <p className="text-xs text-secondary leading-relaxed font-mono font-medium">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

