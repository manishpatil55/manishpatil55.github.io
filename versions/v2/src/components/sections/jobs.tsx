'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@hooks';
import clsx from 'clsx';
import { Job } from '@/types';
import Link from 'next/link';

interface JobsProps {
  data: Job[];
}

const Jobs = ({ data }: JobsProps) => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const focusTab = () => {
    if (tabFocus !== null && tabs.current[tabFocus]) {
      tabs.current[tabFocus]?.focus();
      return;
    }
    // Loop focus logic
    if (tabFocus === null) return;
    if (tabFocus >= tabs.current.length) setTabFocus(0);
    if (tabFocus < 0) setTabFocus(tabs.current.length - 1);
  };

  useEffect(() => focusTab(), [tabFocus]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setTabFocus((prev) => (prev !== null ? prev - 1 : 0));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setTabFocus((prev) => (prev !== null ? prev + 1 : 0));
        break;
      default:
        break;
    }
  };

  return (
    <motion.section
      id="jobs"
      className="max-w-[700px] mx-auto py-[100px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="flex items-center relative mb-[40px] w-full text-2xl md:text-3xl text-lightest-slate font-semibold whitespace-nowrap after:content-[''] after:block after:relative after:top-[-1px] after:w-[300px] after:h-[1px] after:ml-[20px] after:bg-lightest-navy/50 font-sans counter-increment-section before:content-['0'_counter(section)_'.'] before:mr-[10px] before:text-green before:font-mono before:text-xl font-normal">
        Where I’ve Worked
      </h2>

      <div className="flex flex-col md:flex-row min-h-[340px]">
        {/* Tab List */}
        <div
          role="tablist"
          aria-label="Job tabs"
          onKeyDown={onKeyDown}
          className="relative z-10 w-screen -ml-[50vw] left-[50%] pr-[50vw] pl-[50vw] md:w-max md:ml-0 md:left-0 md:p-0 flex overflow-x-auto md:overflow-visible mb-[30px] md:mb-0 md:block list-none scrollbar-hide"
        >
          {data &&
            data.map((job, i) => (
              <button
                key={i}
                ref={(el) => { tabs.current[i] = el }}
                id={`tab-${i}`}
                role="tab"
                tabIndex={activeTabId === i ? 0 : -1}
                aria-selected={activeTabId === i}
                aria-controls={`panel-${i}`}
                onClick={() => setActiveTabId(i)}
                className={clsx(
                  "flex items-center w-[120px] min-w-[120px] md:w-full px-[15px] md:px-[20px] pb-[10px] md:py-[10px] bg-transparent border-b-2 md:border-b-0 md:border-l-2 font-mono text-xs text-left cursor-pointer transition-all duration-250 hover:bg-light-navy hover:text-green focus:bg-light-navy focus:text-green",
                  activeTabId === i ? "border-green text-green" : "border-lightest-navy text-slate"
                )}
              >
                <span>{job.company}</span>
              </button>
            ))}

          {/* Highlight Line (Animated if possible, or just rely on border color change above which is cleaner in Tailwind)
                If we want the sliding line effect, we need a separate absolute div. 
                For "As It Is", let's try to add it.
            */}
          <div
            className={clsx(
              "absolute top-auto bottom-0 md:top-0 md:bottom-auto left-0 z-10 w-full md:w-[2px] h-[2px] md:h-[var(--tab-height)] bg-green transition-transform duration-250 ease-[cubic-bezier(0.645,0.045,0.355,1)]",
              // We need dynamic transform based on activeTabId. 
              // This is hard in pure Tailwind classes without style attribute.
              // Let's use style.
            )}
            style={{
              transform: typeof window !== 'undefined' && window.innerWidth > 768
                ? `translateY(calc(${activeTabId} * 42px))` // 42px is tab height
                : `translateX(calc(${activeTabId} * 120px))` // 120px is tab width
            }}
          />
        </div>

        {/* Tab Panels */}
        <div className="relative w-full ml-0 md:ml-[20px]">
          <AnimatePresence mode='wait'>
            {data && data.map((job, i) => (
              activeTabId === i && (
                <motion.div
                  key={i}
                  id={`panel-${i}`}
                  role="tabpanel"
                  tabIndex={0}
                  aria-labelledby={`tab-${i}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-auto py-[10px] px-[5px]"
                >
                  <h3 className="mb-[2px] text-xl font-medium leading-[1.3] text-lightest-slate">
                    <span>{job.title}</span>
                    <span className="text-green">
                      &nbsp;@&nbsp;
                      <Link href={job.url} target="_blank" className="relative inline-block text-green after:content-[''] after:block after:w-0 after:h-[1px] after:relative after:bottom-[0.37em] after:bg-green after:transition-all after:duration-300 hover:after:w-full">
                        {job.company}
                      </Link>
                    </span>
                  </h3>

                  <p className="mb-[25px] text-light-slate font-mono text-xs">
                    {job.range}
                  </p>

                  <div
                    className="text-light-slate text-lg [&>ul]:p-0 [&>ul]:m-0 [&>ul]:list-none [&>ul>li]:relative [&>ul>li]:pl-[30px] [&>ul>li]:mb-[10px] [&>ul>li]:before:content-['▹'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-green"
                    dangerouslySetInnerHTML={{ __html: job.contentHtml }}
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default Jobs;
