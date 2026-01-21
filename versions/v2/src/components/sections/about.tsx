'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogoLoop, ProfileCard, GradientText } from '@components';

import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
// import { motion } from 'framer-motion'; // Could use motion here too, but sticking to SR for scroll reveal legacy feel if preferred, or migrate to motion. 
// Plan said replace scrollreveal with framer-motion.
// However, the original code uses `sr.reveal`. I should probably migrate it to `motion.section` with `whileInView` for consistency.

import { motion } from 'framer-motion';

const LOGOS = [
  // --- Languages ---
  //{ node: <img src="/logos/javascript-original.svg" alt="JavaScript" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  //{ node: <img src="/logos/typescript-original.svg" alt="TypeScript" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "TypeScript", href: "https://www.typescriptlang.org/" },
  { node: <img src="/logos/python-original.svg" alt="Python" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Python", href: "https://www.python.org" },
  //{ node: <img src="/logos/java-original.svg" alt="Java" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Java", href: "https://www.java.com/" },
  //{ node: <img src="/logos/cplusplus-original.svg" alt="C++" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "C++", href: "https://isocpp.org/" },
  //{ node: <img src="/logos/csharp-original.svg" alt="C#" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "C#", href: "https://docs.microsoft.com/en-us/dotnet/csharp/" },
  //{ node: <img src="/logos/go-original-wordmark.svg" alt="Go" className="h-12 w-auto filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 translate-y-1" />, title: "Go", href: "https://go.dev/" },
  //{ node: <img src="/logos/rust-original.svg" alt="Rust" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 invert dark:invert-1" />, title: "Rust", href: "https://www.rust-lang.org/" },
  //{ node: <img src="/logos/php-original.svg" alt="PHP" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "PHP", href: "https://www.php.net/" },
  //{ node: <img src="/logos/ruby-original.svg" alt="Ruby" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Ruby", href: "https://www.ruby-lang.org/" },
  //{ node: <img src="/logos/swift-original.svg" alt="Swift" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Swift", href: "https://swift.org/" },
  //{ node: <img src="/logos/kotlin-original.svg" alt="Kotlin" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Kotlin", href: "https://kotlinlang.org/" },

  // --- Frameworks & Libraries ---
  //{ node: <img src="/logos/react-original.svg" alt="React" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "React", href: "https://reactjs.org/" },
  //{ node: <img src="/logos/nextjs-original.svg" alt="Next.js" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 invert dark:invert-1" />, title: "Next.js", href: "https://nextjs.org/" },
  //{ node: <img src="/logos/nodejs-original.svg" alt="Node.js" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Node.js", href: "https://nodejs.org/" },
  //{ node: <img src="/logos/flutter-original.svg" alt="Flutter" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Flutter", href: "https://flutter.dev/" },
  //{ node: <img src="/logos/tailwindcss.svg" alt="Tailwind CSS" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Tailwind CSS", href: "https://tailwindcss.com/" },
  //{ node: <img src="/logos/wordpress-original.svg" alt="WordPress" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "WordPress", href: "https://wordpress.org/" },
  //{ node: <img src="/logos/threejs.svg" alt="Three.js" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 invert dark:invert" />, title: "Three.js", href: "https://threejs.org/" },

  // --- Data & AI ---
  //{ node: <img src="/logos/graphql.svg" alt="GraphQL" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "GraphQL", href: "https://graphql.org/" },
  //{ node: <img src="/logos/mongodb-original.svg" alt="MongoDB" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "MongoDB", href: "https://www.mongodb.com/" },
  //{ node: <img src="/logos/postgresql-original.svg" alt="PostgreSQL" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "PostgreSQL", href: "https://www.postgresql.org/" },
  //{ node: <img src="/logos/mysql-original.svg" alt="MySQL" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "MySQL", href: "https://www.mysql.com/" },
  //{ node: <img src="/logos/redis-original.svg" alt="Redis" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Redis", href: "https://redis.io/" },
  { node: <img src="/logos/openai.svg" alt="OpenAI" className="h-8 w-auto filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 invert dark:invert-1" />, title: "OpenAI", href: "https://openai.com" },
  { node: <img src="/logos/claude-color.svg" alt="Claude" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Claude", href: "https://www.anthropic.com/" },
  { node: <img src="/logos/deepseek-color.png" alt="DeepSeek" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "DeepSeek", href: "https://www.deepseek.com/" },
  { node: <img src="/logos/gemini-color.svg" alt="Gemini" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Gemini", href: "https://deepmind.google/technologies/gemini/" },
  { node: <img src="/logos/colab-color.svg" alt="Google Colab" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Google Colab", href: "https://colab.research.google.com/" },
  { node: <img src="/logos/huggingface.svg" alt="Hugging Face" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Hugging Face", href: "https://huggingface.co/" },
];

const LOGOS_2 = [
  // --- Cloud & Infrastructure ---
  { node: <img src="/logos/aws.svg" alt="AWS" className="h-8 w-auto filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 invert dark:invert-0" />, title: "AWS", href: "https://aws.amazon.com" },
  { node: <img src="/logos/googlecloud-original.svg" alt="Google Cloud" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Google Cloud", href: "https://cloud.google.com" },
  { node: <img src="/logos/vercel-original.svg" alt="Vercel" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 invert dark:invert-1" />, title: "Vercel", href: "https://vercel.com/" },
  { node: <img src="/logos/supabase-original.svg" alt="Supabase" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Supabase", href: "https://supabase.com/" },
  { node: <img src="/logos/firebase.svg" alt="Firebase" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Firebase", href: "https://firebase.google.com/" },

  // --- DevOps ---
  { node: <img src="/logos/docker-original.svg" alt="Docker" className="h-10 w-10 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 translate-y-1" />, title: "Docker", href: "https://www.docker.com/" },
  //{ node: <img src="/logos/kubernetes.svg" alt="Kubernetes" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Kubernetes", href: "https://kubernetes.io/" },
  //{ node: <img src="/logos/jenkins-original.svg" alt="Jenkins" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Jenkins", href: "https://www.jenkins.io/" },
  { node: <img src="/logos/gitlab-original.svg" alt="GitLab" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "GitLab", href: "https://about.gitlab.com/" },
  //{ node: <img src="/logos/terraform-original.svg" alt="Terraform" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Terraform", href: "https://www.terraform.io/" },
  //{ node: <img src="/logos/ansible-original.svg" alt="Ansible" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Ansible", href: "https://www.ansible.com/" },
  { node: <img src="/logos/linux-original.svg" alt="Linux" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Linux", href: "https://www.linux.org/" },
  { node: <img src="/logos/bash-original.svg" alt="Bash" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 invert dark:invert-1" />, title: "Bash", href: "https://www.gnu.org/software/bash/" },
  //{ node: <img src="/logos/nginx-original.svg" alt="Nginx" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Nginx", href: "https://www.nginx.com/" },
  //{ node: <img src="/logos/prometheus-original.svg" alt="Prometheus" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Prometheus", href: "https://prometheus.io/" },
  //{ node: <img src="/logos/grafana-original.svg" alt="Grafana" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Grafana", href: "https://grafana.com/" },

  // --- Tools & Editors ---
  { node: <img src="/logos/canva.svg" alt="Canva" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Canva", href: "https://www.canva.com/" },
  { node: <img src="/logos/github-original.svg" alt="GitHub" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 invert dark:invert-1" />, title: "GitHub", href: "https://github.com/" },
  { node: <img src="/logos/git-original.svg" alt="Git" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Git", href: "https://git-scm.com/" },
  { node: <img src="/logos/cursor.svg" alt="Cursor" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Cursor", href: "https://cursor.sh/" },
  { node: <img src="/logos/vscode-original.svg" alt="VS Code" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "VS Code", href: "https://code.visualstudio.com/" },
  { node: <img src="/logos/antigravity-original.svg" alt="Google Antigravity" className="h-8 w-auto filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Google Antigravity", href: "https://idx.google.com/" },
  { node: <img src="/logos/lovable-color.svg" alt="Lovable" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Lovable", href: "https://lovable.dev/" },
  { node: <img src="/logos/replit.svg" alt="Replit" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Replit", href: "https://replit.com/" },
  { node: <img src="/logos/n8n.svg" alt="n8n" className="h-10 w-10 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 translate-y-1" />, title: "n8n", href: "https://n8n.io/" },
  //{ node: <img src="/logos/postman-original.svg" alt="Postman" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Postman", href: "https://www.postman.com/" },
  { node: <img src="/logos/figma-original.svg" alt="Figma" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" />, title: "Figma", href: "https://www.figma.com/" },
  //{ node: <img src="/logos/framer.svg" alt="Framer" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 invert dark:invert" />, title: "Framer", href: "https://www.framer.com/" },
  //{ node: <img src="/logos/notion.svg" alt="Notion" className="h-8 w-8 filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 invert dark:invert" />, title: "Notion", href: "https://www.notion.so/" },
];

const About = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.section
      id="about"
      className="max-w-[900px] mx-auto py-[100px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="flex items-center relative mb-[40px] w-full text-2xl md:text-3xl text-lightest-slate font-semibold whitespace-nowrap after:content-[''] after:block after:relative after:top-[-1px] after:w-[300px] after:h-[1px] after:ml-[20px] after:bg-lightest-navy/50 font-sans counter-increment-section before:content-['0'_counter(section)_'.'] before:mr-[10px] before:text-green before:font-mono before:text-xl font-normal">
        About Me
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-[50px]">
        <div className="text-light-slate font-sans text-base leading-relaxed space-y-4">
          <p>
            Yo, I'm <GradientText colors={['#ccd6f6', '#64ffda']} animationSpeed={3} showBorder={false} className="text-xl font-bold inline-block">Manish Kakulde!</GradientText> 👋 I'm a <strong>B.Tech CSE (AIML)</strong> undergrad and a total <span className="text-green">vibe coder</span>. I'm not just into tech; I <em>live</em> it.
          </p>

          <p>
            I belong to the generation that witnessed the shift from <strong>legacy systems</strong> to the absolute madness of the <span className="text-green">AI revolution</span>. I've seen it all—from the raw power of <strong>Terminals</strong>, <strong>Bash</strong>, and <strong>OS internals</strong> to the magic of modern <strong>AI Agents</strong> and <strong>LLMs</strong>.
          </p>

          <p>
            My flow blends the basics with the bleeding edge. I speak fluent <span className="text-green">Python</span>, architect on <strong>AWS</strong> & <strong>GCP</strong>, and push code via <strong>Git/GitHub</strong> like it's second nature. Whether I'm building models or exploring tools like <span className="text-green">Google Antigravity</span>, I’m always chasing the next level of automation.
          </p>

          <p>
            I don't just use tools; I master them to engineering perfection.
          </p>

          <p className="mb-0">Here are a few technologies I’ve been working with recently:</p>

          <div className="mt-[20px] w-full max-w-[500px] overflow-hidden">
            {isMounted && (
              <>
                <LogoLoop
                  logos={LOGOS}
                  speed={50}
                  direction="right"
                  logoHeight={48}
                  gap={40}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut={true}
                  ariaLabel="Technologies and Frameworks"
                />
                <div className="h-1" /> {/* Reduced gap to 1 (4px) */}
                <LogoLoop
                  logos={LOGOS_2}
                  speed={50}
                  direction="left"
                  logoHeight={48}
                  gap={40}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut={true}
                  ariaLabel="Tools and Platforms"
                />
              </>
            )}
          </div>
        </div>

        <div className="relative w-[80%] md:w-full mx-auto md:ml-auto group">
          <ProfileCard
            name="Manish Kakulde"
            title="Software Engineer"
            handle="manishpatil55"
            status=""
            contactText="Hire Me"
            avatarUrl="/me.png"
            miniAvatarUrl="/me.png"

            // --- Customization Options ---
            grainUrl="https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png"

            enableTilt={true}
            enableMobileTilt={true}
            behindGlowEnabled={true}
            showUserInfo={true}

            // Match the "Blue/Teal" aesthetic from the screenshot
            innerGradient="linear-gradient(#0a192f, #0a192f)"
            behindGlowColor="#64ffda" // Green glow matches theme

            onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default About;
