'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ABOUT_QUERYResult, FEATURED_MEDIA_QUERYResult, FEATURED_PROJECTS_QUERYResult } from "@/sanity/types";
import { CenterPanel, DevPanel, MediaPanel } from "@/components/panels";
import DotGrid from "@/components/ui/DotGrid";
import ArrowLeft from '@/components/ui/ArrowLeft';
import ArrowRight from '@/components/ui/ArrowRight';
import HandWrittenText from '@/components/ui/HandWrittenText';

const OFFSETS = ['0vw', '-100vw', '-200vw'];

interface PageClientProps {
  about: ABOUT_QUERYResult;
  featuredProjects: FEATURED_PROJECTS_QUERYResult;
  featuredMedia: FEATURED_MEDIA_QUERYResult;
}

export default function PageClient({ about, featuredProjects, featuredMedia }: PageClientProps) {
  const [current, setCurrent] = useState(1); // start at About
  const currentRef = useRef(1);
  const animating = useRef(false);

  const goTo = useCallback((i: number) => {
    if (animating.current || i === currentRef.current || i < 0 || i > 2) return;
    animating.current = true;
    currentRef.current = i;
    setCurrent(i);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(currentRef.current - 1);
      if (e.key === 'ArrowRight') goTo(currentRef.current + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo]);

  // Touch swipe
  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const dx = startX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 50) goTo(dx > 0 ? currentRef.current + 1 : currentRef.current - 1);
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [goTo]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">

      <DotGrid />



      {/* Horizontal stage */}
      <motion.div
        className="relative z-1 flex h-screen"
        style={{ width: '300vw' }}
        initial={{ x: OFFSETS[1] }}
        animate={{ x: OFFSETS[current] }}
        transition={{ type: 'spring', stiffness: 280, damping: 34 }}
        onAnimationComplete={() => { animating.current = false; }}
      >
        {/* Panel 0 — Dev / Engineering */}
        <div className="h-screen w-screen shrink-0 overflow-y-auto">
          <DevPanel featuredProjects={featuredProjects} isActive={current === 0} />
        </div>

        {/* Panel 1 — About / Center */}
        <div className="h-screen w-screen shrink-0 overflow-y-auto">
          <CenterPanel about={about} isActive={current === 1} onGoTo={goTo} />
        </div>

        {/* Panel 2 — Photography / Media */}
        <div className="h-screen w-screen shrink-0 overflow-y-auto">
          <MediaPanel featuredMedia={featuredMedia} isActive={current === 2} />
        </div>
      </motion.div>

      {/* Left Arrow + hint */}
      <button onClick={() => goTo(current - 1)} aria-label="Previous panel" className={`hidden md:block fixed left-6 top-1/2 z-50 -translate-y-1/2 cursor-pointer transition-[opacity,transform] duration-300 ${current === 0 ? 'pointer-events-none opacity-0 scale-[0.8]' : 'opacity-100 scale-100'
        }`}>
        <div className="flex flex-col-reverse items-center gap-3">
          <HandWrittenText
            key={current === 2 ? 'media-left' : 'default-left'}
            text={current === 2 ? 'The full picture' : 'What I build'}
            rotation={-8}
          />
          <ArrowLeft />

        </div>
      </button>

      {/* Right Arrow + hint */}
      <button onClick={() => goTo(current + 1)} aria-label="Next panel" className={`hidden md:block fixed right-6 top-1/2 z-50 -translate-y-1/2 cursor-pointer transition-[opacity,transform] duration-300 ${current === 2 ? 'pointer-events-none opacity-0 scale-[0.8]' : 'opacity-100 scale-100'
        }`}>
        <div className="flex flex-col items-center gap-3">
          <HandWrittenText
            key={current === 0 ? 'dev-right' : 'default-right'}
            text={current === 0 ? 'The person' : 'What I shoot'}
          />
          <ArrowRight />
        </div>
      </button>

      {/* Nav dots — bottom center */}
      <div className="fixed top-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`
              h-1.25 rounded-full transition-all duration-300
              ${i === current
                ? 'w-3.5 bg-(--color-accent)'
                : 'w-1.25 bg-(--color-text-dim) hover:bg-(--color-text-mid)'
              }
            `}
          />
        ))}
      </div>
    </div>

  );
}
