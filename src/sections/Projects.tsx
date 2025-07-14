"use client";

import facialemotionrecognition from "@/assets/images/facialexpression.png";
import ppedetection from "@/assets/images/PPEdetection.png";
import spotifywidgets from "@/assets/images/spotifywidgets.png";
import demo from "@/assets/images/demo.png";
import { SectionHeader } from "@/components/SectionHeader";
import Masonry from "@/components/Masonry";

const portfolioProjects = [
  {
    id: "project1",
    img: facialemotionrecognition.src,
    height: 240,
    url: "https://github.com/manishpatil55/facial-expression-recognition",
    title: "Facial Expression Recognition",
    tech: ["Python, OpenCV, DeepFace, TensorFlow, tf-keras"],
  },
  {
    id: "project2",
    img: ppedetection.src,
    height: 430,
    url: "https://github.com/manishpatil55/PPE-Detection",
    title: "PPE Detection & Alert System",
    tech: ["Python, OpenCV, roboflow, YOLOv11, Twilio, streamlit, ultralytics"],
  },
  {
    id: "project3",
    img: spotifywidgets.src,
    height: 410,
    url: "https://github.com/manishpatil55/spotify-widgets",
    title: "Spotify Widget",
    tech: ["Python, Spotify API, HTML, CSS"],
  },
  {
    id: "project4",
    img: demo.src,
    height: 360,
    url: "https://github.com/manishpatil55/",
    title: "Demo Project",
    tech: ["Tech 1", "Tech 2", "Tech 3"],
  },
  {
    id: "project5",
    img: demo.src,
    height: 420,
    url: "https://github.com/manishpatil55/",
    title: "Another Demo",
    tech: ["Tech A", "Tech B", "Tech C"],
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Real-world Results"
          title="Featured Projects"
          description="See how I transform concepts into real-world results."
        />

        <div className="mt-16">
          <Masonry
            items={portfolioProjects}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="random" // "bottom" | "top" | "left" | "right" | "center" | "random";
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false} // we’ll customize overlay manually
          />
        </div>
      </div>
    </section>
  );
};