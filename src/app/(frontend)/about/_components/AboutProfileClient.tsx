'use client';
import { ABOUT_QUERYResult, TIMELINE_ENTRIES_QUERYResult } from "@/sanity/types";
import { SacredTimeline } from "./SacredTimeline";
import DotGrid from "@/components/ui/DotGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/BreadCrumb";
import { PortableText } from "next-sanity";


interface AboutProfileClientProps {
    about: ABOUT_QUERYResult;
    timeline: TIMELINE_ENTRIES_QUERYResult;
}

const items = [
    { title: 'May 1940', cardTitle: 'Dunkirk', cardDetailedText: 'Allied evacuation from France' },
    { title: 'June 1944', cardTitle: 'D-Day', cardDetailedText: 'Normandy invasion begins' }
];

export default function AboutProfileClient({ about, timeline }: AboutProfileClientProps) {
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
                                <span className="font-hand text-[1rem] text-accent/70 -rotate-1 inline-block ml-1.5 relative top-0.5">

                                </span>
                            </div>
                        </div>
                    </div>



                    {/* TimeLine */}
                    <SacredTimeline timeline={timeline} />

                </section>
            </AnimatedSection>
        </div>
    )
}