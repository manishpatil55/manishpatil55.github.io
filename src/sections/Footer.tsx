"use client";

import React from "react";

export const Footer = () => {
  return (
    <footer id="footer" className="relative overflow-x-clip">
      {/* Green glow effect */}
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>

      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div className="text-white/40">&copy; 2025. All rights reserved.</div>

          <div>
            <nav className="flex flex-col md:flex-row items-center gap-8">
              <a
                href="https://github.com/manishpatil55/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold cursor-pointer hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/manishkakulde/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold cursor-pointer hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/manishpatil.55/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold cursor-pointer hover:underline"
              >
                Instagram
              </a>
              <a
                href="https://www.cloudskillsboost.google/public_profiles/d34b4468-ff57-480d-8675-b9a4e550d50b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold cursor-pointer hover:underline"
              >
                Google Cloud
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
