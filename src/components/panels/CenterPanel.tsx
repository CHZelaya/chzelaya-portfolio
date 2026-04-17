'use client';

import { motion } from 'motion/react';
import { ABOUT_QUERYResult } from "@/sanity/types";
import ArrowLeft from '@/components/ui/ArrowLeft';
import ArrowRight from '@/components/ui/ArrowRight';
import HandWrittenText from '@/components/ui/HandWrittenText';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

interface CenterPanelProps {
  about: ABOUT_QUERYResult;
  isActive: boolean;
  onGoTo: (i: number) => void;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function CenterPanel({ about, isActive, onGoTo }: CenterPanelProps) {
  return (
    <div className="flex flex-col items-center justify-center relative min-h-screen w-full overflow-hidden">

      <motion.div
        className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >


        <motion.p variants={item} className="font-mono text-bold text-[0.7rem] font-light tracking-[0.25em] text-(--color-accent) text-center">
          Software Developer & Photographer
        </motion.p>

        {/* Thin Red Seperator */}
        <motion.div variants={item} className="w-6 h-px bg-(--color-accent) mx-auto my-[1.4rem]" />

        <motion.h1 variants={item} className="font-display pt-5 text-[clamp(3rem,5vw,5rem)] text-(--color-text) tracking-[0.06em] leading-[0.9] text-center">
          {about?.name?.split(' ').join('\n') ?? 'Carlos\nBeto'}
        </motion.h1>

        {/* Short Bio */}
        <motion.div variants={item} className="font-serif font-light text-(--color-text-mid) text-base sm:text-lg lg:text-2xl text-center mt-[1.8rem] tracking-[0.04em] leading-relaxed max-w-[42ch] lg:max-w-[52ch]">
          {about?.shortBio && (
            <PortableText value={about.shortBio}
              components={{
                block: {
                  normal: ({ children }) => <p className="text-[clamp(1rem,2.5vw,1.125rem)]">{children}</p>,
                },
              }} />
          )}
        </motion.div>

        {/* CTA band */}
        <motion.div
          variants={item}
          className="my-8 -mx-4 sm:-mx-6 lg:mx-0 border-y border-(--color-border) px-4 sm:px-6 lg:px-0 py-4 flex items-center justify-evenly"
        >
          <div className="flex items-center gap-5">
            <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-(--color-text-dim)">
              {`There is a longer answer →`}
            </span>
            <span className="h-px w-7 shrink-0 bg-(--color-border)" />
          </div>

          <Link
            href="/about"
            className="flex items-center gap-2 border border-(--color-accent) px-3 py-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-(--color-accent) hover:bg-(--color-accent) hover:text-white transition-colors duration-200"
          >
            View About Profile
          </Link>
        </motion.div>

        {/* Mobile navigation arrows — in flow, hidden on desktop */}
        <motion.div variants={item} className="flex justify-between items-center w-full mt-10 px-2 md:hidden">
          <button onClick={() => onGoTo(0)} className="flex flex-col-reverse items-center gap-2 cursor-pointer">
            <HandWrittenText
              key="mobile-left"
              text="What I build"
            />
            <ArrowLeft />

          </button>
          <button onClick={() => onGoTo(2)} className="flex flex-col items-center gap-2 cursor-pointer">
            <HandWrittenText
              key="mobile-right"
              text="What I shoot"
            />
            <ArrowRight />
          </button>
        </motion.div>
      </motion.div>

      {/* Panel number */}
      <span className="absolute bottom-8 right-8 font-mono text-[0.5rem] font-light tracking-widest text-(--color-text)">
        02
      </span>
    </div >
  );
}
