"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/card";
import Image from "next/image";
import Switch from "@/components/SwitchIcon";

export const ContributionsSection = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div id="contributions" className="py-16 pt-12 lg:py-24 lg:pt-20">
      <div className="container">
        <SectionHeader
          eyebrow="GitHub Contributions"
          title="Visualizing My Open Source Journey"
          description="A glimpse of my GitHub activity over time."
        />

        <div className="mt-16 flex justify-center items-center relative">
          <div className="absolute lg:-top-10 md:-top-8 sm:-top-5 right-4">
            <div className="
              transform
              lg:scale-100         // Default size (desktop)
              md:scale-75       // Medium screens (768px+)
              sm:scale-50       // Small screens (640px+)
              origin-top-right
              transition-transform duration-200
            ">
              <Switch 
                checked={darkMode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDarkMode(e.target.checked)}
              />
            </div>
          </div>

          <Card className="w-full max-w-6xl flex justify-center items-center p-1.5 pb-2 pt-1.5 lg:pb-1.5 lg:pt-0">
            <Image
              src={
                darkMode
                  ? "https://raw.githubusercontent.com/manishpatil55/manishpatil55/output/snake-dark.svg"
                  : "https://raw.githubusercontent.com/manishpatil55/manishpatil55/output/snake.svg"
              }
              alt="GitHub Contributions Snake"
              width={1000}
              height={500}
              className="w-full object-contain"
              priority
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
