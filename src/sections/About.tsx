"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/card";
import StarIcon from "@/assets/icons/star.svg";
import bookImage from "@/assets/images/The-Alchemist.png";
import Image from "next/image";
import GitHubIcon from "@/assets/icons/github.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CSSIcon from "@/assets/icons/css3.svg";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import ReactIcon from "@/assets/icons/react.svg";
import { TechIcon } from "@/components/TechIcon";
import mapImage from "@/assets/images/map.png";
import smileMemoji from "@/assets/images/memoji-smile.png";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import { motion } from "framer-motion";
import { useRef } from "react";
import SpotifyWidget from "@/components/SpotifyWidget";

const toolboxItems = [
  { title: "GitHub", icon: GitHubIcon },
  { title: "HTML5", icon: HTMLIcon },
  { title: "CSS3", icon: CSSIcon },
  { title: "React", icon: ReactIcon },
  { title: "Chrome", icon: ChromeIcon },
  { title: "JavaScript", icon: JavascriptIcon },
];

const hobbies = [
  { title: "Painting", emoji: "🎨",left: "5%", top: "6%", },
  { title: "Photography", emoji: "📷",left: "50%", top: "15%", },
  { title: "Drawing", emoji: "✍🏻",left: "1%", top: "33%", },
  { title: "Reading", emoji: "📚",left: "10%", top: "55%", },
  { title: "Music", emoji: "🎵",left: "50%", top: "70%", },
  { title: "Travelling", emoji: "🌏",left: "-5%", top: "78%", },
  { title: "Fitness", emoji: "🏋🏻‍♂️",left: "67%", top: "38%", },
  { title: "Gaming", emoji: "🎮",left: "35%", top: "45%", },
];

export const AboutSection = () => {
  const constraintRef = useRef(null);
    return (
    <div id="about" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About ME"
          title="A Glimpse Into My World"
          description="Learn more about me and my journey as a developer."
        />

        {/* 
            Spotify Widget - Fixed Position 
        <div className="fixed bottom-6 right-6 z-50">
          <SpotifyWidget />
        </div>
        */}

        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="My Reads"
                description="The books I have read so far."
              />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Cover of the book I read" />
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description="Explore the Technology and Tools I Use."
                className=""
              />
            <ToolboxItems items={toolboxItems} className="" itemsWrapperClassName="animate-move-left [animation-duration:30s]"/>
            <ToolboxItems items={toolboxItems} className="mt-6" itemsWrapperClassName="animate-move-right [animation-duration:20s]"/>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Beyond the Code"
                description="Explore my interests and hobbies beyond the digital realm." className="px-6 py-6"
              />
              <div className="relative flex-1" ref={constraintRef}>
                {hobbies.map((hobby) => (
                  <motion.div 
                    key={hobby.title} className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute" 
                    style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-gray-950">{hobby.title}</span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
            {/*
              <Image
                src={mapImage}
                alt="World map showing my location" className="h-full w-full object-cover object-left-top"
              />
            */}
              <iframe 
                src="https://www.google.com/maps?q=Pune,India&t=k&output=embed"
                width="100%" 
                height="320" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
                <Image
                  src={smileMemoji}
                  alt="Smiling memoji representing me" className="size-15"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
