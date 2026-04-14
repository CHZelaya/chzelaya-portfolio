'use client'
import { PROJECT_BY_SLUG_QUERYResult } from "@/sanity/types";
import { motion, useInView } from "motion/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useRef } from "react";
import DotGrid from "@/components/ui/DotGrid";
import {
    type PortableTextComponentProps,
    type PortableTextListComponent,
    type PortableTextListItemComponent,
    type PortableTextBlockComponent,
    type PortableTextBlock,
    PortableText
} from "@portabletext/react"
import ProjectBento from "@/components/ui/ProjectBento";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/BreadCrumb"


// PortableText Helper
const portableTextComponents = {
    block: {
        normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
            <p className="mb-4 last:mb-0">{children}</p>
        ),
    } satisfies Record<string, PortableTextBlockComponent>,
    list: {
        bullet: (({ children }) => (
            <ul className="mb-4 ml-4 space-y-2 list-disc marker:text-(--color-accent)">
                {children}
            </ul>
        )) satisfies PortableTextListComponent,
        number: (({ children }) => (
            <ol className="mb-4 ml-4 space-y-2 list-decimal marker:text-(--color-accent)">
                {children}
            </ol>
        )) satisfies PortableTextListComponent,
    },
    listItem: {
        bullet: (({ children }) => (
            <li className="pl-1">{children}</li>
        )) satisfies PortableTextListItemComponent,
        number: (({ children }) => (
            <li className="pl-1">{children}</li>
        )) satisfies PortableTextListItemComponent,
    },
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

interface ProjectDetailClientProps {
    project: PROJECT_BY_SLUG_QUERYResult;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    const images = project?.caseStudyImages?.images



    return (
        <div className="min-h-screen bg-(--color-bg)">
            <DotGrid />
            {/* ── HERO ────────────────────────────────────────────── */}

            <section className="relative min-h-[80vh] flex items-center border-b border-(--color-border)">

                <div className="w-full max-w-350 mx-auto px-4 py-12 md:px-8 md:py-16 lg:py-24">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/projects">Dev Profile</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{project?.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">

                        {/* Text block — always full width, sits above image on mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                            <p className="text-(--color-text-dim) mb-3 md:mb-5 tracking-[0.2em] uppercase text-[10px] md:text-[11px] font-mono">
                                Case Study
                            </p>
                            <h1 className="text-[clamp(2rem,8vw,5rem)] leading-[1.05] tracking-tight mb-4 md:mb-6 font-display text-(--color-text)">
                                {project?.title}
                            </h1>
                            <p className="text-[clamp(1rem,2.5vw,1.375rem)] text-(--color-text-mid) leading-[1.65] font-serif">
                                {project?.summary}
                            </p>
                        </motion.div>

                        {/* Cover image — full width on mobile, constrained on desktop */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="relative w-full aspect-4/3 overflow-hidden"
                        >
                            {project?.coverImage && (
                                <Image
                                    src={urlFor(project.coverImage).url()}
                                    alt=""
                                    fill
                                    className="object-contain"

                                />
                            )}
                        </motion.div>

                    </div>
                </div>
            </section>
            <section className="relative z-10 bg-(--color-bg) w-full max-w-350 mx-auto px-4 border border-(--color-border-mid) md:px-8 md:py-12">
                <ProjectBento
                    technologies={project?.technologies ?? null}
                    year={project?.year ?? null}
                    status={project?.status ?? null}
                    scribbleNote={project?.scribbleNote ?? null}
                />
            </section>





            {/* ── CASE STUDY BODY ─────────────────────────────────── */}
            <div className="relative z-10 bg-(--color-bg) w-full max-w-350 mx-auto px-4 py-8 border border-(--color-border-mid) md:px-8 md:py-12 lg:py-16">


                {/* TODO: Refactor - Map over the case study body and render dynamically.  */}

                {/* Problem */}
                <AnimatedSection>
                    <section className="mb-12 md:mb-20 lg:mb-28 grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:gap-12 border-b border-(--color-border) pb-12 md:pb-20 lg:pb-28">
                        <div>
                            <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] tracking-tight font-display text-(--color-text)">
                                The Problem
                            </h2>
                        </div>
                        <div>
                            <div className="text-[clamp(0.9375rem,1.8vw,1.125rem)] text-(--color-text-mid) leading-[1.7] font-serif">
                                {project?.caseStudyBody?.problem && (
                                    <PortableText components={portableTextComponents} value={project.caseStudyBody.problem} />
                                )}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                {/* Constraints */}
                <AnimatedSection delay={0.1}>
                    <section className="mb-12 md:mb-20 lg:mb-28 grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:gap-12 border-b border-(--color-border) pb-12 md:pb-20 lg:pb-28">
                        <div>
                            <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] tracking-tight font-display text-(--color-text)">
                                Constraints
                            </h2>
                        </div>
                        <div>
                            <div className="text-[clamp(0.9375rem,1.8vw,1.125rem)] text-(--color-text-mid) leading-[1.7] font-serif">
                                {project?.caseStudyBody?.constraints && (
                                    <PortableText components={portableTextComponents} value={project.caseStudyBody.constraints} />
                                )}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                {/* Approach */}
                <AnimatedSection delay={0.1}>
                    <section className="mb-12 md:mb-20 lg:mb-28 grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:gap-12 border-b border-(--color-border) pb-12 md:pb-20 lg:pb-28">
                        <div>
                            <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] tracking-tight font-display text-(--color-text)">
                                The Approach
                            </h2>
                        </div>
                        <div>
                            <div className="text-[clamp(0.9375rem,1.8vw,1.125rem)] text-(--color-text-mid) leading-[1.7] font-serif">
                                {project?.caseStudyBody?.approach && (
                                    <PortableText components={portableTextComponents} value={project.caseStudyBody.approach} />
                                )}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                    <section className="mb-12 md:mb-20 lg:mb-28 grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:gap-12 border-b border-(--color-border) pb-12 md:pb-20 lg:pb-28">
                        <div>
                            <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] tracking-tight font-display text-(--color-text)">
                                The Execution
                            </h2>
                        </div>
                        <div>
                            <div className="text-[clamp(0.9375rem,1.8vw,1.125rem)] text-(--color-text-mid) leading-[1.7] font-serif">
                                {project?.caseStudyBody?.execution && (
                                    <PortableText components={portableTextComponents} value={project.caseStudyBody.execution} />
                                )}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                    <section className="mb-12 md:mb-20 lg:mb-28 grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:gap-12 border-b border-(--color-border) pb-12 md:pb-20 lg:pb-28">
                        <div>
                            <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] tracking-tight font-display text-(--color-text)">
                                The Outcome
                            </h2>
                        </div>
                        <div>
                            <div className="text-[clamp(0.9375rem,1.8vw,1.125rem)] text-(--color-text-mid) leading-[1.7] font-serif">
                                {project?.caseStudyBody?.outcome && (
                                    <PortableText components={portableTextComponents} value={project.caseStudyBody.outcome} />
                                )}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                    <section className="mb-12 md:mb-20 lg:mb-28 grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:gap-12 border-b border-(--color-border) pb-12 md:pb-20 lg:pb-28">
                        <div>
                            <h2 className="text-[clamp(1.25rem,3vw,1.75rem)] tracking-tight font-display text-(--color-text)">
                                The Reflections
                            </h2>
                        </div>
                        <div>
                            <div className="text-[clamp(0.9375rem,1.8vw,1.125rem)] text-(--color-text-mid) leading-[1.7] font-serif">
                                {project?.caseStudyBody?.reflection && (
                                    <PortableText components={portableTextComponents} value={project.caseStudyBody.reflection} />
                                )}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

            </div>
        </div>
    );
}