'use client';
import {
    useScroll,
    useTransform,
    motion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { TIMELINE_ENTRIES_QUERYResult } from '@/sanity/types';
import Container from "@/components/ui/Container";


interface TimelineProps {
    timeline: TIMELINE_ENTRIES_QUERYResult;
}




export const SacredTimeline = ({ timeline }: TimelineProps) => {

    //Grabbing the date and changing it to a more redadable format. 



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
        offset: ["start start", "end end"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="min-h-screen bg-(--color-bg) text-(--color-text) font-mono font-light"
            ref={containerRef}
        >
            {/* <Container> */}
            <div className="max-w-7xl mx-auto pt-6 px-4 md:px-6 lg:px-10">
                <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[0.92] tracking-tight text-(--color-text) mb-8 md:mb-10">
                    The Path Here.
                </h2>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
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
                                {item.title}
                            </h4>

                            {item.description}{" "}
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-0.5 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-200 dark:via-neutral-700 to-transparent to-99%  mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
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
            {/* </Container> */}
        </div>
    );
};

