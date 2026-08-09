'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  headerBadge?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = 'lg',
  headerBadge = 'OS MODAL'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'max-w-md';
      case 'md': return 'max-w-2xl';
      case 'xl': return 'max-w-5xl';
      case 'full': return 'max-w-[95%] h-[90vh]';
      case 'lg':
      default: return 'max-w-4xl';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 sm:overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-surface-secondary/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`relative w-full ${getSizeClass()} bg-surface border border-subtle rounded-3xl shadow-[0_25px_80px_rgba(28,25,23,0.18)] z-10 flex flex-col overflow-hidden max-h-[90vh] text-primary`}
          >
            {/* Title Bar */}
            <div className="px-6 py-4 bg-surface-secondary border-b border-subtle flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-surface-secondary text-accent-indigo border border-subtle">
                  <Shield className="w-5 h-5 animate-pulse text-accent-indigo" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-primary font-heading tracking-wide">{title}</h3>
                    {headerBadge && (
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300 font-extrabold">
                        {headerBadge}
                      </span>
                    )}
                  </div>
                  {subtitle && <p className="text-xs text-secondary font-mono mt-0.5">{subtitle}</p>}
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-surface hover:bg-surface-secondary text-secondary hover:text-primary transition-colors border border-subtle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto font-mono space-y-6 text-primary text-sm flex-1 bg-surface">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

