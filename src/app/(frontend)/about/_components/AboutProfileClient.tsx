'use client';
import { ABOUT_QUERYResult, TIMELINE_ENTRIES_QUERYResult } from "@/sanity/types";
import { Timeline } from "./Timeline";
import DotGrid from "@/components/ui/DotGrid";




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
            <h1> About Profile Client!</h1>
            <Timeline timeline={timeline} />
        </div>
    )
}