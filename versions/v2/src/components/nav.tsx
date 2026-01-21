'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { navLinks } from '@config';
import { loaderDelay } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu, StarBorder, GradientText } from '@components';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface NavProps {
  isHome?: boolean;
}

const Nav = ({ isHome }: NavProps) => {
  const [isMounted, setIsMounted] = useState(true);
  const scrollDirection = useScrollDirection({ initialDirection: 'down' });
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (isHome) {
      setIsMounted(false);
      const timeout = setTimeout(() => setIsMounted(true), 100);
      return () => clearTimeout(timeout);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  const logoAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, delay: 0 } }
  };

  const staggerLinks = {
    initial: { opacity: 0, y: -20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: 'easeInOut' as const
      }
    })
  };

  return (
    // Added 'flex items-center' to header to vertically center the inner <nav>
    <header
      className={clsx(
        'fixed top-0 z-[100] w-full px-[25px] md:px-[40px] lg:px-[50px] transition-all duration-300 ease-[var(--easing)] flex items-center',
        scrolledToTop ? 'bg-navy/70 backdrop-blur-md h-[var(--nav-height)]' : 'bg-navy/85 backdrop-blur-lg h-[var(--nav-scroll-height)] shadow-xl',
        (scrollDirection === 'up' && !scrolledToTop) && 'translate-y-0',
        (scrollDirection === 'down' && !scrolledToTop) && '-translate-y-full'
      )}
    >
      <nav className="flex justify-between items-center relative w-full text-lightest-slate font-mono z-50">
        <motion.div
          className="flex justify-center items-center"
          tabIndex={-1}
          variants={logoAnimation}
          initial="initial"
          animate="animate"
        >
          {isHome ? (
            <a href="/" aria-label="home" className="relative z-10 group">
              {/* <img 
                src="/alien-monster.gif" 
                alt="Logo" 
                className="w-[50px] h-[50px] transition-transform duration-300 group-hover:scale-110" 
              /> */}
              <img
                src="/favicon.ico"
                alt="Logo"
                className="w-[55px] h-[65px] transition-transform duration-300 group-hover:scale-110"
              />
            </a>
          ) : (
            <Link href="/" aria-label="home" className="relative z-10 group">
              {/* <img 
                src="/alien-monster.gif" 
                alt="Logo" 
                className="w-[50px] h-[50px] transition-transform duration-300 group-hover:scale-110" 
              /> */}
              <img
                src="/favicon.ico"
                alt="Logo"
                className="w-[55px] h-[65px] transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
          )}
        </motion.div>

        <div className="hidden md:flex items-center">
          <ol className="flex justify-between items-center p-0 m-0 list-none">
            {navLinks && navLinks.map(({ url, name }, i) => (
              <motion.li
                key={i}
                className="mx-[5px] relative counter-increment-item text-xs"
                custom={i}
                variants={staggerLinks}
                initial="initial"
                animate="animate"
              >
                <Link href={url} className="p-[10px] before:content-['0'_counter(item)_'.'] before:mr-[5px] before:text-green before:text-[var(--fz-xxs)] before:text-right hover:text-green transition-colors">
                  {name}
                </Link>
              </motion.li>
            ))}
          </ol>

          <motion.div
            custom={navLinks.length}
            variants={staggerLinks}
            initial="initial"
            animate="animate"
          >
            <a href="/Manish_Kakulde_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <StarBorder
                as="button"
                className="text-green text-xs"
                color="#64ffda"
                speed="4s"
              >
                <GradientText
                  colors={['#ccd6f6', '#64ffda']}
                  animationSpeed={3}
                  showBorder={false}
                  className="font-mono text-xs"
                  textClassName="transition-all duration-300 group-hover:font-extrabold"
                >
                  Resume
                </GradientText>
              </StarBorder>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="block md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          <Menu />
        </motion.div>
      </nav>
    </header>
  );
};

export default Nav;
