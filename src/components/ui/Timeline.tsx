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
        return <Clock className="w-4 h-4 text-indigo-700 animate-spin" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-rose-700" />;
      case 'pending':
      default:
        return <span className="w-2.5 h-2.5 rounded-full bg-[#78716C]" />;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-200 border-emerald-400 shadow-2xs';
      case 'active': return 'bg-indigo-100 border-indigo-500 shadow-xs';
      case 'error': return 'bg-rose-100 border-rose-500 shadow-2xs';
      case 'pending':
      default: return 'bg-[#EAE5DC] border-[#D6D0C4]';
    }
  };

  return (
    <div className={`relative pl-6 font-mono space-y-8 text-[#1C1917] ${className}`}>
      {/* Vertical Connection Guideline */}
      <div className="absolute left-3.5 top-2 bottom-2 w-[2px] bg-[#D6D0C4]" />

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

          <div className="bg-[#F7F5F0] hover:bg-[#EAE5DC]/80 border border-[#D6D0C4] hover:border-[#818CF8] rounded-2xl p-4 transition-all shadow-xs space-y-1.5 text-[#1C1917]">
            <div className="flex items-center justify-between text-xs text-[#57534E] font-mono">
              <span className="text-indigo-700 font-extrabold">[{item.timestamp}]</span>
              {item.meta && (
                <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-extrabold uppercase text-[10px] border border-indigo-300">
                  {item.meta}
                </span>
              )}
            </div>

            <h4 className="text-base font-black text-[#1C1917] font-sans tracking-tight">{item.title}</h4>
            <p className="text-xs text-[#57534E] leading-relaxed font-mono font-medium">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
