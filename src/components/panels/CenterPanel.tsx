import { ABOUT_QUERYResult } from "@/sanity/types";

interface CenterPanelProps {
  about: ABOUT_QUERYResult;
}

export default function CenterPanel({ about }: CenterPanelProps) {
  return (
    /*
     * THE PANEL SHELL
     * ───────────────
     * flex flex-col       → vertical stack (main axis = top→bottom)
     * items-center        → center children horizontally (cross axis)
     * justify-center      → center children vertically (main axis)
     * relative            → establishes positioning context for absolute children
     * h-full w-full       → fill the space PageClient gives us
     * overflow-hidden     → clip anything that bleeds out
     */
    <div className="flex flex-col items-center justify-center relative min-h-screen w-full overflow-hidden">
      {/* ── PANEL LABEL (top-left) ─────────────────────────────────────────*/}
      <span className="absolute top-8 left-8 font-mono text-[0.55rem] font-light tracking-[0.3em] uppercase text-(--color-text)">
        About
      </span>

      <h1 className="font-display text-[clamp(3rem,5vw,5rem)] text-(--color-text) tracking-[0.06em] leading-[0.9] text-center">
        {about?.name?.split(' ').join('\n') ?? 'Carlos\nBeto'}
      </h1>

      {/* ── RED RULE ───────────────────────────────────────────────────────
       * A pure decorative element — just a box with no content.
       * w-6 = 1.5rem, h-px = 1px. mx-auto centers a block element horizontally.
       * my-[1.4rem] = vertical margin (arbitrary, matching the design's 1.4rem gap).
       * bg-(--color-accent) = pulls from your CSS variable directly.
       */}
      <div className="w-6 h-px bg-(--color-accent) mx-auto my-[1.4rem]" />

      {/* ── HANDLE ─────────────────────────────────────────────────────────
       * text-(--color-accent) → Soul Red, matching the rule above.
       * The name + rule + handle form a visual unit — same accent color ties them together.
       */}
      <p className="font-mono text-[0.6rem] font-light tracking-[0.25em] text-(--color-accent) text-center">
        @betonotfound
      </p>

      {/* ── TAGLINE ───────────────────────────────────────────────────────*/}
      <p className="font-serif italic text-2xl font-light text-(--color-text-mid) text-center mt-[1.8rem] tracking-[0.04em] leading-relaxed">
        {about?.shortBio ?? 'Crafting digital experiences with code and creativity.'}
      </p>

      {/* ── CTA BUTTON ───────────────────────────────────────────────────── */}
      <a
        href="#"
        className="mt-[2.4rem] font-mono text-[0.55rem] font-normal tracking-[0.2em] uppercase text-(--color-text-dim) border border-(--color-border) px-[1.2rem] py-[0.6rem] transition-colors duration-200 hover:text-(--color-text) hover:border-(--color-accent) hover:bg-(--color-accent-dim)"
      >
        Enter ↗
      </a>
      {/* ── PANEL NUMBER (bottom-right) ─────────────────────────────────── */}
      <span className="absolute bottom-8 right-8 font-mono text-[0.5rem] font-light tracking-widest text-(--color-text)">
        02
      </span>

    </div>
  );
}
