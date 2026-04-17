'use client';
import { ABOUT_QUERYResult, TIMELINE_ENTRIES_QUERYResult } from "@/sanity/types";
import DotGrid from "@/components/ui/DotGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/BreadCrumb";
import { PortableText } from "next-sanity";
import {
    useScroll,
    useTransform,
    motion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import HandWrittenText from "@/components/ui/HandWrittenText";



interface AboutProfileClientProps {
    about: ABOUT_QUERYResult;
    timeline: TIMELINE_ENTRIES_QUERYResult;
}

export default function AboutProfileClient({ about, timeline }: AboutProfileClientProps) {

    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [timeline, ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 100%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);




    return (
        <div className="min-h-screen bg-(--color-bg) text-(--color-text) font-mono font-light">
            <DotGrid />
            {/* Bio Section */}
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
                                    <BreadcrumbPage>{'About Me'}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <br></br>

                        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-(--color-accent) mb-5 font-mono after:content-[''] after:flex-1 after:h-px after:bg-(--color-accent-border)">
                                    About
                                </p>
                                <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.88] tracking-tight">
                                    The Longer<br />Answer.
                                </h1>
                            </div>
                            <div className="text-[13px] md:text-[15px] lg:text-[16px] text-(--color-text-mid) leading-[1.7] max-w-100 md:pb-1">
                                {about?.shortBio && <PortableText value={about.shortBio} />}
                            </div>
                        </div>
                    </div>
                </section>



                {/* TimeLine */}
                <div
                    className="min-h-screen bg-(--color-bg) text-(--color-text) font-mono font-light"
                    ref={containerRef}
                >
                    <div ref={ref} className="relative max-w-255 mx-auto pb-20">
                        {timeline && timeline.map((item, index) => (
                            <div
                                key={index}
                                className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-12 pt-10 md:pt-40 relative"
                            >
                                <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                                    <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-(--color-bg-subtle) dark:bg-black flex items-center justify-center">
                                        <div className="h-4 w-4 rounded-full bg-(--color-accent) dark:bg-neutral-800 border border-(--color-accent) dark:border-neutral-700 p-2" />

                                    </div>

                                    <h3 className="hidden md:block text-xl md:pl-20 md:text-2xl font-bold text-neutral-500 dark:text-neutral-500 ">
                                        {item.date && new Date(item.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",

                                        })}
                                    </h3>
                                </div>

                                <div className="relative pl-16 pr-4 md:pl-4 w-full">
                                    <h3 className="md:hidden block text-2xl mb-2 text-left font-display text-(--text) dark:text-neutral-500">
                                        {item.date && new Date(item.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",

                                        })}
                                    </h3>
                                    <h4 className="text-base md:text-lg font-semibold mb-2 text-(--color-text) dark:text-neutral-300">
                                        <div className="flex flex-row justify-items items-center gap-8">
                                            {item.title}
                                            <span className="hidden md:inline-block">
                                                <HandWrittenText className="text-base md:text-lg text-(--color-accent) font-light" text={item.scribbleNote || ""} />


                                            </span>
                                        </div>
                                    </h4>

                                    {item.description}{" "}

                                </div>
                            </div>
                        ))}
                        <div
                            style={{
                                height: height + "px",
                            }}
                            className="absolute md:left-8 left-8 top-0 overflow-hidden w-0.5 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-200 dark:via-neutral-700 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_100%,black_100%)]"
                        >
                            <motion.div
                                style={{
                                    height: heightTransform,
                                    opacity: opacityTransform,
                                }}
                                // Animated vertical line that grows as you scroll through the timeline.
                                className="absolute inset-x-0 top-0  w-0.5 bg-linear-to-t from-white via-(--color-accent) to-transparent from-0% via-10% rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>

    )
}