'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Loader } from '@components'; // We'll need to refactor Loader later too
import { Nav, Social, Email, Footer } from '@components'; // These also need refactoring

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [isLoading, setIsLoading] = useState(isHome);

    useEffect(() => {
        if (isLoading) return;

        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView();
                    el.focus();
                }
            }, 0);
        }
    }, [isLoading]);

    return (
        <>
            {/* Top Textures Removed to ensure perfect color match with site background (#0a192f) */}
            {/* The Safari Bar will now blur the natural body background, ensuring consistency */}

            {/* Global Ambient Glow removed per user request for visual consistency */}
            <a
                className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[99] focus:bg-green focus:text-navy focus:p-4 focus:block"
                href="#content"
            >
                Skip to Content
            </a>

            {isLoading && isHome ? (
                <Loader finishLoading={() => setIsLoading(false)} />
            ) : (
                <div className="flex flex-col min-h-screen">
                    <Nav isHome={isHome} />
                    <Social isHome={isHome} />
                    <Email isHome={isHome} />

                    <div id="content" className="flex flex-col min-h-screen">
                        {children}
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
