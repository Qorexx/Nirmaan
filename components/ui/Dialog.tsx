'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Info, CheckCircle2, HelpCircle } from 'lucide-react';
import { Button } from './Button';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success' | 'confirm';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  type = 'confirm',
  confirmText = 'Confirm Action',
  cancelText = 'Cancel',
  onConfirm,
  isLoading = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-6 h-6 text-amber-600" />;
      case 'error': return <AlertTriangle className="w-6 h-6 text-rose-600" />;
      case 'success': return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
      case 'info': return <Info className="w-6 h-6 text-blue-600" />;
      default: return <HelpCircle className="w-6 h-6 text-indigo-600" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-surface-secondary/40 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }}
            className="relative bg-surface border border-subtle rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_20px_60px_rgba(28,25,23,0.18)] z-10 text-primary font-mono space-y-6"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-secondary hover:text-primary p-1.5 rounded-lg bg-surface-secondary hover:bg-surface-secondary transition-colors border border-subtle"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-surface-secondary border border-subtle shrink-0 shadow-2xs">
                {getIcon()}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-primary font-heading">{title}</h3>
                {description && <p className="text-xs sm:text-sm text-secondary font-mono leading-relaxed font-semibold">{description}</p>}
              </div>
            </div>

            {children && <div className="py-2">{children}</div>}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-subtle">
              <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
                {cancelText}
              </Button>
              {onConfirm && (
                <Button
                  variant={type === 'error' || type === 'warning' ? 'danger' : 'primary'}
                  size="sm"
                  onClick={onConfirm}
                  isLoading={isLoading}
                >
                  {confirmText}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

