import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEscrowStore } from '../../store/useEscrowStore';

export const AnimatedRouteTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentPage } = useEscrowStore();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full h-full flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
