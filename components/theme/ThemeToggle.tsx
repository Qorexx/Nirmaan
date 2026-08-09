'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, ThemeMode } from './ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const options: { id: ThemeMode; icon: React.ReactNode; label: string }[] = [
    { id: 'light', icon: <Sun className="w-3.5 h-3.5" />, label: 'Light' },
    { id: 'system', icon: <Monitor className="w-3.5 h-3.5" />, label: 'System' },
    { id: 'dark', icon: <Moon className="w-3.5 h-3.5" />, label: 'Dark' },
  ];

  return (
    <div className="flex items-center p-1 bg-[var(--color-bg-surface-secondary)] border border-[var(--color-border-subtle)] rounded-xl shadow-inner select-none w-fit">
      {options.map((option) => {
        const isSelected = theme === option.id;
        return (
          <button
            key={option.id}
            onClick={() => setTheme(option.id)}
            title={`Switch to ${option.label} theme`}
            className={`relative flex flex-col items-center justify-center w-14 h-9 z-10 transition-colors duration-200 ${
              isSelected ? 'text-[var(--color-text-primary)] font-bold' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-medium'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="theme-toggle-indicator"
                className="absolute inset-0 bg-[var(--color-bg-surface)] rounded-lg shadow-sm border border-[var(--color-border-subtle)]"
                initial={false}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <div className="relative z-20 flex flex-col items-center justify-center gap-0.5">
              {option.icon}
              <span className="text-[9px] uppercase tracking-wider">{option.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
