'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@components/icons';
import { GradientText } from '@components';
import clsx from 'clsx';
import { Project } from '@/types';

interface FeaturedProps {
  data: Project[];
}

const Featured = ({ data }: FeaturedProps) => {
  return (
    <section id="projects" className="py-[100px] max-w-[1000px] mx-auto">
      <motion.h2
        className="flex items-center relative mb-[40px] w-full text-2xl md:text-3xl text-lightest-slate font-semibold whitespace-nowrap after:content-[''] after:block after:relative after:top-[-1px] after:w-[300px] after:h-[1px] after:ml-[20px] after:bg-lightest-navy/50 font-sans counter-increment-section before:content-['0'_counter(section)_'.'] before:mr-[10px] before:text-green before:font-mono before:text-xl font-normal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Some Things I’ve Built
      </motion.h2>

      <ul className="p-0 m-0 list-none">
        {data &&
          data.map((project, i) => {
            const { external, title, tech, github, cover, cta, contentHtml, id } = project;

            // Generate valid image path from frontmatter
            const imagePath = cover ? `/content/featured/${id}/${cover.replace('./', '')}` : '';
            const isEven = i % 2 === 0;

            return (
              <motion.li
                key={i}
                className="relative grid grid-cols-12 gap-[10px] items-center mb-[70px] md:mb-[100px] last:mb-0 shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)] md:shadow-none bg-light-navy md:bg-transparent rounded-md md:rounded-none transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                {/* Content Side */}
                <div className={clsx(
                  "relative row-start-1 col-span-12 md:col-span-8 z-20 p-[30px_25px_20px] md:p-0 flex flex-col justify-center h-full md:h-auto",
                  isEven ? "md:col-start-5 md:text-right md:items-end md:pl-[10%]" : "md:col-start-1 md:text-left md:items-start md:pr-[10%]"
                )}>
                  <p className="my-[10px] text-green font-mono text-xs font-normal">
                    <GradientText colors={['#57cbff', '#f57dff']} animationSpeed={3} showBorder={false} className="font-mono text-xs">
                      Featured Project
                    </GradientText>
                  </p>
                  <h3 className="text-lightest-slate text-[clamp(24px,5vw,28px)] font-bold mb-[20px]">
                    <a href={external || github} target="_blank" rel="noreferrer" className="transition-colors static before:content-[''] before:block before:absolute before:z-0 before:w-full before:h-full before:top-0 before:left-0 md:before:hidden group">
                      <GradientText colors={['#ccd6f6', '#64ffda']} animationSpeed={3} showBorder={false} className="font-bold">
                        {title}
                      </GradientText>
                    </a>
                  </h3>

                  <div
                    className="featured-description md:bg-light-navy/90 md:backdrop-blur-sm md:p-[25px] rounded-xl md:border md:border-green/20 text-light-slate text-sm md:shadow-[0_0_20px_-10px_rgba(100,255,218,0.1)] z-20 relative hover:shadow-none transition-shadow w-full text-left leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                  <style jsx global>{`
                    .featured-description p { display: block; margin-bottom: 15px; }
                    .featured-description p:last-child { margin-bottom: 0; }
                    .featured-description ul { list-style: none; padding: 0; margin: 0; }
                    .featured-description li { margin-bottom: 10px; display: block; }
                    .featured-description li:last-child { margin-bottom: 0; }
                    .featured-description a { color: var(--green); }
                  `}</style>

                  {tech && (
                    <ul className={clsx(
                      "flex flex-wrap mt-[25px] mb-[10px] p-0 list-none text-light-slate font-mono text-xs z-20",
                      isEven ? "justify-end" : "justify-start"
                    )}>
                      {tech.map((t, idx) => (
                        <motion.li
                          key={idx}
                          whileHover={{ borderColor: 'rgba(100,255,218,1)', boxShadow: '0 0 12px rgba(100,255,218,0.6)' }}
                          className={clsx(
                            "mb-[8px] whitespace-nowrap px-3 py-1 rounded-full text-xs font-mono bg-light-navy border border-green/20 text-green transition-all shadow-[0_2px_5px_rgba(0,0,0,0.2)] cursor-default",
                            isEven ? "ml-[10px] mr-0" : "mr-[10px] ml-0"
                          )}
                        >
                          {t}
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  <div className={clsx(
                    "flex items-center relative mt-[10px] text-lightest-slate z-20",
                    isEven ? "justify-end mr-[-10px]" : "justify-start ml-[-10px]"
                  )}>
                    {github && (
                      <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer" className="p-[10px] hover:text-green w-10 h-10 flex justify-center items-center">
                        <Icon name="GitHub" />
                      </a>
                    )}
                    {external && (
                      <a href={external} aria-label="External Link" target="_blank" rel="noreferrer" className="p-[10px] hover:text-green w-10 h-10 flex justify-center items-center">
                        <Icon name="External" />
                      </a>
                    )}
                  </div>


                </div>

                {/* Image Side */}
                <div className={clsx(
                  "absolute md:relative inset-0 md:inset-auto row-start-1 col-span-12 md:col-span-7 h-auto z-0 md:z-10 transition-all duration-500",
                  isEven
                    ? "md:col-start-1 md:col-end-8" // Image Left (Col 1-8)
                    : "md:col-start-6 md:col-end-[-1]" // Image Right (Col 6-13)
                )}>
                  <motion.a
                    href={external || github || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full h-auto block relative rounded transition-all duration-200 group overflow-hidden"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Image */}
                    <div className="w-full h-full relative z-[1] transition-all duration-300">
                      {imagePath && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={imagePath}
                          alt={title}
                          className="w-full h-auto rounded"
                        />
                      )}
                    </div>
                  </motion.a>
                </div>
              </motion.li>
            );
          })}
      </ul>
    </section >
  );
};

export default Featured;
