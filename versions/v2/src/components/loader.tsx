'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  finishLoading: () => void;
}

const Loader = ({ finishLoading }: LoaderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Mount immediately

    // Adjust duration based on GIF length or desired wait time
    // Let's give it 2.5 seconds to breathe
    const timeout = setTimeout(() => {
      setIsMounted(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => finishLoading()}
    >
      {isMounted && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)',
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          {/* Alien Monster GIF */}
          <div className="relative flex items-center justify-center">
            {/* Breathing Neon Glow */}
            <motion.div
              className="absolute inset-0 bg-green/20 blur-[60px] rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            <img
              src={`/alien-monster.gif?t=${Date.now()}`}
              alt="Loading..."
              className="w-64 h-64 md:w-80 md:h-80 object-contain relative z-10"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
