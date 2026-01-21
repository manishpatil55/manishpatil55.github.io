import React from 'react';
import { Hero, About, Jobs, Featured, Projects, Contact } from '@/components';
import { getSortedPostsData } from '@/lib/api';
import { Job, Project } from '@/types';

export default async function Home() {
    // Cast the data to ensure it matches strict types
    const jobsData = (await getSortedPostsData('jobs')) as unknown as Job[];
    const featuredData = (await getSortedPostsData('featured')) as unknown as Project[];
    const projectsData = (await getSortedPostsData('projects')) as unknown as Project[];

    return (
        <main className="flex flex-col min-h-screen px-[25px] sm:px-[50px] md:px-[100px] lg:px-[150px] mx-auto w-full max-w-[1600px] counter-reset-section">
            <Hero />
            <About />
            {/* <Jobs data={jobsData} /> */}
            <Featured data={featuredData} />
            <Projects data={projectsData} />
            <Contact />
        </main>
    );
}
