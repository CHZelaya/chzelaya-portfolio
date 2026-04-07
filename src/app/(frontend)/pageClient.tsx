'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ABOUT_QUERYResult, FEATURED_MEDIA_QUERYResult, FEATURED_PROJECTS_QUERYResult } from "@/sanity/types";
import { CenterPanel, DevPanel, MediaPanel } from "@/components/panels";
import DotGrid from "@/components/ui/DotGrid";

const ZONES = ['Engineering', 'About', 'Photography'];
const EASE = 'cubic-bezier(0.77, 0, 0.175, 1)';
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
    setTimeout(() => { animating.current = false; }, 900);
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

      {/* Zone label — top center */}
      <div className="pointer-events-none fixed left-1/2 top-7 z-50 -translate-x-1/2 font-mono text-[0.55rem] tracking-[0.25em] uppercase text-(--color-text-dim)">
        {ZONES[current]}
      </div>

      {/* Horizontal stage */}
      <div
        className="relative z-1 flex h-screen"
        style={{
          width: '300vw',
          transform: `translateX(${OFFSETS[current]})`,
          transition: `transform 0.9s ${EASE}`,
          willChange: 'transform',
        }}
      >
        {/* Panel 0 — Dev / Engineering */}
        <div className="h-screen w-screen shrink-0 overflow-y-auto">
          <DevPanel featuredProjects={featuredProjects} />
        </div>

        {/* Panel 1 — About / Center */}
        <div className="h-screen w-screen shrink-0 overflow-y-auto">
          <CenterPanel about={about} />
        </div>

        {/* Panel 2 — Photography / Media */}
        <div className="h-screen w-screen shrink-0 overflow-y-auto">
          <MediaPanel featuredMedia={featuredMedia} />
        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={() => goTo(current - 1)}
        aria-label="Previous panel"
        className={`
          fixed left-6 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center
          rounded-full border border-(--color-border) bg-black/30 backdrop-blur-md
          transition-[opacity,transform,border-color,background] duration-300
          hover:border-(--color-border-mid) hover:bg-white/5
          ${current === 0 ? 'pointer-events-none scale-[0.8] opacity-0' : 'scale-100 opacity-100'}
        `}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => goTo(current + 1)}
        aria-label="Next panel"
        className={`
          fixed right-6 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center
          rounded-full border border-(--color-border) bg-black/30 backdrop-blur-md
          transition-[opacity,transform,border-color,background] duration-300
          hover:border-(--color-border-mid) hover:bg-white/5
          ${current === 2 ? 'pointer-events-none scale-[0.8] opacity-0' : 'scale-100 opacity-100'}
        `}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Nav dots — bottom center */}
      <div className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={ZONES[i]}
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
