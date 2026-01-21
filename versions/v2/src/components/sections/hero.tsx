'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DecryptedText } from '@components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  // Greeting Cycler Logic
  // Greeting Cycler Logic
  const greetings = [
    { text: "Hello", charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" }, // English
    { text: "Hola", charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZÑÁÉÍÓÚ" }, // Spanish
    { text: "नमस्ते", charset: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह" }, // Hindi
    { text: "Bonjour", charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZÇÉÈÊËÀÂÎÏÔÛÙ" }, // French
    { text: "Guten Tag", charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜẞ" }, // German
    { text: "Ciao", charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZÀÈÉÌÒÙ" }, // Italian
    { text: "こんにちは", charset: "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん" }, // Japanese
    { text: "안녕하세요", charset: "가나다라마바사아자차카타파하" }, // Korean
    { text: "سلام", charset: "ابتثجحخدذرزسشصضطظعغفقكلمنهوي" }, // Arabic
    { text: "Olá", charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÂÃÀÇÉÊÍÓÔÕÚ" }, // Portuguese
    { text: "你好", charset: "你好世界的一是在不了有和人这中大为上个国我" }, // Chinese (Common subset)
    { text: "Привет", charset: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ" }, // Russian
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const one = (
    <h1 className="text-green font-mono text-sm md:text-base lg:text-lg mb-[10px] ml-[4px] flex items-center">
      <span className="relative h-[1.2em] min-w-[10px] overflow-visible inline-block">
        {/* Using DecryptedText for the greeting for that "hacker/gen z" vibe */}
        <DecryptedText
          text={greetings[index].text}
          speed={150}
          maxIterations={20}
          characters={greetings[index].charset}
          className="text-green font-bold"
          parentClassName="all-letters"
          encryptedClassName="text-green/50"
          animateOn="view" // re-trigger animation when text changes by using key
          revealDirection="start"
          sequential={true}
          key={index} // forcing re-render to trigger animation
        />
      </span>
      <span className="text-green">, my name is</span>
    </h1>
  );

  const two = (
    <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-[10px] mt-0 bg-clip-text text-transparent bg-gradient-to-r from-[#ccd6f6] via-[#64ffda] to-[#ccd6f6] bg-[length:200%_auto] animate-gradient">
      Manish Kakulde.
    </h2>
  );

  const three = <h3 className="text-slate/60 font-sans text-3xl md:text-6xl lg:text-7xl min-h-[1.1em] font-semibold leading-[0.9]">
    I build digital experiences that <span className="text-green drop-shadow-[0_0_10px_rgba(100,255,218,0.3)]">slay.</span>
  </h3>;

  const four = (
    <div className="mt-[20px] max-w-[540px] text-light-slate text-lg md:text-xl leading-relaxed">
      <p>
        <span className="bg-green/10 text-green font-mono px-2 py-1 rounded text-sm mr-2 border border-green/20">POV:</span>
        You found the dev who actually speaks <span className="text-green">Cloud</span> & <span className="text-green">AI</span>.
      </p>
      <p className="mt-4">
        I’m <span className="text-green font-semibold">locked in</span> on orchestrating scalable <span className="text-slate-200 font-bold">DevOps</span> pipelines and training <span className="text-slate-200 font-bold">Silicon Brains</span> that hit different.
        My Git history? <span className="text-slate-200 font-bold">Clean.</span> My deploys? <span className="text-slate-200 font-bold">Effortless.</span> Building the future of the <span className="text-slate-200 font-bold">AI Revolution</span>, straight up. <span className="text-green">No cap.</span>
      </p>
    </div>
  );

  const five = (
    <a
      className="mt-[40px] group relative inline-flex items-center justify-center overflow-hidden rounded-md border border-green bg-transparent px-8 py-4 font-mono text-sm font-medium text-green transition-all duration-300 hover:bg-green hover:text-navy hover:shadow-[0_0_20px_rgba(100,255,218,0.5)] hover:scale-105"
      href="#projects"
    >
      <span className="mr-2 font-bold">Check out my work</span>
      <span className="transition-transform group-hover:translate-x-2">→</span>
    </a>
  );

  const items = [one, two, three, four, five];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: loaderDelay / 1000 + 0.1, // Wait for loader
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <section className="flex justify-center flex-col items-start min-h-screen h-screen mx-auto max-w-[1000px] px-[25px] sm:px-[50px] md:px-[100px] lg:px-[150px]">
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate={isMounted ? "show" : "hidden"}
          className="flex flex-col items-start relative w-full"
        >
          {items.map((item, i) => (
            <motion.div key={i} variants={itemAnim}>
              {item}
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
