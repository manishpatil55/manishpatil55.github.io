import React from 'react';
import { getSortedPostsData } from '@/lib/api';
import { Project } from '@/types';
import { Icon } from '@components/icons';


export const metadata = {
    title: 'Archive',
};

// [Removed accidental code block]

export default async function ArchivePage() {
    const projectsData = (await getSortedPostsData('projects')) as unknown as Project[];
    const featuredData = (await getSortedPostsData('featured')) as unknown as Project[];

    // Combine and sort by date descending
    const projects = [...featuredData, ...projectsData].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <main className="flex-1 px-[25px] sm:px-[50px] md:px-[100px] lg:px-[150px] mx-auto w-full max-w-[1600px] pt-[200px] pb-0 flex flex-col">
            <header className="mb-[100px]">
                <h1 className="text-4xl md:text-6xl font-bold text-lightest-slate mb-[20px]">Archive</h1>
                <p className="text-green font-mono text-base md:text-xl">list of things I’ve worked on...</p>
            </header>

            <div className="w-full mb-[100px]">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="text-light-slate font-bold">
                            <th className="py-4 pr-4 hidden md:table-cell">Year</th>
                            <th className="py-4 pr-4">Title</th>
                            <th className="py-4 pr-4 hidden lg:table-cell">Made at</th>
                            <th className="py-4 pr-4 hidden lg:table-cell">Built with</th>
                            <th className="py-4 pl-4">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, i) => {
                            const { date, title, github, external, tech, company } = project;
                            const year = new Date(date).getFullYear();

                            return (
                                <tr key={i} className="hover:bg-light-navy/50 transition-colors group">
                                    <td className="py-4 pr-4 text-green font-mono text-sm hidden md:table-cell align-top">{year}</td>
                                    <td className="py-4 pr-4 font-bold text-lightest-slate text-lg align-top">{title}</td>
                                    <td className="py-4 pr-4 text-light-slate text-sm hidden lg:table-cell align-top">{company || '—'}</td>
                                    <td className="py-4 pr-4 text-light-slate text-sm font-mono hidden lg:table-cell align-top">
                                        {tech?.length > 0 && (
                                            <span className="flex flex-wrap gap-2">
                                                {tech.map((item, idx) => (
                                                    <span key={idx} className="whitespace-nowrap">
                                                        {item}
                                                        {idx !== tech.length - 1 && <span className="text-slate/50 mr-1">·</span>}
                                                    </span>
                                                ))}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 pl-4 align-top">
                                        <div className="flex items-center gap-3">
                                            {external && (
                                                <a
                                                    href={external}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-light-slate hover:text-green transition-colors w-5 h-5"
                                                    aria-label="External Link"
                                                >
                                                    <Icon name="External" />
                                                </a>
                                            )}
                                            {github && (
                                                <a
                                                    href={github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-light-slate hover:text-green transition-colors w-5 h-5"
                                                    aria-label="GitHub Link"
                                                >
                                                    <Icon name="GitHub" />
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </main>
    );
}
