'use client';

import React from 'react';
import { Icon } from '@components/icons';
import { FluidGrid } from '@components';
import { socialMedia } from '@config';

const Footer = () => (
  <footer className="flex justify-center items-center flex-col h-auto min-h-[70px] text-center w-full relative">
    <div className="p-[15px] flex flex-col items-center justify-center w-full z-10 relative">
      <div className="hidden md:hidden w-full max-w-[270px] mb-[10px] mx-auto text-light-slate">
        <ul className="flex justify-between items-center p-0 m-0 list-none">
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name} className="p-[10px] w-5 h-5 block svg:w-[20px] svg:h-[20px]">
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </div>

      <div className="font-mono text-xs leading-relaxed text-light-slate hover:text-green cursor-pointer transition-colors" tabIndex={-1}>
        <a href="https://github.com/bchiang7/v4" target="_blank" rel="noreferrer">
          {/* Attribution Removed */}
        </a>
      </div>
    </div>

    {/* Global FluidGrid Footer - Aligned between sidebars */}
    <div className="absolute bottom-0 w-full h-[20px] overflow-hidden z-0 pointer-events-auto flex justify-center px-10 lg:px-16">
      <FluidGrid
        rows={1}
        columns={175}
        mobileColumns={50}
        containerSize="100%"
        lineColor="#a8b2d1"
        lineWidth="2px"
        lineHeight="15px"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  </footer>
);

export default Footer;
