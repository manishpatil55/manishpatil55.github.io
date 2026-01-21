'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { navLinks } from '@config';
import { useOnClickOutside } from '@hooks';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  let menuFocusTrap = useRef<HTMLElement | null>(null);
  let firstFocusableEl: HTMLElement | null = null;
  let lastFocusableEl: HTMLElement | null = null;

  const setFocusables = () => {
    if (!menuFocusTrap.current) return;
    const focusableEls = menuFocusTrap.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select'
    );
    firstFocusableEl = focusableEls[0] as HTMLElement;
    lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement;
  };

  const handleKeyDown = (e: React.KeyboardEvent | KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
    }
    if (e.key === 'Tab' || e.keyCode === 9) {
      if (!menuOpen) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl?.focus();
          e.preventDefault();
        }
      }
    }
  };

  useOnClickOutside(navRef as React.RefObject<HTMLElement>, () => setMenuOpen(false));

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      if ((e.currentTarget as Window).innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', handleKeyDown); // Add global keydown listener

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      setFocusables(); // Re-calculate focusables when menu opens
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [menuOpen]);


  const sidebarVariants = {
    open: { translateX: 0, transition: { type: "tween", duration: 0.3 } },
    closed: { translateX: "100%", transition: { type: "tween", duration: 0.3 } }
  };

  return (
    <div className="md:hidden block">
      {/* Hamburger Button */}
      <button
        className="group relative z-50 flex justify-center items-center w-8 h-8 md:hidden bg-transparent border-none cursor-pointer p-0"
        onClick={toggleMenu}
        ref={buttonRef}
        aria-label="Menu"
      >
        <div className="flex flex-col justify-between w-full h-[24px] pointer-events-none group-hover:first:translate-y-[-2px]">
          {/* Ham Bars - Simplified animation check logic or use basic transform logic directly */}
          <div className={clsx("w-full h-[2px] bg-green rounded-sm transition-transform duration-300 origin-right", menuOpen ? "rotate-[-45deg] translate-y-[-4px]" : "")} />
          <div className={clsx("w-4/5 h-[2px] bg-green rounded-sm transition-opacity duration-300 self-end", menuOpen ? "opacity-0" : "opacity-100")} />
          <div className={clsx("w-full h-[2px] bg-green rounded-sm transition-transform duration-300 origin-right", menuOpen ? "rotate-[45deg] translate-y-[4px]" : "")} />
        </div>
      </button>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 bottom-0 right-0 py-12 px-2.5 w-[min(75vw,400px)] h-screen outline-none bg-light-navy shadow-xl z-40 transition-transform duration-300 md:hidden flex flex-col justify-center",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
        ref={navRef}
        aria-hidden={!menuOpen}
      // Using CSS class for transform instead of Framer Motion for Sidebar wrapper itself to avoid mounting issues, 
      // but let's actually use Framer Motion for cleaner exit animation if we want.
      // Sticking to conditional class for 'as-is' behavior which was pure CSS transition often.
      // Actually, the original used styled components with props.
      // Let's use Tailwind transform classes for simplicity.
      >
        <nav className="flex flex-col justify-between items-center w-full text-center" ref={el => { if (el) menuFocusTrap.current = el }}>
          <ul className="w-full flex flex-col gap-5 p-0 m-0 list-none">
            {navLinks && navLinks.map(({ url, name }, i) => (
              <li key={i} className="relative mx-auto my-[3px] counter-increment-item text-lg sm:text-lg">
                <Link
                  href={url}
                  className="inline-block px-5 py-[3px] w-full text-lightest-slate font-mono hover:text-green"
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          <a href="/resume.pdf" className="mt-10 btn-big px-12 py-4 border border-green text-green rounded rounded-md hover:bg-green-tint transition-colors block w-max mx-auto text-sm font-mono" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </nav>
      </aside>

      {/* Blur Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 z-30 bg-navy/50 backdrop-blur-[2px] transition-opacity duration-300 md:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMenuOpen(false)}
      />
    </div>
  );
};

export default Menu;
