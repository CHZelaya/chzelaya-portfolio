'use client';

import { motion } from 'motion/react';
import Image from "next/image";
import Link from "next/link";
import { FEATURED_MEDIA_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

interface MediaPanelProps {
    featuredMedia: FEATURED_MEDIA_QUERYResult;
    isActive: boolean;
}

type PhotoItem = FEATURED_MEDIA_QUERYResult[number] & {
    mediaType: "Photography";
};

interface MosaicCellProps {
    item: PhotoItem | undefined;
    className?: string;
}

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function MosaicCell({ item: photo, className = "" }: MosaicCellProps) {
    const photoAsset = photo?.photograghydetails?.photo;
    const label = photo?.photograghydetails?.location ?? photo?.title;
    const href = photo?.slug?.current ? `/photography/${photo.slug.current}` : null;

    const inner = (
        <div className={`group relative h-full overflow-hidden border border-(--color-border) transition-colors duration-300 hover:border-(--color-accent-border) ${className}`}>
            {photoAsset ? (
                <Image
                    src={urlFor(photoAsset).width(600).height(800).url()}
                    alt={photo?.title ?? ""}
                    fill
                    sizes="(max-width: 860px) 50vw, 280px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
            ) : (
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(160deg, var(--color-bg-subtle) 0%, var(--color-bg-raise) 100%)" }}
                />
            )}

            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

            {label && (
                <span className="absolute bottom-2 left-3 font-mono text-[0.5rem] font-light tracking-[0.18em] uppercase text-(--color-accent) opacity-60">
                    {label}
                </span>
            )}
        </div>
    );

    return href ? <Link href={href} className={`block h-full ${className}`}>{inner}</Link> : inner;
}

export default function MediaPanel({ featuredMedia, isActive }: MediaPanelProps) {
    const photos = (featuredMedia ?? []).filter(
        (photo): photo is PhotoItem =>
            photo.mediaType === "Photography" && !!photo.photograghydetails?.photo
    );

    const [main, second, third] = photos;

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">

            {/* Ambient orb — bottom-right for this panel */}
            <div
                className="pointer-events-none absolute -bottom-[20%] -right-[10%] h-[80vh] w-[80vh] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(200,16,46,0.08) 0%, transparent 65%)" }}
            />

            {/* Panel label */}
            <span className="absolute left-8 top-8 font-mono text-[0.55rem] font-light tracking-[0.3em] uppercase text-(--color-text-dim)">
                Photography
            </span>

            {/* Inner content */}
            <motion.div
                className="relative z-10 grid w-[min(860px,88vw)] grid-cols-2 items-center gap-[5vw]"
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
                        Photography &amp; Film
                    </div>

                    <h1 className="mb-4 font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.95] tracking-[0.04em] text-(--color-text)">
                        The quiet<br />frame.
                    </h1>

                    <p className="max-w-[320px] font-serif italic font-light text-2xl leading-relaxed text-(--color-text-mid)">
                        Candid portraiture and environmental work. Shot on digital
                        and 35mm. Looking for the moment just before the moment.
                    </p>
                </motion.div>

                {/* Right — photo mosaic */}
                <motion.div
                    variants={item}
                    className="grid gap-1.25"
                    style={{
                        gridTemplateColumns: "1.2fr 1fr",
                        gridTemplateRows: "1fr 1fr",
                        height: "360px",
                    }}
                >
                    <MosaicCell item={main} className="row-span-2" />
                    <MosaicCell item={second} />
                    <MosaicCell item={third} />
                </motion.div>
            </motion.div>

            {/* Panel number */}
            <span className="absolute bottom-8 right-8 font-mono text-[0.5rem] font-light tracking-widest text-(--color-text-dim)">
                03
            </span>
        </div>
    );
}
