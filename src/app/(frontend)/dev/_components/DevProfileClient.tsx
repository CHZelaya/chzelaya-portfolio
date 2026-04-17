'use client';
import { PROJECTS_QUERYResult } from "@/sanity/types";
import { DEV_PROFILE_QUERYResult } from "@/sanity/types";
import { SectionLabel } from "./BentoBoxes";
import { ApproachStackCard } from "./ApproachStackCard";
import { DevProjectCard } from "./DevProjectCard";
import DotGrid from "@/components/ui/DotGrid";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/BreadCrumb";
import { LocationCard } from "./LocationCard";
import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal"


interface DevProfileClientProps {
    projects: PROJECTS_QUERYResult;
    devProfile: DEV_PROFILE_QUERYResult;
}

// Reusable section animation wrapper
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {children}
        </motion.div>
    )
}

function TerminalText() {
    return (
        <Terminal className="bg-(--color-bg-raise) border border-(--color-border) shadow-none h-full overflow-hidden">
            <TypingAnimation>npx create-developer carlos</TypingAnimation>
            <AnimatedSpan>No formal CS degree found.</AnimatedSpan>
            <AnimatedSpan className="text-(--color-accent)">✔ Curiosity: installed</AnimatedSpan>
            <AnimatedSpan className="text-(--color-accent)">✔ Coffee: poured</AnimatedSpan>
            <AnimatedSpan className="text-(--color-accent)">✔ Real projects: confirmed</AnimatedSpan>
            <AnimatedSpan className="text-(--color-accent)">✔ SAIT certified: 2025</AnimatedSpan>
            <TypingAnimation>Unconventional. Works anyway.</TypingAnimation>
        </Terminal>
    );
}


export default function DevProfileClient({ devProfile, projects }: DevProfileClientProps) {

    return (
        <div className="min-h-screen bg-(--color-bg) text-(--color-text) font-mono font-light">
            <DotGrid />


            {/* Opening */}
            <AnimatedSection>
                <section className=" px-4 py-12 md:px-8 md:py-16 lg:py-20">
                    <div className="max-w-255 mx-auto">

                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{'Dev Profile'}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <br></br>

                        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-(--color-accent) mb-5 font-mono after:content-[''] after:flex-1 after:h-px after:bg-(--color-accent-border)">
                                    Dev
                                </p>
                                <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.88] tracking-tight">
                                    What I<br />build.
                                </h1>
                            </div>
                            <p className="text-[13px] md:text-[15px] lg:text-[16px] text-(--color-text-mid) leading-[1.7] max-w-100 md:pb-1">
                                Full-stack development with a focus on things that are fast, maintainable, and feel considered.
                                <span className="font-hand text-[1rem] text-accent/70 -rotate-1 inline-block ml-1.5 relative top-0.5">

                                </span>
                            </p>
                        </div>
                    </div>
                </section>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
                {/* Bento Grid */}
                <section className="px-4 py-6 md:px-8 md:py-8">
                    <div className="max-w-255 mx-auto">
                        <SectionLabel>At a glance</SectionLabel>
                        <div className="grid grid-cols-1 gap-2.25 md:grid-cols-2 lg:grid-cols-3">

                            {/* Terminal Animation */}
                            <TerminalText />

                            {/* Approach + Stack */}
                            <ApproachStackCard
                                approachBody={devProfile?.approachBody}
                                stack={devProfile?.technologies ?? undefined}
                            />

                            {/* Availability + Location */}
                            <LocationCard devProfile={devProfile} />

                        </div>
                    </div>
                </section>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
                {/* Project Library */}
                <section className="px-4 py-8 md:px-8 md:py-12 lg:py-14">
                    <div className="max-w-255 mx-auto">
                        <SectionLabel>Projects</SectionLabel>
                        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[0.92] tracking-tight mb-8 md:mb-10">
                            The work.
                        </h2>
                        <div className="grid gap-4"
                            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
                            {projects.map((project) => (
                                <DevProjectCard
                                    key={project.slug?.current}
                                    project={project}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </AnimatedSection>
        </div>
    );
}
