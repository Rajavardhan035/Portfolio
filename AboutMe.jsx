import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Aceternity UI BackgroundLines Component
export const BackgroundLines = ({ children, className = "" }) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <g strokeWidth="1.5">
          {/* Base Curved Background Lines */}
          <path d="M-100 120 Q 360 40 720 120 T 1540 120" stroke="url(#bgLineGrad1)" />
          <path d="M-100 280 Q 360 180 720 280 T 1540 280" stroke="url(#bgLineGrad2)" />
          <path d="M-100 440 Q 360 540 720 440 T 1540 440" stroke="url(#bgLineGrad1)" />
          <path d="M-100 600 Q 360 500 720 600 T 1540 600" stroke="url(#bgLineGrad2)" />
          <path d="M-100 760 Q 360 840 720 760 T 1540 760" stroke="url(#bgLineGrad1)" />

          {/* Animated Glowing Light Beams */}
          <motion.path
            d="M-100 120 Q 360 40 720 120 T 1540 120"
            stroke="url(#pulseGrad1)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0.2, pathOffset: 0 }}
            animate={{ pathOffset: [0, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M-100 440 Q 360 540 720 440 T 1540 440"
            stroke="url(#pulseGrad2)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0.2, pathOffset: 0 }}
            animate={{ pathOffset: [0, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M-100 760 Q 360 840 720 760 T 1540 760"
            stroke="url(#pulseGrad1)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0.2, pathOffset: 0 }}
            animate={{ pathOffset: [0, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </g>
        <defs>
          <linearGradient id="bgLineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="bgLineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="pulseGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pulseGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Reusable FadeIn Component
export const FadeIn = ({
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
  style = {},
  as = "div",
  children
}) => {
  const Component = motion.create ? motion.create(as) : motion[as] || motion.div;

  const variants = {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "50px", amount: 0 }}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
};

// Character-by-character animated text component
const CharacterRevealText = ({ text }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const chars = text.split("");
  const totalChars = chars.length;

  return (
    <p
      ref={containerRef}
      className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[680px]"
      style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
    >
      {chars.map((char, index) => {
        const charProgress = index / totalChars;
        const start = Math.max(0, charProgress - 0.1);
        const end = Math.min(1, charProgress + 0.05);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

        const displayChar = char === " " ? "\u00A0" : char;

        return (
          <span key={index} className="relative inline-block">
            <span className="opacity-0 select-none">{displayChar}</span>
            <motion.span style={{ opacity }} className="absolute inset-0">
              {displayChar}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};

export default function AboutMe() {
  const paragraphText =
    "I am an aspiring Artificial Intelligence & Machine Learning engineer passionate about bringing physical and digital systems to life. My technical work spans machine learning models, embedded hardware, and modern software architectures—building everything from voice-controlled desktop assistants and Raspberry Pi 4WD robots to smart waste routing engines and hybrid RAG search tools. I strongly believe the future belongs to intelligent systems that can think, move, understand, and assist.";

  return (
    <section id="about" className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 font-kanit">
      <BackgroundLines className="flex flex-col items-center justify-center">
        {/* Center Content */}
        <div className="relative z-10 max-w-4xl w-full flex flex-col items-center justify-center text-center gap-12 sm:gap-16 md:gap-20">
          {/* Group 1 -- Heading + Animated Text */}
          <div className="flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12">
            {/* Heading "About me" */}
            <FadeIn delay={0} y={40} duration={0.7}>
              <h2
                className="font-black uppercase leading-none tracking-tight text-center hero-heading"
                style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
              >
                About me
              </h2>
            </FadeIn>

            {/* Animated Bio Paragraph */}
            <CharacterRevealText text={paragraphText} />

            {/* Stat Cards */}
            <FadeIn delay={0.25} y={30} duration={0.7} className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl mx-auto mt-2">
                <div className="bg-[#121215] border border-white/10 p-4 rounded-2xl shadow-lg hover:border-sky-400/50 transition-colors">
                  <span className="block text-2xl sm:text-3xl font-black text-sky-400 font-kanit">5+</span>
                  <span className="text-xs sm:text-sm text-slate-300 font-medium">Core Projects</span>
                </div>
                <div className="bg-[#121215] border border-white/10 p-4 rounded-2xl shadow-lg hover:border-amber-400/50 transition-colors">
                  <span className="block text-2xl sm:text-3xl font-black text-amber-400 font-kanit">3+</span>
                  <span className="text-xs sm:text-sm text-slate-300 font-medium">Hackathons</span>
                </div>
                <div className="bg-[#121215] border border-white/10 p-4 rounded-2xl shadow-lg hover:border-emerald-400/50 transition-colors">
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-400 font-kanit">B.Tech</span>
                  <span className="text-xs sm:text-sm text-slate-300 font-medium">AI & ML Specialization</span>
                </div>
                <div className="bg-[#121215] border border-white/10 p-4 rounded-2xl shadow-lg hover:border-purple-400/50 transition-colors">
                  <span className="block text-2xl sm:text-3xl font-black text-purple-400 font-kanit">100%</span>
                  <span className="text-xs sm:text-sm text-slate-300 font-medium">Passion & Drive</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Group 2 -- Contact Button */}
          <FadeIn delay={0.3} y={20} duration={0.7}>
            <a
              href="#contact"
              className="inline-block rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base hover:opacity-90 active:opacity-75 transition-opacity duration-200"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid #E3E3E3',
                outlineOffset: '-3px'
              }}
            >
              Contact Me
            </a>
          </FadeIn>
        </div>
      </BackgroundLines>
    </section>
  );
}
