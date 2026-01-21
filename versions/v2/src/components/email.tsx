'use client';

import React from 'react';
import { email } from '@config';
import { Side, ShinyText } from '@components';

const Email = ({ isHome }: { isHome?: boolean }) => (
  <Side isHome={isHome} orientation="right">
    <div className="flex flex-col items-center relative after:block after:w-[1px] after:h-24 after:bg-light-slate after:mx-auto">
      <a
        href={`mailto:${email}`}
        className="my-5 p-2.5 [writing-mode:vertical-rl] hover:-translate-y-1 focus:-translate-y-1 transition-all"
      >
        <ShinyText
          text={email}
          disabled={false}
          speed={3}
          className="text-sm font-mono tracking-widest"
          color="#8892b0"
          shineColor="#ffffff"
          vertical={true}
        />
      </a>
    </div>
  </Side>
);

export default Email;
