'use client';

import React, { useEffect, useRef } from 'react';
import { srConfig, email } from '@config';
import { usePrefersReducedMotion } from '@hooks';
import { motion } from 'framer-motion';

import { StarBorder, GradientText } from '@components';

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="max-w-[600px] mx-auto py-[100px] text-center mb-[50px] md:mb-[100px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="block mb-[20px] text-green font-mono text-base font-normal counter-increment-section before:content-['0'_counter(section)_'.'] before:mr-[10px] before:text-green before:text-base">
        What’s Next?
      </h2>

      <h2 className="text-[clamp(40px,5vw,60px)] font-bold text-lightest-slate mb-[10px]">
        Get In Touch
      </h2>

      <p className="text-light-slate text-lg md:text-xl leading-relaxed">
        I am currently looking for new opportunities. Got a question, a project idea, or just want to say hi? My inbox is open.
      </p>

      <div className="mt-[50px] inline-block">
        <a href={`mailto:${email}`}>
          <StarBorder
            as="button"
            className="text-green text-base"
            color="#64ffda"
            speed="4s"
          >
            <GradientText
              colors={['#ccd6f6', '#64ffda']}
              animationSpeed={3}
              showBorder={false}
              className="font-mono text-base"
              textClassName="transition-all duration-300 group-hover:font-extrabold"
            >
              Say Hello
            </GradientText>
          </StarBorder>
        </a>
      </div>
    </motion.section>
  );
};

export default Contact;
