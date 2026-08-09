'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`w-full space-y-1.5 font-mono relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-xs uppercase tracking-wider font-extrabold text-primary font-heading">
          {label}
        </label>
      )}
      
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-surface-secondary text-primary text-left text-sm px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between focus:outline-none ${
          isOpen ? 'border-accent-indigo ring-2 ring-indigo-500/20 bg-surface' : 'border-subtle hover:border-[#A8A193]'
        } ${disabled ? 'opacity-50 cursor-not-allowed bg-surface-secondary' : 'cursor-pointer'}`}
      >
        <span className="flex items-center gap-2 text-primary truncate font-bold">
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className="text-indigo-700">{selectedOption.icon}</span>}
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-secondary">{placeholder}</span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-700' : ''}`} />
      </button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-2 bg-surface border border-subtle rounded-xl shadow-[0_15px_40px_rgba(28,25,23,0.15)] z-50 overflow-hidden max-h-60 overflow-y-auto divide-y divide-[#D6D0C4]"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-xs sm:text-sm flex items-center justify-between transition-colors ${
                    isSelected ? 'bg-indigo-100 text-indigo-950 font-black' : 'text-primary hover:bg-surface-secondary font-semibold'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    {option.icon && <span className={isSelected ? 'text-indigo-700' : 'text-secondary'}>{option.icon}</span>}
                    <span className="font-sans">{option.label}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {option.badge && (
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-300 font-bold">
                        {option.badge}
                      </span>
                    )}
                    {isSelected && <Check className="w-4 h-4 text-indigo-700 shrink-0 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

