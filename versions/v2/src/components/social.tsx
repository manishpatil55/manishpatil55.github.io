'use client';

import React from 'react';
import { socialMedia } from '@config';
import { Icon } from '@components/icons';
import { Side } from '@components';

const Social = ({ isHome }: { isHome?: boolean }) => (
  <Side isHome={isHome} orientation="left">
    <ul className="flex flex-col items-center m-0 p-0 list-none after:block after:w-[1px] after:h-24 after:bg-light-slate after:mx-auto">
      {socialMedia &&
        socialMedia.map(({ url, name }, i) => (
          <li key={i} className="last:mb-5">
            <a
              href={url}
              aria-label={name}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 inline-block transition-all hover:text-green hover:-translate-y-1 focus:-translate-y-1"
            >
              <div className="w-5 h-5">
                <Icon name={name} />
              </div>
            </a>
          </li>
        ))}
    </ul>
  </Side>
);

export default Social;
