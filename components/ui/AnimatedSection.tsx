'use client';
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface AnimatedSectionProps extends HTMLMotionProps<'section'> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0.1,
  direction = 'up',
  ...props
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 30 };
      case 'down': return { opacity: 0, y: -30 };
      case 'left': return { opacity: 0, x: 30 };
      case 'right': return { opacity: 0, x: -30 };
      case 'none':
      default: return { opacity: 0 };
    }
  };

  return (
    <motion.section
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`w-full ${className}`}
      {...props}
    >
      {children}
    </motion.section>
  );
};

