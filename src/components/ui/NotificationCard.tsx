import React from 'react';
import { motion } from 'framer-motion';
import { Bell, ArrowRight, X, Zap, ShieldAlert, CheckCircle } from 'lucide-react';
import { Button } from './Button';

export interface NotificationCardProps {
  id?: string;
  title: string;
  description: string;
  timestamp?: string;
  severity?: 'normal' | 'urgent' | 'x402' | 'success';
  onDismiss?: () => void;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  description,
  timestamp = 'Just now',
  severity = 'normal',
  onDismiss,
  actionText,
  onAction,
  className = ''
}) => {
  const getSeverityStyle = () => {
    switch (severity) {
      case 'urgent': return 'bg-rose-50 border-rose-300 hover:border-rose-400 text-rose-950';
      case 'x402': return 'bg-amber-50 border-amber-300 hover:border-amber-400 text-amber-950';
      case 'success': return 'bg-[#EAF5F0] border-emerald-300 hover:border-emerald-400 text-emerald-950';
      case 'normal':
      default: return 'bg-[#F7F5F0] border-[#D6D0C4] hover:border-[#818CF8] text-[#1C1917]';
    }
  };

  const getIcon = () => {
    switch (severity) {
      case 'urgent': return <ShieldAlert className="w-5 h-5 text-rose-700 animate-pulse" />;
      case 'x402': return <Zap className="w-5 h-5 text-amber-700 fill-current animate-bounce" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-700" />;
      default: return <Bell className="w-5 h-5 text-indigo-700" />;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-5 rounded-2xl border transition-all duration-200 shadow-[0_10px_30px_rgba(28,25,23,0.07)] font-mono space-y-3 relative ${getSeverityStyle()} ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#EAE5DC] border border-[#D6D0C4] shrink-0 shadow-2xs">
            {getIcon()}
          </div>
          <div>
            <h4 className="font-black text-[#1C1917] text-base font-sans tracking-tight flex items-center gap-2">
              <span>{title}</span>
              <span className="text-[10px] font-mono font-bold text-[#78716C]">[{timestamp}]</span>
            </h4>
            <p className="text-xs text-[#57534E] font-mono mt-1 leading-relaxed font-semibold">{description}</p>
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1.5 rounded-lg hover:bg-[#EAE5DC] text-[#78716C] hover:text-[#1C1917] transition-colors"
            title="Dismiss Notification"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {actionText && onAction && (
        <div className="pt-2 flex justify-end">
          <Button
            variant={severity === 'x402' ? 'x402' : severity === 'urgent' ? 'danger' : 'outline'}
            size="sm"
            onClick={onAction}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            {actionText}
          </Button>
        </div>
      )}
    </motion.div>
  );
};
