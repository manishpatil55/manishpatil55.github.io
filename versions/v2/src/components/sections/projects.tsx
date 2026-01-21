'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@components/icons';
import { Project } from '@/types';

interface ProjectsProps {
  data: Project[];
}

const Projects = ({ data }: ProjectsProps) => {
  const [showMore, setShowMore] = useState(false);
  const GRID_LIMIT = 6;
  const projects = data.filter((project) => project.slug !== 'featured');

  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="flex flex-col items-center py-[100px] max-w-[1000px] mx-auto text-center" id="noteworthy-projects">
      <h2 className="text-[clamp(24px,5vw,32px)] text-lightest-slate font-semibold mb-[10px]">
        Other Noteworthy Projects
      </h2>

      <Link href="/archive" className="inline-block relative text-green font-mono text-sm mb-[50px] after:content-[''] after:block after:w-0 after:h-[1px] after:relative after:bottom-[0.37em] after:bg-green after:transition-all after:duration-300 hover:after:w-full">
        view the archive
      </Link>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] relative mt-[50px] list-none p-0 w-full text-left">
        <AnimatePresence initial={false}>
          {projectsToShow &&
            projectsToShow.map((project, i) => {
              const { title, tech, github, external, contentHtml } = project;

              return (
                <motion.li
                  key={i}
                  className="relative cursor-default transition-all duration-250 ease-[var(--easing)] group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  layout
                >
                  <div className="flex flex-col items-start relative h-full px-[1.75rem] py-[2rem] rounded bg-light-navy transition-all duration-250 hover:-translate-y-2 hover:shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)] h-full overflow-auto">
                    <header className="block mb-[30px] w-full">
                      <div className="flex justify-between items-center mb-[35px] text-green">
                        <div className="folder w-[40px] h-[40px] [&>svg]:w-full [&>svg]:h-full text-green">
                          <Icon name="Folder" />
                        </div>
                        <div className="flex items-center -mr-[10px] text-light-slate relative z-10">
                          {github && (
                            <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer" className="p-[10px] hover:text-green w-10 h-10 flex justify-center items-center transition-colors">
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {external && (
                            <a
                              href={external}
                              aria-label="External Link"
                              className="p-[10px] hover:text-green w-10 h-10 flex justify-center items-center transition-colors"
                              target="_blank"
                              rel="noreferrer">
                              <Icon name="External" />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="mb-[10px] text-lightest-slate text-xl font-bold group-hover:text-green transition-colors">
                        <a href={external || github} target="_blank" rel="noreferrer" className="block static before:content-[''] before:block before:absolute before:z-0 before:w-full before:h-full before:top-0 before:left-0">
                          {title}
                        </a>
                      </h3>

                      <div className="text-light-slate text-[17px] leading-relaxed" dangerouslySetInnerHTML={{ __html: contentHtml }} />
                    </header>

                    <footer className="mt-auto w-full">
                      {tech && (
                        <ul className="flex items-end flex-grow flex-wrap p-0 m-[20px_0_0_0] list-none text-slate font-mono text-xs leading-[1.75]">
                          {tech.map((t, idx) => (
                            <li key={idx} className="mr-[15px] last:mr-0 mb-[5px]">{t}</li>
                          ))}
                        </ul>
                      )}
                    </footer>
                  </div>
                </motion.li>
              );
            })}
        </AnimatePresence>
      </ul>

      {projects.length > GRID_LIMIT && (
        <button
          className="mt-[80px] btn-big px-[30px] py-[18px] border border-green rounded text-green font-mono text-sm hover:bg-green-tint transition-colors"
          onClick={() => setShowMore(!showMore)}
        >
          Show {showMore ? 'Less' : 'More'}
        </button>
      )}
    </section>
  );
};

export default Projects;
