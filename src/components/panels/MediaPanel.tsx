'use client';

import { motion } from 'motion/react';
import Image from "next/image";
import Link from "next/link";
import { FEATURED_MEDIA_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import PhotoStack from '../ui/PhotoStack';

interface MediaPanelProps {
    featuredMedia: FEATURED_MEDIA_QUERYResult;
    isActive: boolean;
}

type PhotoItem = FEATURED_MEDIA_QUERYResult[number] & {
    mediaType: "Photography";
};


const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};


export default function MediaPanel({ featuredMedia, isActive }: MediaPanelProps) {
    const photos = (featuredMedia ?? []).filter(
        (photo): photo is PhotoItem =>
            photo.mediaType === "Photography" && !!photo.photograghydetails?.photo
    );


    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden py-16 lg:py-0">

            {/* Ambient orb — bottom-right for this panel */}
            <div
                className="pointer-events-none absolute -bottom-[20%] -right-[10%] h-[80vh] w-[80vh] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(200,16,46,0.08) 0%, transparent 65%)" }}
            />

            {/* Inner content */}
            <motion.div
                className="relative z-10 w-full max-w-215 px-4 sm:px-6 lg:px-0 flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-[5vw]"
                variants={container}
                initial="hidden"
                animate={isActive ? 'visible' : 'hidden'}
            >
                {/* Left — text */}
                <motion.div variants={item}>
                    <div
                        className="mb-6 font-mono text-[0.6rem] tracking-[0.3em] uppercase text-(--color-accent)"
                        style={{ opacity: 0.7 }}
                    >
                        Photography
                    </div>

                    <h1 className="mb-4 font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.95] tracking-[0.04em] text-(--color-text)">
                        Time stops<br />here.
                    </h1>

                    <p className="max-w-[320px] font-serif italic font-light text-base sm:text-lg lg:text-2xl leading-relaxed text-(--color-text-mid)">
                        Before the code there was the camera. Weddings, families, pets, landscapes around Calgary. I stepped back from client work to focus on software, but the eye for a good frame never really switches off.
                    </p>
                </motion.div>

                {/* Right — photo stack */}
                <motion.div variants={item} className="flex items-center justify-center">
                    <PhotoStack photos={photos} />
                </motion.div>
            </motion.div>
            {/* Panel number */}
            <span className="absolute bottom-8 right-8 font-mono text-[0.5rem] font-light tracking-widest text-(--color-text)">
                03
            </span>
        </div>
    );
}
