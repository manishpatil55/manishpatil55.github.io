import type { Metadata } from 'next';
import React from 'react';
import ClientLayout from './ClientLayout';
import './globals.css';

export const metadata: Metadata = {
    title: 'Manish Patil | Software Engineer',
    description:
        'Manish Patil is a Software Engineer who specializes in building (and occasionally designing) exceptional digital experiences.',
    viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
        other: [
            {
                rel: 'icon',
                url: '/favicon-32x32.png',
                sizes: '32x32',
            },
            {
                rel: 'icon',
                url: '/favicon-16x16.png',
                sizes: '16x16',
            },
            {
                rel: 'manifest',
                url: '/site.webmanifest',
            }
        ],
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body className="bg-navy text-slate antialiased leading-relaxed tracking-wide selection:bg-lightest-navy selection:text-lightest-slate" suppressHydrationWarning>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
