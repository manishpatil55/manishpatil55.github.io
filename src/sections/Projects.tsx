"use client";
import facialemotionrecognition from "@/assets/images/facialexpression.png";
import ppedetection from "@/assets/images/PPEdetection.png";
import spotifywidgets from "@/assets/images/spotifywidgets.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/card";

const portfolioProjects = [
  {
    company: "",
    year: "",
    title: "Facial Expression Recognition",
    results: [
      { title: "OpenCV" },
      { title: "DeepFace" },
    ],
    link: "https://github.com/manishpatil55/facial-expression-recognition",
    image: facialemotionrecognition,
  },
  {
    company: "",
    year: "",
    title: "PPE Detection & Alert System",
    results: [
      { title: "OpenCV" },
      { title: "YOLOv11" },
      { title: "TWILIO" },
    ],
    link: "https://github.com/manishpatil55/PPE-Detection",
    image: ppedetection,
  },
  {
    company: "",
    year: "",
    title: "Spotify Widget",
    results: [
      { title: "Python" },
      { title: "HTML CSS JS" },
      { title: "Spotify API" },
    ],
    link: "https://github.com/manishpatil55/spotify-widgets",
    image: spotifywidgets,
  },
  {
    company: "",
    year: "",
    title: "AI Startup Landing Page",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://github.com/manishpatil55/spotify-widgets",
    image: aiStartupLandingPage,
  },
  
];


export const ProjectsSection = () => {
  return (
     <section id="projects" className="py-20 lg:py-24">
        <div className="container">
          <SectionHeader 
            eyebrow="Real-world Results" 
            title="Featured Projects" 
            description="See how I transform concepts into real-world results."
          />
          <div className="mt-10 md:mt-20 flex flex-col gap-20">
            {portfolioProjects.map((project, projectIndex) => (
              <Card key={project.title} className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky top-16 lg:max-h-[450px]" 
              style={{
                top: `calc(64px + ${projectIndex * 38}px)`,
              }}>
                <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                  <div className="lg:pb-16">
                    {(project.company || project.year) && (
                      <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                        {project.company && <span>{project.company}</span>}
                        {project.company && project.year && <span>&bull;</span>}
                        {project.year && <span>{project.year}</span>}
                      </div>
                    )}
                    <h3 className="font-serif text-2xl mt-2 md:mt-5 md:text-4xl">{project.title}</h3>
                    <hr className="border-t-2 border-white/5 mt-4 md:mt-5"/>
                    <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                      {project.results.map((result, index) => (
                        <li key={index} className="flex gap-2 text-sm md:text-base text-white/50">
                          <CheckCircleIcon className="size-5 md:size-6"/>
                          <span>{result.title}</span>
                        </li>
                      ))}
                    </ul> 
                    <a href={project.link}>
                      <button className="inline-flex items-center justify-center gap-2 mt-8 md:w-auto w-full border border-white bg-white font-semibold text-gray-950 h-12 px-6 rounded-xl  hover:bg-white/75  hover:border-gray-950 hover:text-gray-950 transition-colors cursor-pointer">
                        <span>Source Code</span>
                        <ArrowUpRightIcon className="size-4"/>
                      </button>
                    </a>
                  </div>
                  <div>
                    <Image src={project.image} alt={project.title} className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"/>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
     </section>
  );
};

