'use client';

import { motion } from 'motion/react';
import { ABOUT_QUERYResult } from "@/sanity/types";

interface CenterPanelProps {
  about: ABOUT_QUERYResult;
  isActive: boolean;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function CenterPanel({ about, isActive }: CenterPanelProps) {
  return (
    <div className="flex flex-col items-center justify-center relative min-h-screen w-full overflow-hidden">
      {/* Panel label */}
      <span className="absolute top-8 left-8 font-mono text-[0.55rem] font-light tracking-[0.3em] uppercase text-(--color-text)">
        About
      </span>

      <motion.div
        className="flex flex-col items-center"
        variants={container}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <motion.h1 variants={item} className="font-display text-[clamp(3rem,5vw,5rem)] text-(--color-text) tracking-[0.06em] leading-[0.9] text-center">
          {about?.name?.split(' ').join('\n') ?? 'Carlos\nBeto'}
        </motion.h1>

        <motion.div variants={item} className="w-6 h-px bg-(--color-accent) mx-auto my-[1.4rem]" />

        <motion.p variants={item} className="font-mono text-[0.6rem] font-light tracking-[0.25em] text-(--color-accent) text-center">
          @betonotfound
        </motion.p>

        <motion.p variants={item} className="font-serif italic text-2xl font-light text-(--color-text-mid) text-center mt-[1.8rem] tracking-[0.04em] leading-relaxed">
          {about?.shortBio ?? 'Crafting digital experiences with code and creativity.'}
        </motion.p>

        <motion.a
          variants={item}
          href="#"
          className="mt-[2.4rem] font-mono text-[0.55rem] font-normal tracking-[0.2em] uppercase text-(--color-text-dim) border border-(--color-border) px-[1.2rem] py-[0.6rem] transition-colors duration-200 hover:text-(--color-text) hover:border-(--color-accent) hover:bg-(--color-accent-dim)"
        >
          Enter ↗
        </motion.a>
      </motion.div>

      {/* Panel number */}
      <span className="absolute bottom-8 right-8 font-mono text-[0.5rem] font-light tracking-widest text-(--color-text)">
        02
      </span>
    </div>
  );
}
