'use client'
import { PROJECT_BY_SLUG_QUERYResult } from "@/sanity/types";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";


//Sanity Image Builder
const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
    return builder.image(source)
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
        <div className="min-h-screen bg-(-color-bg)">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center border-b border-(--color-border)">
                <div className="w-full max-w-350 mx-auto px-6 py-16 md:px-8 md:py-20 lg:py-24">
                    <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                            <p className="text-(--color-text-dim) mb-4 md:mb-6 tracking-[0.2em] uppercase text-[11px] font-mono">
                                Case Study
                            </p>
                            <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight mb-6 md:mb-8 font-display text-(--color-text)">
                                {project?.title}
                            </h1>
                            <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-(--color-text-mid) leading-[1.6] max-w-145 font-serif">
                                {project?.summary}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="relative w-full aspect-4/3 overflow-hidden border border-(--color-border-mid)"
                        >
                            {/* Single Cover Image */}
                            {project?.coverImage && (
                                <Image
                                    src={urlFor(project?.coverImage).width(1200).height(675).url()}
                                    alt=''
                                    width={1200}
                                    height={675}
                                />
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="w-full max-w-350 mx-auto px-6 py-12 md:px-8 md:py-16">

                {/* Problem */}
                <AnimatedSection>
                    <section className="mb-16 md:mb-24 lg:mb-32 grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[300px_1fr] lg:gap-12 border-b border-(--color-border) pb-16 md:pb-24 lg:pb-32">
                        <div>
                            <h2 className="text-[clamp(1.5rem,3vw,2rem)] tracking-tight font-display text-(--color-text)">The Problem</h2>
                        </div>
                        <div className="w-full max-w-180">
                            <p className="text-[clamp(1.063rem,1.8vw,1.25rem)] text-(--color-text-mid) leading-[1.65] mb-4 md:mb-6 font-serif">

                            </p>
                            <p className="text-[clamp(1.063rem,1.8vw,1.25rem)] text-(--color-text-mid) leading-[1.65] font-serif">
                                Additional details about the problem space. All content here will be managed through Sanity CMS.
                            </p>
                        </div>
                    </section>
                </AnimatedSection>

            </div>


        </div>
    );
}