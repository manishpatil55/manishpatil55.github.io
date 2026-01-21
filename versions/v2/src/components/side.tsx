'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import clsx from 'clsx';

interface SideProps {
  children: React.ReactNode;
  isHome?: boolean;
  orientation: 'left' | 'right';
}

const Side = ({ children, isHome, orientation }: SideProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isHome || prefersReducedMotion) {
      setIsMounted(true);
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
    return () => clearTimeout(timeout);
  }, [isHome, prefersReducedMotion]);

  return (
    <div
      className={clsx(
        'w-10 fixed bottom-0 z-10 text-light-slate hidden md:block',
        orientation === 'left' ? 'left-5 lg:left-10' : 'right-5 lg:right-10'
      )}
    >
      {/* Prevent Hydration Mismatch by only rendering after mount if conditional logic is used */}
      {isMounted && (prefersReducedMotion ? (
        <>{children}</>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: isHome ? 2 : 0 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default Side;
