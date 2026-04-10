'use client';

import { motion } from 'motion/react';
import { FEATURED_PROJECTS_QUERYResult } from "@/sanity/types";
import ProjectCard from "@/components/cards/ProjectCard";

interface DevPanelProps {
    featuredProjects: FEATURED_PROJECTS_QUERYResult;
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

export default function DevPanel({ featuredProjects, isActive }: DevPanelProps) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">

            {/* Ambient red orb */}
            <div
                className="pointer-events-none absolute -left-[20%] -top-[30%] h-[80vh] w-[80vh] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(200,16,46,0.07) 0%, transparent 65%)" }}
            />

            {/* Inner content */}
            <motion.div
                className="relative z-10 w-full max-w-205 px-4 sm:px-6 lg:px-0 overflow-y-auto max-h-screen py-10 lg:py-16"
                variants={container}
                initial="hidden"
                animate={isActive ? 'visible' : 'hidden'}
            >
                {/* Eyebrow */}
                <motion.div variants={item} className="mb-8 flex items-center gap-4 font-mono text-[0.6rem] tracking-[0.3em] uppercase text-(--color-accent)">
                    Software Engineering
                    <span
                        className="h-px w-16 shrink-0 bg-(--color-accent)"
                        style={{ opacity: 0.4 }}
                    />
                </motion.div>

                {/* Headline */}
                <motion.h1 variants={item} className="mb-4 font-display text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-[0.04em] text-(--color-text)">
                    Keep Moving<br />Forward.
                </motion.h1>

                {/* Tagline */}
                <motion.p variants={item} className="mb-10 max-w-105 font-serif italic font-light text-base sm:text-lg lg:text-2xl leading-relaxed text-(--color-text-mid)">
                    Every project here started with a real problem and a blank repo. Some shipped cleanly, some taught hard lessons. The case studies don&apos;t skip the hard parts.
                </motion.p>

                {/* Project grid */}
                <motion.div
                    variants={item}
                    className="flex flex-col gap-px sm:grid sm:grid-cols-2 border border-(--color-border)"
                >
                    {featuredProjects?.map((project, i) => (
                        <div
                            key={project.slug?.current}
                            className="sm:not-last:border-r border-(--color-border) not-last:border-b sm:not-last:border-b-0"
                        >
                            <ProjectCard project={project} index={i} />
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Panel number */}
            <span className="absolute bottom-8 right-8 font-mono text-[0.5rem] font-light tracking-widest text-(--color-text)">
                01
            </span>
        </div>
    );
}
