"use client";

import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { motion } from "framer-motion";
import ResumeButton from "@/components/ResumeButton";

export const ContactSection = () => {
  return (
    <div id="contact" className="py-16 pt-12 lg:py-24 lg:pt-20">
      <div className="container">
        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 pt-8 pb-12 px-10 md:pt-8 md:pb-8 lg:pb-12 rounded-3xl text-center md:text-left relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">
                Let&apos;s create something amazing together
              </h2>
              <p className="text-sm md:text-base mt-2">
                Ready to bring your next project to life? Let&apos;s connect and discuss how I can help you achieve your goals.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {/* 🔥 Contact Me Button */}
              <motion.a
                href="mailto:manishkakulde55@gmail.com"
                className="relative inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900 text-white bg-gray-900 overflow-hidden shadow-lg"
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0px 0px 15px rgba(94, 234, 212, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-semibold relative z-10">Contact Me</span>
                <ArrowUpRightIcon className="size-4 relative z-10" />
              </motion.a>

              {/* 📄 New Download Resume Button */}
              <ResumeButton />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};