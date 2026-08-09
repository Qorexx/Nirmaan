'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  position?: 'right' | 'bottom' | 'left';
  widthClass?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  position = 'right',
  widthClass = 'w-full sm:max-w-xl md:max-w-2xl'
}) => {
  const getInitialPosition = () => {
    switch (position) {
      case 'right': return { x: '100%' };
      case 'left': return { x: '-100%' };
      case 'bottom': return { y: '100%' };
      default: return { x: '100%' };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-surface-secondary/40 backdrop-blur-sm"
          />

          {/* Drawer Slide Panel */}
          <div className={`fixed inset-y-0 right-0 flex max-w-full pl-10 ${position === 'left' ? 'left-0 right-auto pr-10 pl-0' : ''}`}>
            <motion.div
              initial={getInitialPosition()}
              animate={{ x: 0, y: 0 }}
              exit={getInitialPosition()}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`relative ${widthClass} bg-surface border-l border-subtle text-primary shadow-[0_0_60px_rgba(28,25,23,0.15)] flex flex-col h-full z-10 font-mono`}
            >
              {/* Header Bar */}
              <div className="p-6 bg-surface-secondary border-b border-subtle flex items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-surface border border-subtle text-indigo-700">
                    <Layers className="w-5 h-5 text-indigo-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-primary font-heading">{title}</h3>
                    {subtitle && <p className="text-xs text-secondary font-semibold mt-0.5">{subtitle}</p>}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-surface hover:bg-surface-secondary text-secondary hover:text-primary transition-colors border border-subtle"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-primary bg-surface">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

