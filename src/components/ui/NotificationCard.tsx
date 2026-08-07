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
      case 'urgent': return 'bg-rose-500/10 border-rose-500/30 hover:border-rose-500/50 text-primary';
      case 'x402': return 'bg-accent-gold/10 border-accent-gold/30 hover:border-accent-gold/50 text-primary';
      case 'success': return 'bg-accent-emerald/10 border-accent-emerald/30 hover:border-accent-emerald/50 text-primary';
      case 'normal':
      default: return 'bg-surface border-subtle hover:border-accent-indigo/50 text-primary';
    }
  };

  const getIcon = () => {
    switch (severity) {
      case 'urgent': return <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />;
      case 'x402': return <Zap className="w-5 h-5 text-accent-gold fill-current animate-bounce" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-accent-emerald" />;
      default: return <Bell className="w-5 h-5 text-accent-indigo" />;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-5 rounded-2xl border transition-all duration-200 shadow-[0_10px_30px_rgba(28,25,23,0.07)] font-mono space-y-3 relative ${getSeverityStyle()} ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-surface-secondary border border-subtle shrink-0 shadow-2xs">
            {getIcon()}
          </div>
          <div>
            <h4 className="font-black text-primary text-base font-heading tracking-tight flex items-center gap-2">
              <span>{title}</span>
              <span className="text-[10px] font-mono font-bold text-secondary">[{timestamp}]</span>
            </h4>
            <p className="text-xs text-secondary font-mono mt-1 leading-relaxed font-semibold">{description}</p>
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1.5 rounded-lg hover:bg-surface-secondary text-secondary hover:text-primary transition-colors"
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
