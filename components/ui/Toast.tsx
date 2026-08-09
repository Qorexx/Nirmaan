'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Zap, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'info' | 'x402';
  duration?: number;
}

export interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full font-mono pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 4500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const getStyle = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-accent-emerald/10 border-accent-emerald text-primary shadow-[0_15px_35px_rgba(4,120,87,0.15)]';
      case 'error':
        return 'bg-rose-500/10 border-rose-500 text-primary shadow-[0_15px_35px_rgba(225,29,72,0.15)]';
      case 'x402':
        return 'bg-accent-gold/10 border-accent-gold text-primary shadow-[0_15px_35px_rgba(180,83,9,0.15)]';
      case 'info':
      default:
        return 'bg-accent-indigo/10 border-accent-indigo text-primary shadow-[0_15px_35px_rgba(67,56,202,0.15)]';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />;
      case 'x402': return <Zap className="w-5 h-5 text-amber-700 fill-current animate-bounce shrink-0" />;
      case 'info':
      default: return <Info className="w-5 h-5 text-indigo-700 shrink-0" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      className={`pointer-events-auto p-4 rounded-2xl border-2 flex items-start justify-between gap-3 ${getStyle()}`}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="space-y-0.5">
          <p className="text-sm font-black text-primary font-heading">{toast.title}</p>
          {toast.message && <p className="text-xs text-secondary font-medium leading-snug font-mono">{toast.message}</p>}
        </div>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded-lg hover:bg-slate-200 text-secondary hover:text-primary transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

